import { defaultLang, defaultOrdering, PrismicClient, PrismicCustomTypes } from "./prosmic"
import * as Prismic from "@prismicio/client"
import { PrismicDocument, Query } from "@prismicio/types"
import slugify from "slugify"
import seedrandom from "seedrandom"
import { getParamsFromSlug } from "./mapData"

export const getLandingPages = async (tags?: string[], lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({
    predicates: [
      Prismic.predicate.at("document.type", PrismicCustomTypes.landingPage),
      ...(tags && tags.length > 0 ? [Prismic.predicate.any("document.tags", [...new Set(tags.map((t) => t.trim().toLowerCase() || ""))])] : [])
    ],
    pageSize: 6,
    orderings: defaultOrdering,
    lang
  })

export const slugifyLandingPage = (d: PrismicDocument<any>) => {
  const title = (d.data?.title && d.data?.title?.[0] && d.data?.title[0]?.text) || (d.data?.name && d.data?.name?.[0] && d.data?.name?.[0]?.text)
  const slugifyName = slugify(title, {
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

export const getLandingPageBySlug = async (slug: string) => {
  const landingPageRes = await getLandingPages()
  const filteredTechnology = landingPageRes.results.find((c) => {
    const { numberId: courseNumberId } = slugifyLandingPage(c)
    const { numberId: numberIdFromSlug } = getParamsFromSlug(slug)

    return Number(courseNumberId) === Number(numberIdFromSlug)
  })

  if (!filteredTechnology?.data) {
    return null
  }

  return filteredTechnology
}
