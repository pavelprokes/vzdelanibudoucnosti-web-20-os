import React from "react"
import Container from "../Layout/Container"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"
import { SerializedStyles } from "@emotion/utils"
import { css } from "@emotion/react"

export const LandingPage = ({
  sectionContent,
  sectionContentCss = css`
    h1,
    p,
    div {
      color: white;
    }
  `,
  color,
  className,
  children
}: Props) => {
  return (
    <>
      <section>
        <ContentAboveWrapper>
          <ContentAboveContent color={color} css={sectionContentCss}>
            {sectionContent}
          </ContentAboveContent>
        </ContentAboveWrapper>
      </section>

      <Container className={className}>{children}</Container>
    </>
  )
}

export const ContentAboveWrapper = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  ${md} {
    margin-bottom: 0;
    flex-direction: column;
  }
`

export const ContentAboveContent = styled.div<{ color: string }>`
  display: flex;
  width: 100%;
  height: calc(100%);
  padding-top: 80px;
  padding-right: 40px;
  padding-left: 40px;
  ${(props: { color: string }) => `background-color: ${props.color};`}

  ${md} {
    padding-top: 50px;
    padding-right: 20px;
    padding-left: 20px;
    flex-direction: column;
  }
`

interface Props {
  sectionContent: React.ReactNode
  color: string
  sectionContentCss?: SerializedStyles
  className?: string
  children: React.ReactNode
}
