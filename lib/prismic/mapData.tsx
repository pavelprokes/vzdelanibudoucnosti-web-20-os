import React from "react"
import { EmbedField, PrismicDocument } from "@prismicio/types"
import { theme } from "../../styles/styles"
import { CourseAgeGroup, CourseType, CourseVariant } from "./Course"
import { RichText } from "prismic-reactjs"
import { htmlSerializer } from "./htmlSerializer"
import { AuthorAndFeedbacks } from "./courses"
import moment from "moment"
import seedrandom from "seedrandom"
import slugify from "slugify"
import { flatten } from "lodash"

export interface MappedCourse {
  id: string
  slugifyName: string
  numberId: number
  slug: string
  seedNumber: string
  name: string
  excerpt: React.ReactNode
  excerptAsText: string
  content: React.ReactNode
  additionalInformation: React.ReactNode
  rate: number
  difficulty: number
  ageGroup: CourseAgeGroup
  type: CourseType
  courseVariant: CourseVariant
  descriptionType: string
  when: React.ReactNode
  where: React.ReactNode
  moreUrl: string
  registerUrl: string
  typeUrl: string
  price: number
  capacity: number
  registrationGoogleSpreadsheetUrl?: string
  registrationOpenFrom?: string
  registrationOpenTo?: string
  isOpen?: boolean
  isBeforeRegistration?: boolean
  isAfterRegistration?: boolean
  image?: CourseImage
  equipmentPrice?: number
  equipmentInfo?: React.ReactNode
  embed?: EmbedField
}

export interface CourseImage {
  alt: string
  copyright: string | null
  dimensions: {
    width: number
    height: number
  }
  type: "image"
  url: string
}

const getCourseDescriptionType = (ageGroup = CourseAgeGroup.adult, type = CourseType.inPerson): string => {
  let result = ""

  if (type === CourseType.online) {
    result = `online `
  }

  if (ageGroup === CourseAgeGroup.adult) {
    result = `${result}kurzy pro dospělé`
  } else {
    result = `${result}kroužky pro děti`
  }

  return result
}

const getSeedCourseNumber = (id: string): string =>
  Number((Number(seedrandom(id)().toFixed(6)) * 1000000).toString().padStart(6, "0"))
    .toFixed(0)
    .toString()

export const getCourseTypeUrl = (ageGroup = CourseAgeGroup.adult): string => (ageGroup === CourseAgeGroup.adult ? "/kurzy-pro-dospele" : "/krouzky-pro-deti")

