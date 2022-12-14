import React, { useState } from "react"
import { Formik } from "formik"
import { Alert, Button, Checkbox, Divider, Form, Input, message, Space, Typography } from "antd"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { RegisterStudentCourse } from "./types"
import { onSubmitHandler } from "./common"
import { RegisterFormWrapper } from "./RegisterFormWrapper"
import { RegistrationFormProps } from "./RegistrationFormProps"
import * as yup from "yup"
import Link from "next/link"
import { registerCourseCouponValidator } from "./RegisterCourseCouponField"
import { RegisterThankYouModalWindow } from "./RegisterThankYouModalWindow"
import { OutputCourseRegistration } from "../../lib/supabase/insertCourseRegistration"
import {
  birthValidationSchema,
  courseRegistrationIsSignValidationSchema,
  emailValidationSchema,
  firstnameValidationSchema,
  lastnameValidationSchema
} from "./validations/courseREgistrationValidationSchemas"

message.config({
  top: 100
})

export const RegisterFormForInPersonAdult = ({ course, lecturer, capacityStatus }: RegistrationFormProps) => {
  const [formCompleteSend, setFormCompleteSend] = useState<OutputCourseRegistration | null>(null)
  const initialValues: RegisterStudentCourse = {
    student: {
      firstname: "",
      lastname: "",
      birth: 0,
      email: ""
    },
    iSignUp: false,
    newsletterAgreement: false
  }

  const registerFormValidationSchema = yup.object().shape({
    student: yup.object().shape({
      firstname: firstnameValidationSchema,
      lastname: lastnameValidationSchema,
      birth: birthValidationSchema,
      email: emailValidationSchema
    }),
    iSignUp: courseRegistrationIsSignValidationSchema,
    newsletterAgreement: yup.boolean()
  })

  return (
    <RegisterFormWrapper>
      <Formik<RegisterStudentCourse>
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => await onSubmitHandler(initialValues, values, formikHelpers, course, setFormCompleteSend)}
        validationSchema={registerFormValidationSchema}
        validate={async (values) => {
          return await registerCourseCouponValidator(values)
        }}>
        {({ values, handleSubmit, handleChange, handleBlur, touched, errors, isValidating, isSubmitting }) => (
          <>
            <Form>
              <div>
                <Typography.Title level={2}>Registra??n?? formul????</Typography.Title>
                <Typography.Text>Vypln??n??m t??to p??ihl????ky p??ihla??ujete uvedenou osobu na {course.name}.</Typography.Text>
                <Typography.Title level={3}>??daje o ????kovi</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="student.firstname" label="Jm??no" errors={errors} touched={touched}>
                  <Input value={values.student.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.lastname" label="P??ijmen??" errors={errors} touched={touched}>
                  <Input value={values.student.lastname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.birth" label="Rok narozen??" errors={errors} touched={touched}>
                  <Input type="number" value={values.student.birth} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.email" label="Email" errors={errors} touched={touched}>
                  <Input value={values.student.email} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="iSignUp" label="" errors={errors} touched={touched} labelCol={{}} wrapperCol={{}}>
                  <Checkbox checked={values.iSignUp} onChange={handleChange}>
                    Z??vazn?? p??ihla??uji osobu uvedenou jako &quot;????k&quot; na krou??ek {course.name} a z??rove?? souhlas??m se{" "}
                    <Link href={"/zpracovani-osobnich-udaju-krouzky-pro-deti"}>
                      <a title="Zpracov??n?? osobn??ch ??daj??">zpracov??n??m osobn??ch ??daj??</a>
                    </Link>{" "}
                    za ????elem ????asti na t??to akci.
                  </Checkbox>
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="newsletterAgreement" label="" errors={errors} touched={touched} labelCol={{}} wrapperCol={{}}>
                  <Checkbox checked={values.newsletterAgreement} onChange={handleChange}>
                    Chci dost??vat upozorn??n?? e-mailem o v??ech akc??ch organizace Vzd??l??n?? budoucnosti, z.s.
                  </Checkbox>
                </AntdFormItem>
              </div>

              <Divider />

              <Space direction="vertical">
                {capacityStatus?.all.isFull && (
                  <Alert type="warning" message="Krou??ek je napln??n. I tak st??le p??ij??m??me p??ihl????ky. Budeme V??s informovat. D??kujeme" banner />
                )}

                <Space direction="vertical" align="end">
                  <div>
                    <Typography.Text>
                      Potvrzen?? o registraci spole??n?? s platebn??mi ??daji V??m za??leme na uveden?? kontaktn?? e-mail ihned po ??sp????n??m odesl??n?? p??ihl????ky.
                    </Typography.Text>
                  </div>

                  <div>
                    {formCompleteSend && "Registrace prob??hla ??sp????n??. O??ek??vejte potvrzen?? ve va??em emailu. D??kujeme"}
                    <Button type="primary" htmlType="submit" onClick={() => handleSubmit()} loading={isSubmitting} disabled={!!formCompleteSend}>
                      {formCompleteSend ? "Registrace byla odesl??na" : "Odeslat registraci"}
                    </Button>
                  </div>
                </Space>
              </Space>
            </Form>

            {formCompleteSend && <RegisterThankYouModalWindow course={course} lecturer={lecturer} values={values} register={formCompleteSend} />}
          </>
        )}
      </Formik>
    </RegisterFormWrapper>
  )
}
