import React from "react"
import { PrismicDocument } from "@prismicio/types"
import styled from "@emotion/styled"
import Link from "next/link"
import { Article, BorderedImageWrapper, H2, h2Size, Paragraph } from "./common"
import ArticleFooter from "./ArticleFooter"
import Image from "next/image"
import { md } from "../../styles/mediaQuery"

const StandardArticle = ({ document }: Props) => {
  return (
    <ArticleWithFlex>
      <DivWithFlex>
        <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
          <a title={`Přejít na článek ${document.data.title[0].text}`}>
            <H2 level={2} style={h2Size}>
              {document.data.title[0].text}
            </H2>
          </a>
        </Link>

        <Paragraph>{document.data.excerpt}</Paragraph>

        <ArticleFooter document={document} />
      </DivWithFlex>

      {document.data?.image?.url && document.data.image.url !== "" && (
        <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
          <a title={`Přejít na článek ${document.data.title[0].text}`}>
            <BorderedImageWrapper>
              <Image
                alt={`image-${document.data.title}`}
                src={document.data.image.url}
                width={180}
                height={180}
                objectFit="cover"
                layout="fixed"
                quality={90}
              />
            </BorderedImageWrapper>
          </a>
        </Link>
      )}
    </ArticleWithFlex>
  )
}

const ArticleWithFlex = styled(Article)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 180px;
  padding: 0 0 10px 0;
  margin-bottom: 20px;

  ${md} {
    justify-content: initial;
    align-items: initial;
    flex-direction: column-reverse;
    padding: 0;
  }
`

const DivWithFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 40px;

  ${md} {
    margin-right: 0px;
    margin-top: 10px;
  }
`

interface Props {
  document: PrismicDocument<any>
}

export default StandardArticle
