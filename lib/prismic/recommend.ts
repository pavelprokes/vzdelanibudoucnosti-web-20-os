import { defaultLang, defaultOrdering, PrismicClient, PrismicCustomTypes } from "./prosmic"
import * as Prismic from "@prismicio/client"
import { Query } from "@prismicio/types"

export const getRecommends = async (lang = defaultLang): Promise<Query> =>
  await PrismicClient.get({
    predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.recommend),
    pageSize: 6,
    orderings: defaultOrdering,
    lang
  })
