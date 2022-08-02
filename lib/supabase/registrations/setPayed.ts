import { supabaseClient } from "../supabaseClient"
import { PaymentTable } from "../insertPayment"

export const setPayed = async (paymentId: number, is_paid: boolean) => {
  try {
    return await supabaseClient.from<PaymentTable>("payment").update({ is_paid }).match({ id: paymentId })
  } catch (e) {
    throw new Error(`Error when setting registration as payed. ${JSON.stringify(e)}`)
  }
}
