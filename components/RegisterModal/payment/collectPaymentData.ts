import { account, bank, ibanAccount, PaymentData } from "../../../config/payments"
import { RegisterStudentCourse } from "../types"
import { CourseRegistrationCoupon } from "../RegisterCourseCouponField"
import { collectPaymentComment, countFinalAmount } from "./gettingPaymentAttributes"
import { CourseOnBackend } from "../../../lib/supabase/insertCourseRegistration"

export const collectPaymentData = async (
  { coupon, student, equipmentBuyFromOrganization }: RegisterStudentCourse,
  { seedNumber, name, price, equipmentPrice }: CourseOnBackend,
  countOfSlugRegistrationPayment: number,
  couponDetail: CourseRegistrationCoupon
): Promise<PaymentData> => {
  return {
    variableNumber: `${seedNumber}${(countOfSlugRegistrationPayment + 1).toString().padStart(4, "0")}`,
    comment: collectPaymentComment(name, student.email, equipmentBuyFromOrganization),
    amount: countFinalAmount(price, equipmentPrice, equipmentBuyFromOrganization, couponDetail?.value),
    account: account,
    ibanAccount: ibanAccount,
    bank: bank,
    coupon: couponDetail
  }
}
