import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList, GetCourseListFilterOptions } from "../lib/prismic/courses"
import { TypeCourseTypeTechnologyPageComponent } from "../components/Pages/TypeCourseTypeTechnology"
import { CourseAgeGroup, CourseType, CourseVariant } from "../lib/prismic/Course"
import { PrismicDocument } from "@prismicio/types"
// import moment from "moment"

const url = "krouzky-pro-deti-praha"
const title = "Kroužky pro děti v Praze ale vlastně diký naší online výuce odkudkoliv."
const description = `Nabízíme ${title.toLowerCase()}`

const params: GetCourseListFilterOptions = {
  ageGroup: CourseAgeGroup.children,
  type: CourseType.online,
  courseType: CourseVariant.course
  //registrationOpenFrom: `${moment().format("YYYY-MM-DD")}T00:00:00+0000`
  //registrationOpenTo: `${moment().format("YYYY-MM-DD")}T00:00:00+0000`
}

const OnlineKrouzekProDeti3dTisk = ({ courses }: Props) => (
  <TypeCourseTypeTechnologyPageComponent courses={courses} title={title} description={description} url={url} />
)

export default OnlineKrouzekProDeti3dTisk

interface Props extends GetCourseListFilterOptions {
  courses: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList({ ...params })

  return {
    props: {
      courses: coursesRes.results || [],
      ...params
    },
    revalidate: process.env.NODE_ENV !== "production" ? 10 : 60
  }
}
