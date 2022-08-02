import moment from "moment"
import React from "react"
import { PrismicDocument } from "@prismicio/types"

export const Time = ({ document }: Props) => <time dateTime={document.first_publication_date!}>{moment(document.first_publication_date).format("LLL")}</time>

interface Props {
  document: PrismicDocument<any>
}
