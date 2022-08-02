import * as Prismic from "@prismicio/client"
import { PrismicDocument, Query } from "@prismicio/types"
import { Ordering } from "@prismicio/client"
import { GetCourseListFilterOptions } from "./courses"

export const PrismicClient = Prismic.createClient("https://vzdelanibudoucnosti.cdn.prismic.io/api/v2")
export const defaultLang = "cs-cz"
export enum PrismicCustomTypes {
  blogPost = "blog_post",
  course = "course",
  author = "author",
  section = "section",
  feedback = "feedback",
  technology = "technology",
  technologyTool = "technology_tool",
  coupon = "coupon",
  recommend = "recommend",
  collectionGroup = "collection_group",
  collectionItem = "collection_item",
  landingPage = "landing_page"
}

export const defaultOrdering: Ordering = {
  field: "document.first_publication_date",
  direction: "desc"
}

export const getSections = async (lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({
    predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.section),
    lang,
    orderings: defaultOrdering,
    pageSize: 100
  })

export const getArticlesWithAuthorsByDocumentType = async (
  documentType: PrismicCustomTypes,
  lang = defaultLang,
  withAuthors = true,
  filterOptions?: GetCourseListFilterOptions
): Promise<Query> => {
  const { firstPublicationDate, pageSize } = filterOptions || {}

  return await PrismicClient.get({
    predicates: [
      Prismic.predicate.at("document.type", documentType),
      ...(firstPublicationDate ? [Prismic.predicate.dateAfter("document.first_publication_date", firstPublicationDate)] : [])
    ],
    lang,
    orderings: defaultOrdering,
    pageSize: pageSize || 100,
    ...(withAuthors && { fetchLinks: ["author.name", "author.email", "author.position", "author.picture", "author.bio"] })
  })
}

export const getHighlightedBlogPosts = async (lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({
    predicates: [Prismic.predicate.at("my.blog_post.highlighted", "true"), Prismic.predicate.at("document.type", PrismicCustomTypes.blogPost)],
    lang,
    orderings: defaultOrdering,
    pageSize: 100
  })

export const getAuthors = async (lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({
    predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.author),
    lang,
    orderings: defaultOrdering,
    pageSize: 100
  })

export const getTags = async (): Promise<string[]> => [
  ...new Set(await PrismicClient.getTags().then((res) => res.map((t: string) => (t.trim() || "").toLowerCase())))
]

export const getArticlesByTags = async (tags: string[], customTypes: PrismicCustomTypes[], lang = defaultLang) =>
  await PrismicClient.getAllBySomeTags([...new Set(tags.map((t) => t.trim()))], {
    predicates: [Prismic.predicate.any("document.type", customTypes)],
    lang,
    pageSize: 100
  })

export const getArticlesByNotTag = async (tags: string[], customTypes: PrismicCustomTypes[], lang = defaultLang) =>
  await PrismicClient.getAllBySomeTags([...new Set(tags.map((t) => t.trim()))], {
    predicates: [Prismic.predicate.any("document.type", customTypes)],
    lang,
    pageSize: 100
  })

export const searchPostBySlugAndCategory = async (
  slug: string,
  category: string,
  customTypes: PrismicCustomTypes[],
  lang = defaultLang
): Promise<PrismicDocument<any> | null> => {
  const posts = await getArticlesWithAuthorsByDocumentType(customTypes[0], lang)
  if (!posts) {
    return null
  }

  return posts.results.filter((d: PrismicDocument<any>) => d.data.category.slug === category && d.slugs.includes(slug))[0] || null
}

export const searchPostByCategory = async (category: string, customTypes: PrismicCustomTypes[], lang = defaultLang): Promise<PrismicDocument<any>[] | null> => {
  const posts = await getArticlesWithAuthorsByDocumentType(customTypes[0], lang)
  if (!posts) {
    return null
  }

  return posts.results.filter((d: PrismicDocument<any>) => d.data.category.slug === category) || null
}

export const searchPostByNotCategory = async (
  category: string,
  customTypes: PrismicCustomTypes[],
  lang = defaultLang
): Promise<PrismicDocument<any>[] | null> => {
  const posts = await getArticlesWithAuthorsByDocumentType(customTypes[0], lang)
  if (!posts) {
    return null
  }

  return posts.results.filter((d: PrismicDocument<any>) => d.data.category.slug !== category) || null
}
