import React from "react"
import { FormikErrors, FormikTouched } from "formik"
import { NamePath } from "rc-field-form/lib/interface"
import { ColProps } from "antd/lib/col"

export interface RegisterStudent {
  firstname: string
  lastname: string
  yearOfStudies?: string
  schoolRegion?: string
  birth?: number
  school?: string
  email: string
  phone?: string
}

export interface RegisterStudentContact {
  firstname: string
  lastname: string
  email: string
  phone: string
  relationToStudent: string
}

export interface AntdFormItemProps<M> {
  className?: string
  children: React.ReactNode
  touched: FormikTouched<M>
  errors: FormikErrors<M>
  name: NamePath
  label: React.ReactNode
  labelCol?: ColProps
  wrapperCol?: ColProps
  noStyle?: boolean
}

export interface RegisterStudentCourse {
  student: RegisterStudent
  studentContact?: RegisterStudentContact
  iSignUp: boolean
  processingOfPersonalDataAgreement?: boolean
  agreementAcquisitionOfPersonsPhotos?: boolean
  newsletterAgreement?: boolean
  equipmentBuyFromOrganization?: boolean
  equipmentSendToAddress?: string
  coupon?: string
}
