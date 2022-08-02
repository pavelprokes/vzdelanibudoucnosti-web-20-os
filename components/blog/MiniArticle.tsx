import React from "react"
import { PrismicDocument } from "@prismicio/types"
import styled from "@emotion/styled"
import Link from "next/link"
import ArticleFooter from "./ArticleFooter"
import { BorderedImageWrapper, H3, h3Size } from "./common"
import Image from "next/image"
import { md } from "../../styles/mediaQuery"

const MiniArticle = ({ document }: Props) => {
  return (
    <ArticleWithFlex>
      <DivWithFlex>
        <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
          <a title={`Přejít na článek ${document.data.title[0].text}`}>
            <H3 level={3} style={h3Size}>
              {document.data.title[0].text}
            </H3>
          </a>
        </Link>

        <ArticleFooter document={document} hideReadMore />
      </DivWithFlex>

      {document.data?.image?.url && document.data.image.url !== "" && (
        <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
          <a title={`Přejít na článek ${document.data.title[0].text}`}>
            <BorderedImageWrapper>
              {document.data.image.url && (
                <Image
                  alt={`image-${document.data.title}`}
                  src={document.data.image.url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  layout="fixed"
                  quality={100}
                />
              )}
            </BorderedImageWrapper>
          </a>
        </Link>
      )}
    </ArticleWithFlex>
  )
}

const ArticleWithFlex = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding: 0 0 10px 0;

  ${md} {
    justify-content: initial;
    align-items: initial;
    flex-direction: column-reverse;
    padding: 0;
    margin-bottom: 20px;
    min-height: 100px;
  }
`

const DivWithFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 10px;

  ${md} {
    margin-right: 0px;
    margin-top: 10px;
  }
`

interface Props {
  document: PrismicDocument<any>
}

export default MiniArticle
