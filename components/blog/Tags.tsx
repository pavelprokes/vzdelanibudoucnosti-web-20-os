import React from "react"
import { SmallBlock } from "./common"
import Link from "next/link"
import { PrismicDocument } from "@prismicio/types"

const Tags = ({ document }: Props) => {
  if (document.tags.length === 0) {
    return null
  }

  return (
    <SmallBlock>
      {document.tags.map((t, i, a) => (
        <Link key={`tags${t}`} href={`/blog/stitek/${encodeURIComponent(t)}`}>
          <>
            <a title={`Přejít na ${t}`}>{t}</a>
            {a.length !== i + 1 ? " | " : ""}
          </>
        </Link>
      ))}
    </SmallBlock>
  )
}

interface Props {
  document: PrismicDocument<any>
}

export default Tags
