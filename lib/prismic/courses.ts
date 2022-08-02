import * as Prismic from "@prismicio/client"
import { defaultLang, defaultOrdering, PrismicClient, PrismicCustomTypes } from "./prosmic"
import { CourseFeedback, getParamsFromSlug, slugifyCourse, slugifyTechnology } from "./mapData"
import { CourseAgeGroup, CourseType, CourseVariant } from "./Course"
import { PrismicDocument, Query } from "@prismicio/types"

export interface AuthorAndFeedbacks {
  author: PrismicDocument<any>
  feedbacks: PrismicDocument<any>[]
}

export const getAuthorWithFeedbacksByUid = async (documentUid: string, lang = defaultLang): Promise<AuthorAndFeedbacks> => {
  const author = await PrismicClient.getByUID(PrismicCustomTypes.author, documentUid, {
    lang,
    fetchLinks: ["technology.name", "technology.slug", "technology.description", "feedback.name", "feedback.description", "feedback.image", "feedback.sex"],
    orderings: defaultOrdering,
    pageSize: 100
  })

  const feedbacks = await PrismicClient.get({ predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.feedback), lang, pageSize: 100 })
  // @ts-ignore
  const filteredFeedbacks = (feedbacks.results || []).filter((d) => d.data.lecturer?.id === author.id)

  return {
    author,
    feedbacks: filteredFeedbacks
  }
}

export interface GetCourseListFilterOptions {
  ageGroup?: CourseAgeGroup
  type?: CourseType
  tags?: string[]
  courseType?: CourseVariant
  registrationOpenFrom?: string
  registrationOpenTo?: string
  firstPublicationDate?: string
  technology?: string
  difficulty?: number
  pageSize?: number
}

export const getCourseList = async (filterOptions?: GetCourseListFilterOptions, lang = defaultLang) => {
  const { ageGroup, tags, type, courseType, registrationOpenFrom, registrationOpenTo, firstPublicationDate, technology, difficulty, pageSize } =
    filterOptions || {}

  return await PrismicClient.get({
    predicates: [
      ...(tags && tags.length > 0 ? [Prismic.predicate.any("document.tags", [...new Set(tags.map((t) => t.trim().toLowerCase() || ""))])] : []),
      ...(ageGroup ? [Prismic.predicate.at("my.course.age_group", ageGroup)] : []),
      ...(type ? [Prismic.predicate.at("my.course.type", type)] : []),
      ...(courseType ? [Prismic.predicate.at("my.course.course_type", courseType)] : []),
      ...(firstPublicationDate ? [Prismic.predicate.dateAfter("document.first_publication_date", firstPublicationDate)] : []),
      ...(registrationOpenFrom ? [Prismic.predicate.dateAfter("my.course.registration_open_from", registrationOpenFrom)] : []),
      ...(registrationOpenTo ? [Prismic.predicate.dateBefore("my.course.registration_open_to", registrationOpenTo)] : []),
      ...(technology ? [Prismic.predicate.at("my.course.technology", technology)] : []),
      ...(difficulty ? [Prismic.predicate.at("my.course.difficulty", difficulty.toString())] : []),
      Prismic.predicate.at("document.type", PrismicCustomTypes.course)
    ],
    lang,
    orderings: defaultOrdering,
    pageSize: pageSize || 100,
    fetchLinks: [
      "technology.name",
      "technology.slug",
      "technology.description",
      "technology.color",
      "author.name",
      "author.email",
      "author.position",
      "author.picture",
      "author.bio"
    ]
  })
}

export interface Course {
  course: PrismicDocument<any> | null
  authorWithFeedbacks: AuthorAndFeedbacks | null
}

export const getCourseBySlug = async (slug: string, filterOptions?: GetCourseListFilterOptions) => {
  const courseRes = await getCourseList(filterOptions)
  const filteredCourse = courseRes.results.find((c) => {
    const { number_id: courseNumberId } = slugifyCourse(c)
    const { numberId: numberIdFromSlug } = getParamsFromSlug(slug)

    return Number(courseNumberId) === Number(numberIdFromSlug)
  })

  if (!filteredCourse?.data) {
    return {
      course: null,
      authorWithFeedbacks: null
    }
  }

  // TODO ? what is with uid
  // @ts-ignore
  const authorWithFeedbacks = filteredCourse?.data?.lecturer?.uid && (await getAuthorWithFeedbacksByUid(filteredCourse.data.lecturer.uid))

  return {
    course: filteredCourse,
    authorWithFeedbacks
  }
}

export const getTechnologyBySlug = async (slug: string) => {
  const technologiesRes = await getTechnologyList()
  const filteredTechnology = technologiesRes.results.find((c) => {
    const { numberId: courseNumberId } = slugifyTechnology(c)
    const { numberId: numberIdFromSlug } = getParamsFromSlug(slug)

    return Number(courseNumberId) === Number(numberIdFromSlug)
  })

  if (!filteredTechnology?.data) {
    return null
  }

  return filteredTechnology
}

export const getFeedbacksRateRound = (feedbacks: CourseFeedback[]): number => {
  if (feedbacks.length === 0) {
    return 0
  } else if (feedbacks.length === 1) {
    return feedbacks[0].rate
  }

  const sumOfRates = feedbacks.reduce((val, curr) => curr.rate + val, 0)
  return Math.round((sumOfRates / feedbacks.length) * 100) / 100
}

export const getFeedbackAvatarUrl = (sex: "male" | "female", index: number): string =>
  `/images/${sex}/${sex === "male" ? "boy" : "girl"}${index === 0 ? "" : `-${index}`}.svg`

export const getTechnologyList = async (lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({ predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.technology), pageSize: 100, lang })
    .then((res) => res)
    .catch((err) => err)
