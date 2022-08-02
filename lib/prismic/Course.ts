interface TextField {
  type: string
  text: string
  spans: any[]
}

interface Link {
  linkType: string
  url: string
}

export enum CourseType {
  inPerson = "in person",
  online = "online"
}

export enum CourseVariant {
  course = "course",
  projectDays = "projectDays",
  sampleCourse = "sampleCourse",
  workshop = "workshop"
}

export enum CourseAgeGroup {
  adult = "adult",
  children = "children"
}

export interface CourseData {
  additionalInformation: TextField[]
  content: TextField
  courseFrom: string
  courseTo: string
  excerpt: TextField[]
  price: number
  registrationGoogleSpreadsheetUrl: Link
  registrationOpenFrom: string
  registrationOpenTo: string
  title: TextField[]
  type: CourseType
  where: TextField[]
}
