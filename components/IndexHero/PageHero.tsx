import React from "react"
import { ContentAboveContent, ContentAboveWrapper, whiteText } from "../Layout/common"
import { H1, Paragraph } from "../blog/common"
import { css } from "@emotion/react"
import { md, sm } from "../../styles/mediaQuery"
import FullWidthImage from "../Layout/FullWidthImage"
import styled from "@emotion/styled"
import { theme } from "../../styles/styles"

export const PageHero = ({ children, imageBgUrl, h1, text }: Props) => {
  return (
    <>
      <ContentAboveWrapper>
        <ContentAboveContentHero>
          <Half>
            <H1 className="ml11" style={whiteText}>
              {h1}
            </H1>
            <Paragraph
              style={whiteText}
              css={css`
                ${sm} {
                  font-size: 16px;
                }
              `}>
              {text}
            </Paragraph>
          </Half>

          {children ? children : null}
        </ContentAboveContentHero>
      </ContentAboveWrapper>

      <FullWidthImage imageBgUrl={imageBgUrl || "/images/01_2022_vzdelani_budoucnosti_web_header_1920_1.jpg"} height="50vh" />
    </>
  )
}

interface Props {
  children?: React.ReactNode
  imageBgUrl?: string
  h1: string
  text: React.ReactNode
}

const ContentAboveContentHero = styled(ContentAboveContent)`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: center;
  margin-top: -40px;

  ${md} {
    flex-direction: column;
    gap: 20px;
    margin-top: -20px;
  }
`

const Half = styled.div``

export const BlockHalf = styled(Half)`
  width: 40vw;

  .ant-space-item {
    width: 100%;
  }

  ${md} {
    width: 100%;
  }
`

export const HeroTextBlock = styled.div`
  color: black;
  font-size: 12px;
  border-radius: 20px;
  background-color: white;
  padding: 16px;
  position: relative;
  cursor: pointer;
  transition: ${theme.effects.transition.default};

  &:hover {
    background-color: ${theme.colors["main-color-blue"]};

    .ant-typography {
      color: white;
    }
  }
`
