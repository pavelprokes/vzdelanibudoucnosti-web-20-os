import axios, { AxiosResponse } from "axios"
import { strippedString } from "../../lib/email/strippedString"
import { getWebSiteUrlFromWindow } from "../../lib/url/getWebSiteUrlFromWindow"
import { PaymentData } from "../../config/payments"
import { MappedCourse } from "../../lib/prismic/mapData"
import { CourseVariant } from "../../lib/prismic/Course"
import { registerEmail, registerEmailForProjectDays, registerEmailForSampleCourse } from "../../lib/email/emailsDefinition"
import { emailInlineHTML } from "../../lib/email/emailInlineHtml"
import { RegisterStudentCourse } from "./types"
import { SendEmail } from "../../lib/email/SendEmail"

const dev = process.env.NODE_ENV !== "production"

export const registrationEmailUtmParameters = "?utm_source=email&utm_medium=qr&utm_campaign=course-registration-email"

const getEmailLetterByCourseVariant = (course: MappedCourse, courseDetailPageUrl: string, equipmentBuyFromOrganization: boolean, paymentData: PaymentData) => {
  if (course.courseVariant === CourseVariant.projectDays) {
    return registerEmailForProjectDays(course.name, courseDetailPageUrl)
  } else if (course.courseVariant === CourseVariant.sampleCourse) {
    return registerEmailForSampleCourse(course.name, courseDetailPageUrl)
  }

  return registerEmail(course.name, courseDetailPageUrl, course.capacity, equipmentBuyFromOrganization, paymentData)
}

export const sendRegisterEmail = async (
  values: RegisterStudentCourse,
  course: MappedCourse,
  paymentData: PaymentData,
  recipients: string[],
  onError?: (e: any) => void
): Promise<void | AxiosResponse> => {
  const courseDetailPageUrl = `${getWebSiteUrlFromWindow()}${course.registerUrl}`
  const emailLetter = getEmailLetterByCourseVariant(course, courseDetailPageUrl, values.equipmentBuyFromOrganization, paymentData)

  const config: SendEmail = {
    emailList: recipients,
    html: emailInlineHTML(`Potvrzení registrace, Vzdělání budoucnosti`, course.name, emailLetter),
    text: strippedString(emailLetter),
    subject: "Potvrzení registrace v kroužku, Vzdělání budoucnosti",
    attachments: [
      {
        filename: "vzdelanibudoucnosti-logo.png",
        path: `${dev ? "http://localhost:3003" : "https://vzdelanibudoucnosti.cz"}/images/vzdelanibudoucnosti_2_black_text.png`,
        cid: "vzdelanibudoucnosti-logo"
      }
    ]
  }

  return await axios
    .post("/api/email/send", config)
    .catch((err) => {
      console.error("sendRegisterEmail", err)
      onError && onError(err)
    })
    .then((res) => res)
}
