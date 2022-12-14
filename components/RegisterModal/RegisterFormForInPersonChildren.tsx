import React, { useState } from "react"
import { Formik } from "formik"
import { Alert, Button, Checkbox, Divider, Form, Input, message, Select, Space, Tooltip, Typography } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import Link from "next/link"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { RegisterStudentCourse } from "./types"
import { onSubmitHandler } from "./common"
import { RegisterFormWrapper } from "./RegisterFormWrapper"
import { RegistrationFormProps } from "./RegistrationFormProps"
import * as yup from "yup"
import { phoneYupValidationSchema } from "./phoneRegExp"
import { registerCourseCouponValidator } from "./RegisterCourseCouponField"
import { relationToStudent, yearOfStudies } from "./enums"
import { OutputCourseRegistration } from "../../lib/supabase/insertCourseRegistration"
import { RegisterThankYouModalWindow } from "./RegisterThankYouModalWindow"
import {
  courseRegistrationIsSignValidationSchema,
  emailValidationSchema,
  firstnameValidationSchema,
  lastnameValidationSchema,
  relationToStudentValidationSchema,
  schoolValidationSchema,
  yearOfStudiesValidationSchema
} from "./validations/courseREgistrationValidationSchemas"

message.config({
  top: 100
})

export const RegisterFormForInPersonChildren = ({ course, lecturer, capacityStatus }: RegistrationFormProps) => {
  const [formCompleteSend, setFormCompleteSend] = useState<OutputCourseRegistration | null>(null)
  const initialValues: RegisterStudentCourse = {
    student: {
      firstname: "",
      lastname: "",
      yearOfStudies: "",
      school: "",
      email: ""
    },
    studentContact: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      relationToStudent: ""
    },
    iSignUp: false,
    newsletterAgreement: false
  }

  const registerFormValidationSchema = yup.object().shape({
    student: yup.object().shape({
      firstname: firstnameValidationSchema,
      lastname: lastnameValidationSchema,
      yearOfStudies: yearOfStudiesValidationSchema,
      school: schoolValidationSchema,
      email: emailValidationSchema
    }),
    studentContact: yup.object().shape({
      firstname: firstnameValidationSchema,
      lastname: lastnameValidationSchema,
      email: emailValidationSchema,
      phone: phoneYupValidationSchema,
      relationToStudent: relationToStudentValidationSchema
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
        {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, touched, errors, isValidating, isSubmitting }) => (
          <>
            <Form>
              <div>
                <Typography.Title level={2}>Registra??n?? formul????</Typography.Title>
                <Typography.Text>Vypln??n??m t??to p??ihl????ky p??ihla??ujete uveden??ho ????ka na z??jmov?? krou??ek {course.name}.</Typography.Text>
                <Typography.Title level={3}>??daje o ????kovi</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="student.firstname" label="Jm??no" errors={errors} touched={touched}>
                  <Input value={values.student.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.lastname" label="P??ijmen??" errors={errors} touched={touched}>
                  <Input value={values.student.lastname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.school" label="??kola" errors={errors} touched={touched}>
                  <Input value={values.student.school} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse>
                  name="student.yearOfStudies"
                  label={
                    <Space>
                      <span>Ro??n??k ????k</span>
                      <Tooltip title="U gymnazist?? za??krtn??te b????n?? ekvivalent.">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                  errors={errors}
                  touched={touched}>
                  <Select value={values.student.yearOfStudies} onChange={(value) => setFieldValue("student.yearOfStudies", value, true)} onBlur={handleBlur}>
                    {yearOfStudies.map((s) => (
                      <Select.Option key={s} value={s}>
                        {s}
                      </Select.Option>
                    ))}
                  </Select>
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.email" label="Email" errors={errors} touched={touched}>
                  <Input value={values.student.email} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <Typography.Title level={3}>??daje o z??kon??m z??stupci</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.firstname" label="Jm??no" errors={errors} touched={touched}>
                  <Input value={values.studentContact.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.lastname" label="P??ijmen??" errors={errors} touched={touched}>
                  <Input value={values.studentContact.lastname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.email" label="Email" errors={errors} touched={touched}>
                  <Input value={values.studentContact.email} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.phone" label="Telefon" errors={errors} touched={touched}>
                  <Input value={values.studentContact.phone} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse>
                  name="studentContact.relationToStudent"
                  label="Vztah kontaktn?? osoby k ????kovi"
                  errors={errors}
                  touched={touched}>
                  <Select
                    value={values.studentContact.relationToStudent}
                    onChange={(value) => setFieldValue("studentContact.relationToStudent", value, true)}
                    onBlur={handleBlur}>
                    {relationToStudent.map((s) => (
                      <Select.Option key={s} value={s}>
                        {s}
                      </Select.Option>
                    ))}
                  </Select>
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
