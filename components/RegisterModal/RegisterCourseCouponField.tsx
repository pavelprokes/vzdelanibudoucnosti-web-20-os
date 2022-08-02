import React from "react"
import { AntdFormItem } from "../AntdFormItem/AntdFormItem"
import { RegisterStudentCourse } from "./types"
import { Input } from "antd"
import { FormikErrors, FormikTouched } from "formik/dist/types"
import axios from "axios"

export const getCourseCouponDetail = async (coupon: string): Promise<CourseRegistrationCoupon> => {
  return await axios
    .post<CourseRegistrationCoupon>("/api/coupon/findCoupon", { coupon })
    .then((res) => res.data[0].data)
    .catch(() => [])
}

export const registerCourseCouponValidator = async (values: RegisterStudentCourse): Promise<FormikErrors<RegisterStudentCourse> | undefined> => {
  if (values.coupon && values.coupon !== "") {
    const couponRes = await getCourseCouponDetail(values.coupon)

    if (!couponRes) {
      return {
        coupon: "Neplatný nebo neexistující kupón."
      }
    }
  }
}

export const RegisterCourseCouponField = ({ coupon, handleChange, handleBlur, errors, touched }: Props) => {
  return (
    <AntdFormItem<RegisterStudentCourse> name="coupon" label="Slevový kód" errors={errors} touched={touched}>
      <Input value={coupon} onChange={handleChange} onBlur={handleBlur} />
    </AntdFormItem>
  )
}

interface Props {
  coupon: string
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.ChangeEvent<any>) => void
  errors: FormikErrors<RegisterStudentCourse>
  touched: FormikTouched<RegisterStudentCourse>
}

export interface CourseRegistrationCoupon {
  title: string
  description: string
  value: number
  code: string
  validFrom: string
  validTo: string
}
