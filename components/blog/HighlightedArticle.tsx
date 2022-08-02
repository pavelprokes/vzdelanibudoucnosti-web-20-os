import React from "react"
import { PrismicDocument } from "@prismicio/types"
import Link from "next/link"
import Image from "next/image"
import { Article, BorderedImageWrapper, H2, h2Size, H3, h3Size, ImageWrapperMargin } from "./common"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { rgba } from "polished"
import { theme } from "../../styles/styles"
import { Button, Typography } from "antd"
import { md } from "../../styles/mediaQuery"

const HighlightedArticle = ({ document, titleAs = "h2", className }: Props) => {
  return (
    <Article className={className}>
      <ImageWrapperMargin>
        <ContentAboveImage>
          <FlexHeightWrapper>
            <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
              <a title={`Přejít na článek ${document.data.title[0].text}`}>
                {titleAs === "h3" ? (
                  <H3
                    ellipsis={{
                      rows: 4,
                      symbol: "..."
                    }}
                    level={3}
                    style={{
                      ...h3Size,
                      color: "white"
                    }}>
                    {document.data.title[0].text}
                  </H3>
                ) : (
                  <H2
                    ellipsis={{
                      rows: 3,
                      symbol: "..."
                    }}
                    level={2}
                    style={{
                      ...h2Size,
                      color: "white"
                    }}>
                    {document.data.title[0].text}
                  </H2>
                )}
              </a>
            </Link>

            <Typography.Paragraph
              ellipsis={{
                rows: 5,
                symbol: "..."
              }}
              css={css`
                color: white;

                ${md} {
                  margin-bottom: 0;
                }
              `}>
              {document.data.excerpt}
            </Typography.Paragraph>

            <Link href={`/blog/${document.data.category?.slug}/${document.slugs?.[0]}`}>
              <a
                title={`Přejít na článek ${document.data.title[0].text}`}
                css={css`
                  place-self: end;
                `}>
                <Button type="primary">Přejít na článek</Button>
              </a>
            </Link>
          </FlexHeightWrapper>
        </ContentAboveImage>

        {document.data?.image?.url && document.data.image.url !== "" && (
          <BorderedImageWrapper>
            <Image src={document.data.image.url} alt={document.data.image.alt || "header-post-image."} layout="fill" objectFit="cover" />
          </BorderedImageWrapper>
        )}
      </ImageWrapperMargin>
    </Article>
  )
}

const ContentAboveImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  background-color: ${rgba(theme.colors["main-color-blue"], 0.6)};
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    background-color: ${rgba(theme.colors["main-color-blue"], 0.8)};
  }

  ${md} {
    padding: 10px;
    justify-content: center;

    > div {
      margin-bottom: 0;
    }
  }
`

const FlexHeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  place-content: space-between;
  height: 100%;
`

interface Props {
  document: PrismicDocument<any>
  titleAs?: "h2" | "h3"
  className?: string
}

export default HighlightedArticle
