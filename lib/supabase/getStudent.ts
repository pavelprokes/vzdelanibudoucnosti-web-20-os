import { supabaseClient } from "./supabaseClient"

export const getStudent = async () => {
  let { data: student, error } = await supabaseClient.from("student").select("*")

  return student
}
