import React from "react"
import Container from "../Layout/Container"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"
import { SerializedStyles } from "@emotion/utils"
import Carousel from "react-multi-carousel"
import { TheCarouselWrapper } from "../TheCarousel/TheCarousel"
import Image from "next/image"
import { css } from "@emotion/react"
import { Theme } from "../../styles/theme"
import { CustomLeftArrow, CustomRightArrow, responsive } from "./carouselCustomComponents"

export const LandingCarouselPage = ({ sectionContentCss, color, textColor, children, carousel, theme }: Props) => {
  return (
    <>
      <section>
        <ContentAboveWrapper
          css={css`
            color: ${textColor};
            background-color: ${color};
            overflow: hidden;
          `}>
          <TheCarouselWrapper
            css={css`
              .react-multi-carousel-list {
                width: 100vw;
                height: 60vh;
                margin: 0;
                position: relative;

                &:after {
                  content: "";
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 30%;
                  background: rgb(0, 0, 0);
                  background: linear-gradient(0deg, ${color} 0%, rgba(255, 255, 255, 0) 100%);
                }
              }
            `}>
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              ssr
              arrows
              showDots={false}
              keyBoardControl
              slidesToSlide={1}
              focusOnSelect
              autoPlay
              autoPlaySpeed={5000}
              // @ts-ignore
              customLeftArrow={<CustomLeftArrow theme={theme} />}
              // @ts-ignore
              customRightArrow={<CustomRightArrow theme={theme} />}>
              {carousel.items.map((item) => (
                <div
                  key={item.src}
                  css={css`
                    width: 100vw;
                    height: 60vh;
                    ${item.itemCss ? item.itemCss : ""}
                  `}>
                  {item.content && (
                    <div
                      css={css`
                        width: 100%;
                        height: 100%;
                        z-index: 2;
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      `}>
                      {item.content}
                    </div>
                  )}
                  <Image alt="item-src" src={item.src} layout="fill" objectFit="cover" />
                </div>
              ))}
            </Carousel>
          </TheCarouselWrapper>
        </ContentAboveWrapper>
      </section>

      <Container css={sectionContentCss}>{children}</Container>
    </>
  )
}

export const ContentAboveWrapper = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${md} {
    margin-bottom: 0;
    flex-direction: column;
  }
`

interface Props {
  sectionContent: React.ReactNode
  color: string
  textColor: string
  sectionContentCss?: SerializedStyles
  className?: string
  children: React.ReactNode
  carousel?: LandingPageCarousel
  theme?: Theme
}

export interface LandingPageCarouselItem {
  src: string
  content?: React.ReactNode
  itemCss?: SerializedStyles
  imageCss?: SerializedStyles
}

export interface LandingPageCarousel {
  items: LandingPageCarouselItem[]
}
