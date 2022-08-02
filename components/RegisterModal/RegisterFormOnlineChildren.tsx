import React, { useState } from "react"
import { Formik } from "formik"
import { Alert, Button, Checkbox, Divider, Form, Input, message, Select, Space, Tooltip, Typography } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { RegisterStudentCourse } from "./types"
import { onSubmitHandler } from "./common"
import { RegisterFormWrapper } from "./RegisterFormWrapper"
import { RegistrationFormProps } from "./RegistrationFormProps"
import * as yup from "yup"
import Link from "next/link"
import { phoneYupValidationSchema } from "./phoneRegExp"
import { RegisterCourseCouponField, registerCourseCouponValidator } from "./RegisterCourseCouponField"
import { relationToStudent, schoolRegions, yearOfStudies } from "./enums"
import { OutputCourseRegistration } from "../../lib/supabase/insertCourseRegistration"
import { RegisterThankYouModalWindow } from "./RegisterThankYouModalWindow"
import {
  courseRegistrationCourseWithEquipmentValidationSchema,
  courseRegistrationIsSignValidationSchema,
  emailValidationSchema,
  firstnameValidationSchema,
  lastnameValidationSchema,
  relationToStudentValidationSchema,
  schoolRegionValidationSchema,
  schoolValidationSchema,
  yearOfStudiesValidationSchema
} from "./validations/courseREgistrationValidationSchemas"
import { RegisterCourseEquipmentFormItems } from "./RegisterCourseEquipmentFormItems"

message.config({
  top: 100
})

export const RegisterFormOnlineChildren = ({ course, lecturer, capacityStatus }: RegistrationFormProps) => {
  const [formCompleteSend, setFormCompleteSend] = useState<OutputCourseRegistration | null>(null)
  const courseWithEquipment = course.equipmentPrice !== undefined || course.equipmentPrice > 0
  const initialValues: RegisterStudentCourse = {
    student: {
      firstname: "",
      lastname: "",
      yearOfStudies: "",
      schoolRegion: "",
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
    newsletterAgreement: false,
    ...(courseWithEquipment && {
      equipmentBuyFromOrganization: true,
      equipmentSendToAddress: ""
    }),
    coupon: undefined
  }

  const registerFormValidationSchema = yup.object().shape({
    student: yup.object().shape({
      firstname: firstnameValidationSchema,
      lastname: lastnameValidationSchema,
      yearOfStudies: yearOfStudiesValidationSchema,
      schoolRegion: schoolRegionValidationSchema,
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
    newsletterAgreement: yup.boolean(),
    ...(courseWithEquipment && courseRegistrationCourseWithEquipmentValidationSchema),
    coupon: yup.string()
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
                <Typography.Title level={2}>Registrační formulář</Typography.Title>
                <Typography.Text>Vyplněním této přihlášky přihlašujete uvedeného žáka na zájmový kroužek {course.name}.</Typography.Text>
                <Typography.Title level={3}>Údaje o žákovi</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="student.firstname" label="Jméno" errors={errors} touched={touched}>
                  <Input value={values.student.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.lastname" label="Přijmení" errors={errors} touched={touched}>
                  <Input value={values.student.lastname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse>
                  name="student.schoolRegion"
                  label={
                    <Space>
                      <span>Kraj školy</span>
                      <Tooltip title="V jakém kraji se nachází škola žáka.">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                  errors={errors}
                  touched={touched}>
                  <Select value={values.student.schoolRegion} onChange={(value) => setFieldValue("student.schoolRegion", value, true)} onBlur={handleBlur}>
                    {schoolRegions.map((s) => (
                      <Select.Option key={s} value={s}>
                        {s}
                      </Select.Option>
                    ))}
                  </Select>
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="student.school" label="Škola" errors={errors} touched={touched}>
                  <Input value={values.student.school} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse>
                  name="student.yearOfStudies"
                  label={
                    <Space>
                      <span>Ročník žák</span>
                      <Tooltip title="U gymnazistů zaškrtněte běžný ekvivalent.">
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

                <Typography.Title level={3}>Údaje o zákoném zástupci</Typography.Title>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.firstname" label="Jméno" errors={errors} touched={touched}>
                  <Input value={values.studentContact.firstname} onChange={handleChange} onBlur={handleBlur} />
                </AntdFormItem>

                <AntdFormItem<RegisterStudentCourse> name="studentContact.lastname" label="Přijmení" errors={errors} touched={touched}>
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
                  label="Vztah kontaktní osoby k žákovi"
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

                <RegisterCourseEquipmentFormItems
                  courseWithEquipment={courseWithEquipment}
                  values={values}
                  course={course}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                />

                <Typography.Title level={3}>Slevy a akce</Typography.Title>
                <RegisterCourseCouponField coupon={values.coupon} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />

                <AntdFormItem<RegisterStudentCourse> name="iSignUp" label="" errors={errors} touched={touched} labelCol={{}} wrapperCol={{}}>
                  <Checkbox checked={values.iSignUp} onChange={handleChange}>
                    Závazně přihlašuji osobu uvedenou jako &quot;žák&quot; na kroužek {course.name} a zároveň souhlasím se{" "}
                    <Link href={"/zpracovani-osobnich-udaju"}>
                      <a title="Zpracování osobních údajů" target="_blank">
                        zpracováním osobních údajů
                      </a>
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