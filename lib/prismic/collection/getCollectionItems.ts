import { defaultLang, defaultOrdering, PrismicClient, PrismicCustomTypes } from "../prosmic"
import * as Prismic from "@prismicio/client"
import { EmbedField, LinkToMediaField, PrismicDocument, RelationField, RichTextField, TitleField } from "@prismicio/types"

export const getCollectionItems = async (pageSize = 100, lang = defaultLang) =>
  await PrismicClient.get<PrismicDocumentCollectionItem>({
    predicates: Prismic.predicate.at("document.type", PrismicCustomTypes.collectionItem),
    pageSize,
    orderings: defaultOrdering,
    lang
  })

// https://github.com/prismicio/prismic-client/blob/master/examples/with-typescript/index.ts
export type PrismicDocumentCollectionItem = PrismicDocument<
  {
    name: TitleField
    description: RichTextField
    group: RelationField
    media: LinkToMediaField
    embed: EmbedField
    embed_media: EmbedField
  },
  "page",
  "cs-cz"
>
