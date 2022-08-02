import { useEffect, useState } from "react"
import axios from "axios"
import { CheckCourseCapacity } from "./checkCourseCapacity"

export const useCourseCapacityStatus = (props: Props) => {
  const [courseCapacityStatus, setCourseCapacityStatus] = useState<CheckCourseCapacity | undefined>()

  useEffect(() => {
    const getData = async () => {
      await axios
        .post("/api/course-registration/check-course-capacity", props)
        .then((res) => setCourseCapacityStatus(res.data))
        .catch((err) => console.error(err))
    }

    props && getData()
  }, [props])

  return courseCapacityStatus
}

interface Props {
  capacity?: number
  courseSlug?: string
}
