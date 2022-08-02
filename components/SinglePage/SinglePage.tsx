import React from "react"
import { ContentAboveContent, ContentAboveWrapper, whiteText } from "../Layout/common"
import FullwidthBgColor from "../Layout/FullWidthBgColor"
import Container from "../Layout/Container"
import { Typography } from "antd"
import { css } from "@emotion/react"

export const SinglePage = ({ title, color, className, children }: Props) => {
  return (
    <>
      <section>
        <ContentAboveWrapper>
          <ContentAboveContent>
            <Typography.Title
              className="ml11"
              style={whiteText}
              css={css`
                text-align: center;
              `}>
              {title}
            </Typography.Title>
          </ContentAboveContent>
        </ContentAboveWrapper>

        <FullwidthBgColor color={color || "#02589B"} height="20vh" />
      </section>

      <Container className={className}>{children}</Container>
    </>
  )
}

interface Props {
  title: string
  color?: string
  className?: string
  children: React.ReactNode
}
