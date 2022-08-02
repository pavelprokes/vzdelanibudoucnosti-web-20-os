import { defaultLang, defaultOrdering, PrismicClient, PrismicCustomTypes } from "../prosmic"
import * as Prismic from "@prismicio/client"
import { ImageField, PrismicDocument, RelationField, RichTextField, TitleField } from "@prismicio/types"

export const getCollectionGroups = async (withParent = false, pageSize = 100, lang = defaultLang) =>
  await PrismicClient.get<PrismicDocumentCollectionGroup>({
    predicates: [
      Prismic.predicate.at("document.type", PrismicCustomTypes.collectionGroup),
      ...(withParent ? [Prismic.predicate.has("my.collection_group.parent")] : [Prismic.predicate.missing("my.collection_group.parent")])
    ],
    pageSize,
    orderings: defaultOrdering,
    lang
  })

// https://github.com/prismicio/prismic-client/blob/master/examples/with-typescript/index.ts
export type PrismicDocumentCollectionGroup = PrismicDocument<
  {
    name: TitleField
    description: RichTextField
    cover_image: ImageField
    parent: RelationField
  },
  "page",
  "cs-cz"
>
