import { supabaseClient } from "./supabaseClient"

export const getCountOfSlugRegistrationPayment = async (courseSlug: string): Promise<number> => {
  try {
    const { count } = await supabaseClient.from("registration").select("*, payment!inner(*)", { count: "exact" }).eq("course_slug", courseSlug)

    return count
  } catch (e) {
    throw new Error(`Error when getting last registration id. ${JSON.stringify(e)}`)
  }
}
