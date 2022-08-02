import { RegisterStudentCourse } from "../../components/RegisterModal/types"
import { PaymentData } from "../../config/payments"
import { getOrCreateStudent, StudentTable } from "./getOrCreateStudent"
import { checkIsExistCourseRegistration } from "./checkIsExistCourseRegistration"
import { supabaseClient } from "./supabaseClient"
import { MappedCourse } from "../prismic/mapData"
import { DuplicateError } from "./NotFoundError"
import { insertPayment, PaymentTable } from "./insertPayment"
import { getOrCreateLegalRepresentative, LegalRepresentativeTable } from "./getOrCreateLegalRepresentative"
import { collectPaymentData } from "../../components/RegisterModal/payment/collectPaymentData"
import { getCountOfSlugRegistrationPayment } from "./getCountOfSlugRegistrationPayment"
import { omit } from "lodash"
import findCoupon from "../prismic/findCoupon"

const omitKeys = ["id", "created_at", "updated_at", "student", "payment", "legal_representative"]

export const insertCourseRegistration = async ({ registration, course }: InsertCourseRegistration): Promise<OutputCourseRegistration> => {
  const isRegistrationExist = await checkIsExistCourseRegistration(registration.student.email, course.slug)
  if (isRegistrationExist) {
    throw new DuplicateError(`Registration for ${course.slug} course with student ${registration.student.email} already exist.`)
  }

  const studentRes = await getOrCreateStudent(registration.student)
  const legalRepresentativeRes = await getOrCreateLegalRepresentative(registration.studentContact, studentRes.id)

  const countOfSlugRegistrationPayment = await getCountOfSlugRegistrationPayment(course.slug)
  const couponDetail = await findCoupon(registration.coupon)
  const paymentData = await collectPaymentData(registration, course, countOfSlugRegistrationPayment, couponDetail?.[0]?.data)
  const paymentRes = await insertPayment(paymentData)

  try {
    const { data: registrationRes, error: registrationError } = await supabaseClient
      .from<RegistrationTable>("registration")
      .insert(
        [
          {
            student: studentRes.id,
            payment: paymentRes.id,
            legal_representative: legalRepresentativeRes?.id || null,
            agreement_with_newsletter: registration.newsletterAgreement,
            agreement_with_sign_in: registration.iSignUp,
            course_slug: course.slug,
            origin: "web vzdelanibudoucnosti",
            equipment_buy_from_organization: registration.equipmentBuyFromOrganization,
            equipment_send_to_address: registration.equipmentSendToAddress
          }
        ],
        { returning: "representation" }
      )
      .single()

    if (registrationError) {
      throw new Error(`Error when creating payment. ${JSON.stringify(registrationError)}`)
    }

    return {
      registration: omit(registrationRes, omitKeys),
      student: omit(studentRes, omitKeys),
      legalRepresentative: omit(legalRepresentativeRes, omitKeys),
      payment: paymentData
    }
  } catch (e) {
    throw new Error(`Error when creating registration. ${JSON.stringify(e)}`)
  }
}

export type CourseOnBackend = Pick<MappedCourse, "slug" | "seedNumber" | "name" | "equipmentPrice" | "price">

export interface InsertCourseRegistration {
  registration: RegisterStudentCourse
  course: CourseOnBackend
  paymentData: PaymentData
}

export interface OutputCourseRegistration {
  registration: Partial<RegistrationTable>
  student: Partial<StudentTable>
  legalRepresentative: Partial<LegalRepresentativeTable>
  payment: PaymentData
}

export interface RegistrationTable {
  id: number
  student: number
  origin: string
  legal_representative: number
  agreement_with_sign_in: boolean
  agreement_with_newsletter: boolean
  agreement_with_newsletter_acquisition_of_persons_photos: boolean
  equipment_buy_from_organization: boolean
  equipment_send_to_address: string
  cancel_reason: string
  cancel_when: string
  course_slug: string
  payment: number
  created_at: string
}

export type RegistrationTableWithPaymentStudentLegalRepre = RegistrationTable & {
  payment: PaymentTable
  student: StudentTable
  legal_representative: LegalRepresentativeTable
}
