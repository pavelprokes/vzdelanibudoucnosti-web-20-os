import React from "react"
import { Paragraph } from "./common"
import { Time } from "./Time"
import Link from "next/link"
import { PrismicDocument } from "@prismicio/types"
import { DocumentContent, getReadingTime } from "../../lib/readingTime"

const ArticleFooter = ({ document, className, hideReadMore }: Props) => {
  const readingTime = getReadingTime(document.data.content as DocumentContent[])

  return (
    <small className={className}>
      <Paragraph>
        <Time document={document} /> <span>{document.data.author?.name?.[0].text}</span>
        {" - "}
        <span>{readingTime.czechText}</span>
        {!hideReadMore && (
          <>
            {" - "}
            <span>
              <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
                <a title={`Přejít na článek ${document.data.title[0].text}`}>čti více</a>
              </Link>
            </span>
          </>
        )}
      </Paragraph>
    </small>
  )
}

interface Props {
  document: PrismicDocument<any>
  className?: string
  hideReadMore?: boolean
}

export default ArticleFooter
