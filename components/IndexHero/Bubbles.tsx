import React from "react"
import { css } from "@emotion/react"
import Link from "next/link"
import { Typography } from "antd"
import { BlockHalf, HeroTextBlock } from "./IndexHero"

export const Bubbles = ({ mappedBubbles }: Props) => {
  return mappedBubbles?.length > 0 ? (
    <BlockHalf>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}>
        {mappedBubbles.map((b) => (
          <HeroTextBlock key={b.title}>
            {b.link ? (
              <Link href={b.link}>
                <a title={b.title}>
                  <Typography.Title level={4}>{b.title}</Typography.Title>
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 1,
                      suffix: "  čtěte více"
                    }}
                    style={heroBlockParagraphStyle}>
                    {b.text}
                  </Typography.Paragraph>
                </a>
              </Link>
            ) : (
              <>
                <Typography.Title level={4}>{b.title}</Typography.Title>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 1,
                    suffix: "  čtěte více"
                  }}
                  style={heroBlockParagraphStyle}>
                  {b.text}
                </Typography.Paragraph>
              </>
            )}
          </HeroTextBlock>
        ))}
      </div>
    </BlockHalf>
  ) : null
}

interface Props {
  mappedBubbles: Bubble[]
}

const heroBlockParagraphStyle = {
  marginBottom: 0
}

export interface Bubble {
  title: string
  text: React.ReactNode
  link?: string
}
