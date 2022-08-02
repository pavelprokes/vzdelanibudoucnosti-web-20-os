import { supabaseClient } from "./supabaseClient"

const isAlmostFullPercentage = 75

const getIsAlmostFull = (countOfRegistrations: number, capacity: number, isAlmostFullPercentage: number): boolean => {
  if (countOfRegistrations === 0) {
    return false
  }

  if ((countOfRegistrations / capacity) * 100 < isAlmostFullPercentage) {
    return false
  }

  return true
}

export const checkCourseCapacity = async (courseSlug: string, capacity: number): Promise<CheckCourseCapacity> => {
  try {
    const { count: countOfRegistrations } = await supabaseClient
      .from("registration")
      .select("*, payment!inner(*)", { count: "exact" })
      .eq("course_slug", courseSlug)

    return {
      all: {
        isFull: countOfRegistrations >= capacity,
        isAlmostFull: getIsAlmostFull(countOfRegistrations, capacity, isAlmostFullPercentage)
      }
    }
  } catch (e) {
    throw new Error(`Error when checking course capacity ${courseSlug}, capacity: ${capacity}. ${JSON.stringify(e)}`)
  }
}

export interface CheckCourseCapacity {
  all: CourseCapacityItem
}

interface CourseCapacityItem {
  isFull: boolean
  isAlmostFull: boolean
}
