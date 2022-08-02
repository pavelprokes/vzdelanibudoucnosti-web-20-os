import React from "react"
import * as prismicH from "@prismicio/helpers"
import { Typography } from "antd"
import Image from "next/image"
import Link from "next/link"
import { Elements, HTMLSerializer, LinkResolver } from "prismic-reactjs"
import reactStringReplace from "react-string-replace"
import { css } from "@emotion/react"
import { md, sm } from "../../styles/mediaQuery"
import { nanoid } from "nanoid"
import styled from "@emotion/styled"
import { getSnippetsFromText } from "./snippets"
import Embed from "react-embed"

export const linkResolver: LinkResolver = (doc) => {
  // Pretty URLs for known types
  if (doc.type === "blog") return "/blog/" + doc.uid
  if (doc.type === "page") return "/" + doc.uid
  // Fallback for other types, in case new custom types get created
  return "/" + doc.id
}

export const htmlSerializer: HTMLSerializer<React.ReactNode> = (type, element, content, children): React.ReactNode => {
  const key = nanoid()

  switch (type) {
    case Elements.heading1:
      return (
        <Typography.Title key={key} level={1}>
          {element.text}
        </Typography.Title>
      )
    case Elements.heading2:
      return (
        <Typography.Title key={key} level={2}>
          {element.text}
        </Typography.Title>
      )
    case Elements.heading3:
      return (
        <Typography.Title key={key} level={3}>
          {element.text}
        </Typography.Title>
      )
    case Elements.heading4:
      return (
        <Typography.Title key={key} level={4}>
          {element.text}
        </Typography.Title>
      )
    case Elements.heading5:
      return (
        <Typography.Title key={key} level={5}>
          {element.text}
        </Typography.Title>
      )
    case Elements.heading6:
      return (
        <Typography.Title key={key} level={5}>
          {element.text}
        </Typography.Title>
      )
    case Elements.paragraph:
      const spansType = element.spans?.[0]?.type
      const snippet = getSnippetsFromText(element.text)

      const paragraphComponent = (
        <Typography.Paragraph key={key} {...(spansType === "strong" && { strong: true })}>
          <>{snippet}</>
        </Typography.Paragraph>
      )

      if (spansType === "hyperlink") {
        const hyperlinkSpan = (element.spans || []).find((s) => s.type === "hyperlink")
        return (
          <Link key={hyperlinkSpan.data.url} href={hyperlinkSpan.data.url}>
            <a target={hyperlinkSpan.data.target}>{element.text}</a>
          </Link>
        )
      }

      if (spansType === "em") {
        return <em key={key}>{paragraphComponent}</em>
      }

      return paragraphComponent
    case Elements.preformatted:
      return <pre key={key}>{children.join("")}</pre>
    case Elements.strong:
      return (
        <Typography.Text key={key} strong>
          {element.text}
        </Typography.Text>
      )
    case Elements.em:
      return <em key={key}>{element.text}</em>
    case Elements.listItem:
      return <li key={key}>{element.text}</li>
    case Elements.oListItem:
      return <li key={key}>{element.text}</li>
    case Elements.list:
      return <ul key={key}>{children}</ul>
    case Elements.oList:
      return <ol key={key}>{children}</ol>
    case Elements.image:
      const imageLinkUrl = element.linkTo ? prismicH.asLink(element.linkTo, linkResolver) : null
      const imageComponent = (
        <div key={key}>
          <div css={imageEmbedStyleWrapper(element.dimensions.width <= element.dimensions.height)}>
            <Image loading="eager" alt={element.alt || "image-alt"} src={element.url} layout="fill" objectFit="contain" />
          </div>
          {element.alt && element.alt !== "" && (
            <Typography.Text type="secondary">
              <em>{element.alt}</em>
            </Typography.Text>
          )}
        </div>
      )

      if (imageLinkUrl) {
        return (
          <Link key={key} href={imageLinkUrl}>
            <a target={element.linkTo.target}>{imageComponent}</a>
          </Link>
        )
      }

      return imageComponent
    case Elements.embed:
      const youtubeEmbeddedUrl =
        element?.oembed?.provider_name?.toLowerCase() === "youtube"
          ? `//www.youtube.com/embed/${getYoutubeId(element.oembed.embed_url)}`
          : element.oembed.embed_url

      return (
        <EmbeddedVideoWrapper key={key}>
          <div data-oembed={element.oembed.embed_url} data-oembed-type={element.oembed.type} data-oembed-provider={element.oembed.provider_name}>
            <iframe
              width={element.oembed.width}
              height={element.oembed.height}
              src={youtubeEmbeddedUrl}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>
        </EmbeddedVideoWrapper>
      )
    case Elements.hyperlink:
      const linkUrl = prismicH.asLink(element.data, linkResolver)
      return (
        <Link key={key} href={linkUrl}>
          <a target={element.data.target}>{element.text}</a>
        </Link>
      )
    case Elements.label:
      return <span key={key}>{element.text}</span>
    case Elements.span:
      return content ? reactStringReplace(content, /(?:\r\n|\r|\n)/g, () => <br />) : null
    default:
      return null
  }
}

const imageEmbedStyleWrapper = (isPortraitOrSquare?: boolean) => css`
  max-width: 650px;
  ${isPortraitOrSquare ? "max-height: 300px;" : ""}
  min-height: 450px;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;

  ${md} {
    width: 100%;
    height: auto;
    min-height: 300px;
  }

  ${sm} {
    width: 100%;
    height: auto;
    min-height: 30vh;
  }
`

const EmbeddedVideoWrapper = styled.div`
  width: 650px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 0;

  ${md} {
    width: 100%;
    height: auto;
  }

  > div {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}
