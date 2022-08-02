import React from "react"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList, GetCourseListFilterOptions } from "../lib/prismic/courses"
import { TypeCourseTypeTechnologyPageComponent } from "../components/Pages/TypeCourseTypeTechnology"
import { CourseVariant } from "../lib/prismic/Course"
import { PrismicDocument } from "@prismicio/types"

const url = "ukazkove-lekce"
const title = "Ukazkové lekce"
const description = `Nabízíme ${title.toLowerCase()}. Vyzkoušení našich lekcí zcela ZDARMA. Vyzkoušením našich lekcí se k ničemu nezavazujete. Výuku zdarma můžete vyzkoušet Vy, Váš partner, ale hlavně Vaše děti. Řekněto o ní také svým kolegům v práci, nabídka platí pro každého! Nepotřebujete nic speciálního, stačí Vám počítač, ale i chytrý mobilní telefon. A samozřejmě připojení k internetu a trochu klidu. Vše Vám vysvětlíme a pak si to naživo vyzkoušíte. Nic neriskujete.`

const params: GetCourseListFilterOptions = {
  courseType: CourseVariant.sampleCourse
}

const UkazkovéLekce = ({ courses }: Props) => <TypeCourseTypeTechnologyPageComponent courses={courses} title={title} description={description} url={url} />

export default UkazkovéLekce

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
