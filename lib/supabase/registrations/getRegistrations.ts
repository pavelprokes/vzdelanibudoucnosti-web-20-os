import { supabaseClient } from "../supabaseClient"
import { RegistrationTableWithPaymentStudentLegalRepre } from "../insertCourseRegistration"

export const getRegistrations = async () => {
  try {
    return await supabaseClient
      .from<RegistrationTableWithPaymentStudentLegalRepre>("registration")
      .select("*, payment (*), student (*), legal_representative (*)", { count: "exact" })
      .order("id", { ascending: false })
  } catch (e) {
    throw new Error(`Error when getting registrations. ${JSON.stringify(e)}`)
  }
}
