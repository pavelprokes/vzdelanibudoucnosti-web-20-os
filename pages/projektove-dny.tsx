import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList, GetCourseListFilterOptions } from "../lib/prismic/courses"
import { TypeCourseTypeTechnologyPageComponent } from "../components/Pages/TypeCourseTypeTechnology"
import { CourseVariant } from "../lib/prismic/Course"
import { PrismicDocument } from "@prismicio/types"

const url = "projektove-dny"
const title = "Projektové dny"
const description = `Nabízíme ${title.toLowerCase()}`

const params: GetCourseListFilterOptions = {
  courseType: CourseVariant.projectDays
}

const ProjektoveDny = ({ courses }: Props) => <TypeCourseTypeTechnologyPageComponent courses={courses} title={title} description={description} url={url} />

export default ProjektoveDny

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