export const slugifyCourse = (d: PrismicDocument<any>) => {
  const slugify_name = slugify(d.data.title[0] && d.data.title[0].text, {
    replacement: "-",
    remove: /[/&,+()$#~%.'":*?!<>{}]/g,
    lower: true
  })
  const number_id = Math.round(seedrandom(`${slugify_name}${d.first_publication_date}`)().toFixed(6) * 1000000)
  const slug = `${slugify_name}-d${number_id}`

  return {
    slugify_name,
    number_id,
    slug
  }
}

export const slugifyTechnology = (d: PrismicDocument<any>) => {
  const slugifyName = slugify(d.data.name && d.data.name[0] && d.data.name[0].text, {
    replacement: "-",
    remove: /[/&,+()$#~%.'":*?!<>{}]/g,
    lower: true
  })
  const numberId = Math.round(seedrandom(`${slugifyName}${d.first_publication_date}`)().toFixed(6) * 1000000)
  const slug = `${slugifyName}-d${numberId}`

  return {
    slugifyName,
    numberId,
    slug
  }
}

export const getParamsFromSlug = (slug: string) => {
  const match = flatten([...slug.matchAll(/([a-z0-9-_/]+)-d(\d+)/g)])

  return {
    originalSlug: match[0],
    slugName: match[1],
    numberId: match[2]
  }
}

export const getCourse = (d: PrismicDocument<any>): MappedCourse => {
  const { slugify_name, number_id, slug } = slugifyCourse(d)

  return {
    id: d.id,
    slugifyName: slugify_name,
    numberId: number_id,
    slug,
    seedNumber: getSeedCourseNumber(d.id),
    name: (d.data.title[0] && d.data.title[0].text) || "",
    excerpt: <RichText render={d.data.excerpt} htmlSerializer={htmlSerializer} />,
    excerptAsText: (d.data.excerpt[0] && d.data.excerpt[0].text) || "",
    additionalInformation: <RichText render={d.data.additional_information} htmlSerializer={htmlSerializer} />,
    content: <RichText render={d.data.content} htmlSerializer={htmlSerializer} />,
    rate: 4,
    difficulty: Number(d.data.difficulty),
    ageGroup: d.data.age_group && d.data.age_group !== "" ? d.data.age_group : CourseAgeGroup.children,
    type: d.data.type && d.data.type !== "" ? d.data.type : CourseType.inPerson,
    descriptionType: getCourseDescriptionType(d.data.age_group as CourseAgeGroup, d.data.type as CourseType),
    courseVariant: d.data.course_type as CourseVariant,
    when: (d.data.when[0] && d.data.when[0].text) || "",
    where: (d.data.where[0] && d.data.where[0].text) || "",
    moreUrl: `${getCourseTypeUrl(d.data.age_group as CourseAgeGroup)}/${slug}`,
    registerUrl: `/registrace/${slug}`,
    typeUrl: getCourseTypeUrl(d.data.age_group as CourseAgeGroup),
    price: d.data.price,
    capacity: d.data.capacity,
    registrationGoogleSpreadsheetUrl: d.data.registration_google_spreadsheet_url.url,
    registrationOpenFrom: d.data.registration_open_from,
    registrationOpenTo: d.data.registration_open_to,
    isOpen: isCourseRegistrationOpen(d),
    isBeforeRegistration: isCourseRegistrationBefore(d),
    isAfterRegistration: isCourseRegistrationAfter(d),
    image: d.data.content.find((c) => c.type === "image") || undefined,
    equipmentPrice: d.data.equipment_price || undefined,
    equipmentInfo: d.data.equipment_info ? <RichText render={d.data.equipment_info} htmlSerializer={htmlSerializer} /> : undefined,
    embed: d.data?.embed
  }
}

export const isOngoingCourse = (d: PrismicDocument<any>): boolean => {
  return (
    moment(d.data.registration_open_to).isSameOrAfter(moment().add(-3, "months")) &&
    d.data.type === CourseType.online &&
    d.data.course_type === CourseVariant.course
  )
}

export const isCourseRegistrationOpen = (d: PrismicDocument<any>): boolean => {
  return (
    d.data.registration_open_from &&
    d.data.registration_open_to &&
    moment().isAfter(moment(d.data.registration_open_from)) &&
    moment().isBefore(moment(d.data.registration_open_to))
  )
}

export const isCourseRegistrationBefore = (d: PrismicDocument<any>): boolean =>
  d.data.registration_open_from && moment().isBefore(moment(d.data.registration_open_from))

export const isCourseRegistrationAfter = (d: PrismicDocument<any>): boolean =>
  d.data.registration_open_to && moment().isAfter(moment(d.data.registration_open_to))

export const getTechnology = (d: PrismicDocument<any>) => {
  return getCourseTechnology(d)
}

export const getLecturer = (d: AuthorAndFeedbacks) => {
  return getCourseLecturer(d)
}

export const getFeedBacks = (d: PrismicDocument<any>[]) => {
  return d.map((f) => getFeedback(f))
}

export interface CourseTechnology {
  name: string
  slug: string
  color: string
}

export const getCourseTechnology = (d: PrismicDocument<any>): CourseTechnology => {
  if (!d?.data?.technology?.data) {
    return {
      name: "",
      slug: "",
      color: theme.colors["primary-color"]
    }
  }

  return {
    name: d.data.technology.data.name[0].text,
    slug: d.data.technology.slug,
    color: theme.colors[d.data.technology.data?.color]
  }
}

export interface CourseFeedback {
  name: string
  description: string
  slug: string
  imageUrl?: string
  sex: "male" | "female"
  rate: number
  dateTime: string
}

export const getFeedback = (d: PrismicDocument<any>): CourseFeedback => ({
  description: d.data.description[0].text,
  imageUrl: d.data.image.url,
  name: (d.data.name[0] && d.data.name[0].text) || "",
  sex: d.data.sex,
  slug: d.uid,
  rate: d.data.rate,
  dateTime: d.data.forcedFirstPublicationDate || d.first_publication_date
})

export interface CourseLecturer {
  name: string
  email: string
  bio: React.ReactNode
  pictureUrl: string
  position: string
}

export const getCourseLecturer = (d: AuthorAndFeedbacks): CourseLecturer => {
  if (!d.author?.data) {
    return {
      name: "",
      email: "",
      bio: "",
      pictureUrl: "https://images.prismic.io/slicemachine-blank/30d6602b-c832-4379-90ef-100d32c5e4c6_selfie.png?auto=compress,format",
      position: ""
    }
  }

  return {
    name: (d.author.data.name[0] && d.author.data.name[0].text) || "",
    email: (d.author.data.email[0] && d.author.data.email[0].text) || "",
    bio: (d.author.data.bio[0] && d.author.data.bio[0].text) || "",
    pictureUrl: d.author.data.picture.url,
    position: (d.author.data.position[0] && d.author.data.position[0].text) || ""
  }
}

export interface CourseCapacityStatus {
  isAlmostFull?: boolean
  isFull?: boolean
  lastRowIndex?: number
  capacity?: number
  err?: string
}
