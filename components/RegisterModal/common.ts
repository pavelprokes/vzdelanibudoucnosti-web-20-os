import { MappedCourse } from "../../lib/prismic/mapData"
import { sendRegisterEmail } from "./sendRegisterEmail"
import { notification } from "antd"
import { FormikHelpers } from "formik"
import React from "react"
import axios, { AxiosResponse } from "axios"
import { event, purchaseEvent } from "../../lib/ga"
import { RegisterStudentCourse } from "./types"
import { InsertCourseRegistration, OutputCourseRegistration } from "../../lib/supabase/insertCourseRegistration"
import { CheckCourseCapacity } from "../../lib/supabase/checkCourseCapacity"
import { deburr } from "lodash"

export const onSubmitHandler = async (
  initialValues: RegisterStudentCourse,
  values: RegisterStudentCourse,
  formikHelpers: FormikHelpers<RegisterStudentCourse>,
  course: MappedCourse,
  setFormCompleteSend: React.Dispatch<React.SetStateAction<OutputCourseRegistration | null>>
): Promise<OutputCourseRegistration> => {
  formikHelpers.setSubmitting(true)

  const capacity = await axios
    .post("/api/course-registration/check-course-capacity", {
      courseSlug: course.slug,
      capacity: course.capacity
    })
    .catch((e) => console.error(e))
    .then((res: AxiosResponse<CheckCourseCapacity>) => res.data)

  if (capacity.all.isFull) {
    notification.error({
      message: "Registrace",
      description: "Registrace neproběhla. Omlouváme se, byla naplněna kapacita kurzu. Kontaktujte lektora. Děkujeme za pochopení.",
      duration: 0
    })
    return
  }

  const registration = await axios
    .post("/api/course-registration", {
      registration: values,
      course: {
        slug: course.slug,
        seedNumber: course.seedNumber,
        name: course.name,
        equipmentPrice: course.equipmentPrice,
        price: course.price
      }
    } as InsertCourseRegistration)
    .catch((e: any) => {
      if (e.name === "DuplicateError") {
        notification.error({
          message: "Registrace",
          description: `Registrace neproběhla. Omlouváme se, student s touto emailovou adresou (${values.student.email}) je již na tento kurz přihlášen. Zkontrolujte si emailovou schránku včetně nevyžádané složky. Děkujeme`,
          duration: 0
        })
        return
      }

      notification.error({
        message: "Registrace",
        description: `Registrace neproběhla úspěšně. Zkuste to později. Pokud obtíže přetrvají, kontaktujte nás. Děkujeme za pochopení. ${JSON.stringify(e)}`,
        duration: 0
      })
      return
    })
    .then((res: AxiosResponse<OutputCourseRegistration>) => res.data)

  setFormCompleteSend(registration)
  formikHelpers.setSubmitting(false)

  await sendRegisterEmail(
    values,
    course,
    registration.payment,
    values.studentContact?.email ? [values.student.email, values.studentContact.email] : [values.student.email],
    (err) => {
      console.error(err)
    }
  )

  event({
    action: "register",
    category: "course",
    label: course.name,
    value: registration.payment.amount.value
  })
  purchaseEvent({
    items: [
      {
        affiliation: "Website",
        currency: "CZK",
        item_brand: "VzdelaniBudoucnosti z.s.",
        item_category: course.courseVariant,
        item_id: course.id,
        item_name: course.name,
        item_variant: `${course.ageGroup}/${course.type}`,
        price: registration.payment.amount.value,
        quantity: 1
      }
    ],
    affiliation: "Website",
    currency: "CZK",
    shipping: 0,
    tax: 0,
    transaction_id: registration.payment.variableNumber,
    value: registration.payment.amount.value
  })

  return registration
}
