import { supabaseClient } from "./supabaseClient"
import { PaymentData } from "../../config/payments"

export const insertPayment = async (paymentData: PaymentData): Promise<PaymentTable> => {
  try {
    const remappedPaymentData: Omit<PaymentTable, "id"> = {
      amount: paymentData.amount.value,
      comment: paymentData.comment,
      coupon: paymentData.coupon?.code || null,
      variable_number: paymentData.variableNumber,
      is_paid: paymentData.amount.value === 0,
      first_reminder: null,
      second_reminder: null
    }

    const { data, error } = await supabaseClient.from<PaymentTable>("payment").insert([remappedPaymentData], { returning: "representation" }).single()

    if (error) {
      throw new Error(`Error when creating payment. ${JSON.stringify(error)}`)
    }

    return data
  } catch (e) {
    throw new Error(`Error when creating payment. ${JSON.stringify(e)}`)
  }
}

export interface PaymentTable {
  id: number
  variable_number: string
  comment: string
  is_paid: boolean
  first_reminder: string
  second_reminder: string
  amount: number
  coupon?: string
}
