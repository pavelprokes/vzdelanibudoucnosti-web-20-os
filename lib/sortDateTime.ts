import { PrismicDocument } from "@prismicio/types"

export const sortDocumentByDateTime = (a: PrismicDocument<any>, b: PrismicDocument<any>) =>
  Math.abs(new Date(b.first_publication_date).getTime() - new Date(a.first_publication_date).getTime())
