import { supabaseClient } from "./supabaseClient"

export const checkIsExistCourseRegistration = async (email: string, courseSlug: string) => {
  const registrationInnerJoinRes = await supabaseClient
    .from("registration")
    .select("*,student!inner(*)", { count: "exact" })
    .eq("student.email", email)
    .eq("course_slug", courseSlug)

  return registrationInnerJoinRes.count !== 0
}
