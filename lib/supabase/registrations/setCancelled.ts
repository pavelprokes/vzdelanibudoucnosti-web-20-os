import { supabaseClient } from "../supabaseClient"
import { RegistrationTable } from "../insertCourseRegistration"
import moment from "moment"

export const setCancelled = async (registrationId: number, cancel_reason = "") => {
  try {
    return await supabaseClient
      .from<RegistrationTable>("registration")
      .update({ cancel_reason, cancel_when: moment().toISOString() })
      .match({ id: registrationId })
  } catch (e) {
    throw new Error(`Error when setting registration as cancelled. ${JSON.stringify(e)}`)
  }
}
