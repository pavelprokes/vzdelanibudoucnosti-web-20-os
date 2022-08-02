import { CourseLecturer, MappedCourse } from "../../lib/prismic/mapData"
import { CheckCourseCapacity } from "../../lib/supabase/checkCourseCapacity"

export interface RegistrationFormProps {
  course: MappedCourse
  capacityStatus: CheckCourseCapacity
  lecturer: CourseLecturer
}
