import React from "react"
import { Alert, Switch, Typography } from "antd"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { RegisterStudentCourse } from "./types"
import { css } from "@emotion/react"
import TextArea from "antd/lib/input/TextArea"
import { MappedCourse } from "../../lib/prismic/mapData"
import { FormikErrors, FormikTouched } from "formik/dist/types"

export const RegisterCourseEquipmentFormItems = ({ courseWithEquipment, values, course, errors, touched, setFieldValue, handleChange }: Props) => {
  return (
    <>
      {courseWithEquipment && (
        <>
          <Typography.Title level={3}>Vybavení kurzu</Typography.Title>
          <AntdFormItem<RegisterStudentCourse>
            name="equipmentBuyFromOrganization"
            label={<Typography.Text>Přejete si zakoupit a zaslat vybavení od nás nebo zajistíte sami?</Typography.Text>}
            css={css`
              span {
                white-space: normal;
              }

              label {
                &:after {
                  content: "";
                }
              }
            `}
            errors={errors}
            touched={touched}>
            <Switch
              checkedChildren="ano"
              unCheckedChildren="ne"
              checked={values.equipmentBuyFromOrganization}
              onChange={(value) => setFieldValue("equipmentBuyFromOrganization", value, true)}
            />
            <Typography.Text
              css={css`
                top: 2px;
                position: relative;
                margin-left: 10px;
              `}>
              {values.equipmentBuyFromOrganization ? "Ano, přeji si vybavení zakoupit a nechat zaslat." : "Ne, zajistím si vybavení sám(a)."}
            </Typography.Text>
          </AntdFormItem>
        </>
      )}

      {values.equipmentBuyFromOrganization === true && (
        <>
          <AntdFormItem<RegisterStudentCourse>
            name="equipmentSendToAddress"
            label={<Typography.Text>Zadejte prosím vaší adresu kam chcete vybavení zaslat:</Typography.Text>}
            errors={errors}
            touched={touched}
            css={css`
              span {
                white-space: normal;
              }

              label {
                &:after {
                  content: "";
                }
              }
            `}>
            <TextArea
              onChange={handleChange}
              value={values.equipmentSendToAddress}
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder={`Jméno Přijmení\nUlice 1234\n100 00 Praha 1`}
            />
          </AntdFormItem>

          {course.equipmentInfo && course.equipmentPrice && (
            <Alert
              type="success"
              message={
                <>
                  {course.equipmentInfo}
                  {`${course.equipmentPrice ? ` Cena vybavení včetně poštovného a balného ${course.equipmentPrice},- Kč. Bude přičtena k ceně kurzu.` : ""}`}
                </>
              }
              css={css`
                margin: 0 0 20px 0;

                .ant-typography {
                  margin-bottom: 0;
                }

                .ant-alert-message {
                  > div {
                    display: inline-block;
                  }
                }
              `}
            />
          )}
        </>
      )}
    </>
  )
}

interface Props {
  courseWithEquipment: boolean
  values: RegisterStudentCourse
  course: MappedCourse
  errors: FormikErrors<RegisterStudentCourse>
  touched: FormikTouched<RegisterStudentCourse>
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  handleChange: (e: React.ChangeEvent<any>) => void
}
