import React from "react"
import { BackTop } from "antd"
import styled from "@emotion/styled"
import { HeaderMenu } from "../Layout/HeaderMenu"
import { Footer } from "../Layout/Footer"
import { ContentAboveContent, ContentAboveWrapper } from "../Layout/common"
import FullWidthImage from "../Layout/FullWidthImage"
import { HeaderWithHeight } from "../Layout/HeaderWithHeight"
import { SerializedStyles } from "@emotion/utils"
import { css } from "@emotion/react"

export const CollectionLayout = ({ children, contentAbove, moveUp = "20vh", contentAboveWrapperClassName }: Props) => {
  return (
    <>
      <HeaderWithHeight style={{ position: "absolute", zIndex: 1, width: "100%", top: 0 }}>
        <HeaderMenu />
      </HeaderWithHeight>

      <Inner moveUp={moveUp}>
        <section
          css={css`
            z-index: 0;
          `}>
          {contentAbove && (
            <ContentAboveWrapper css={contentAboveWrapperClassName}>
              <ContentAboveContent>{contentAbove}</ContentAboveContent>
            </ContentAboveWrapper>
          )}
          <FullWidthImage imageBgUrl="/images/01_2022_vzdelani_budoucnosti_web_header_1920_1.jpg" height="65vh" />
        </section>

        {children}
      </Inner>

      <Footer />

      <BackTop />
    </>
  )
}

CollectionLayout.auth = true

const Inner = styled.div<{ moveUp: string }>`
  section + main.ant-layout-content {
    margin-top: -${(props: { moveUp: string }) => props.moveUp};
    margin-bottom: ${(props: { moveUp: string }) => props.moveUp};
    z-index: 1;
  }
`

interface Props {
  children: React.ReactNode
  contentAbove?: React.ReactNode
  moveUp?: string
  contentAboveWrapperClassName?: SerializedStyles
}
