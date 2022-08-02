import { supabaseClient } from "../supabaseClient"
import moment from "moment"
import { PaymentTable } from "../insertPayment"

export const setReminder = async (paymentId: number) => {
  try {
    return await supabaseClient.from<PaymentTable>("payment").update({ first_reminder: moment().toISOString() }).match({ id: paymentId })
  } catch (e) {
    throw new Error(`Error when setting registration n reminder. ${JSON.stringify(e)}`)
  }
}
