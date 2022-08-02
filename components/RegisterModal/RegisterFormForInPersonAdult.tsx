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
                <Typography.Title level={2}>Registrační formulář</Typography.Title>
                <Typography.Text>Vyplněním této přihlášky přihlašujete uvedenou osobu na {course.name}.</Typography.Text>
                <Typography.Title level={3}>Údaje o žákovi</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="student.firstname" label="Jméno" errors={errors} touched={touched}>
                  <Input value={values.student.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.lastname" label="Přijmení" errors={errors} touched={touched}>
                  <Input value={values.student.lastname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.birth" label="Rok narození" errors={errors} touched={touched}>
                  <Input type="number" value={values.student.birth} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.email" label="Email" errors={errors} touched={touched}>
                  <Input value={values.student.email} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="iSignUp" label="" errors={errors} touched={touched} labelCol={{}} wrapperCol={{}}>
                  <Checkbox checked={values.iSignUp} onChange={handleChange}>
                    Závazně přihlašuji osobu uvedenou jako &quot;žák&quot; na kroužek {course.name} a zároveň souhlasím se{" "}
                    <Link href={"/zpracovani-osobnich-udaju-krouzky-pro-deti"}>
                      <a title="Zpracování osobních údajů">zpracováním osobních údajů</a>
                    </Link>{" "}
                    za účelem účasti na této akci.
                  </Checkbox>
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="newsletterAgreement" label="" errors={errors} touched={touched} labelCol={{}} wrapperCol={{}}>
                  <Checkbox checked={values.newsletterAgreement} onChange={handleChange}>
                    Chci dostávat upozornění e-mailem o všech akcích organizace Vzdělání budoucnosti, z.s.
                  </Checkbox>
                </AntdFormItem>
              </div>

              <Divider />

              <Space direction="vertical">
                {capacityStatus?.all.isFull && (
                  <Alert type="warning" message="Kroužek je naplněn. I tak stále přijímáme přihlášky. Budeme Vás informovat. Děkujeme" banner />
                )}

                <Space direction="vertical" align="end">
                  <div>
                    <Typography.Text>
                      Potvrzení o registraci společně s platebními údaji Vám zašleme na uvedený kontaktní e-mail ihned po úspěšném odeslání přihlášky.
                    </Typography.Text>
                  </div>

                  <div>
                    {formCompleteSend && "Registrace proběhla úspěšně. Očekávejte potvrzení ve vašem emailu. Děkujeme"}
                    <Button type="primary" htmlType="submit" onClick={() => handleSubmit()} loading={isSubmitting} disabled={!!formCompleteSend}>
                      {formCompleteSend ? "Registrace byla odeslána" : "Odeslat registraci"}
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
