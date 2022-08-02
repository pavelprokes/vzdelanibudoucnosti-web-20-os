import { Moment } from "moment"
import { CourseRegistrationCoupon } from "../components/RegisterModal/RegisterCourseCouponField"

export interface PaymentData {
  variableNumber: string
  amount: {
    value: number
    discount?: number
  }
  comment: string
  account: number
  ibanAccount: string
  bank: number
  coupon?: CourseRegistrationCoupon
}

export const generateQrServerUrl = "https://pay-with-qr.vzdelanibudoucnosti.cz"
export const account = 2501679946
export const ibanAccount = "CZ2720100000002501679946"
export const bank = 2010

export const getCompleteAccountNumber = (): string => `${account}/${bank} (IBAN: ${ibanAccount})`

export const qrImageUrl = (variableSymbol: string | number, amout: string | number, dueDate?: Moment, comment?: string): string =>
  `${generateQrServerUrl}/?variable_symbol=${variableSymbol}&amout=${amout}&account=${account}&bank=${bank}${
    dueDate ? `&due_date=${dueDate.format("YYYY-MM-DD")}` : ""
  }${comment ? `&comment=${encodeURI(comment)}` : ""}`
