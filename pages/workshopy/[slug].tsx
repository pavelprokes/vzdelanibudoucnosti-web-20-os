import React from "react"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { PrismicDocument } from "@prismicio/types"
import { Course } from "../../lib/prismic/courses"
import { CoursesSlugPage, getStaticCoursesPageSlugPaths, getStaticCoursesPageSlugProps } from "../../components/Courses/CoursesSlugPage"
import { CourseVariant } from "../../lib/prismic/Course"

const WorkshopySlug = (props: Props) => {
  return <CoursesSlugPage {...props} />
}

interface Props {
  slug: string
  document: Course | null
  blogPostsWithSameTag: PrismicDocument<any>[] | null
  openSimilarCourses: PrismicDocument<any>[] | null
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => getStaticCoursesPageSlugPaths({ courseType: CourseVariant.workshop })

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<Props>> =>
  getStaticCoursesPageSlugProps(params, { courseType: CourseVariant.workshop })

export default WorkshopySlug
