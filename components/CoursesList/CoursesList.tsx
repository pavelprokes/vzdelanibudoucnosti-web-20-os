import React from "react"
import { TheCarousel } from "../TheCarousel/TheCarousel"
import { css } from "@emotion/react"
import { md } from "../../styles/mediaQuery"
import { TheCarouselItem } from "../TheCarousel/TheCarouselItem"
import { Alert, Col, Row } from "antd"
import { CourseCard } from "../CourseCard/CourseCard"
import { getCourse, getTechnology } from "../../lib/prismic/mapData"
import { PrismicDocument } from "@prismicio/types"
import { Theme } from "../../styles/theme"

const CoursesListItems = ({
  course,
  simpleLayout,
  theme,
  informationOnly
}: {
  course: PrismicDocument
  simpleLayout: boolean
  theme: Theme
  informationOnly: boolean
}) => {
  return (
    <CourseCard course={getCourse(course)} technology={getTechnology(course)} simpleLayout={simpleLayout} theme={theme} informationOnly={informationOnly} />
  )
}

export const CoursesList = ({ courses, simpleLayout = false, className, theme, informationOnly }: Props) => {
  const carouselItems = courses.map((d) => (
    <CoursesListItems key={d.id} course={d} simpleLayout={simpleLayout} theme={theme} informationOnly={informationOnly} />
  ))
  if (!carouselItems || carouselItems.length === 0) {
    return <Alert message="V této sekci zatím nemáme vypsané žádné kroužky pro děti nebo kurzy pro dospělé." type="warning" />
  }

  return (
    <>
      {carouselItems.length >= 2 && (
        <TheCarousel
          css={css`
            display: none;

            ${md} {
              display: block;
            }
          `}
          className={className}
          slidesToSlide={1}
          partialVisible
          arrows={false}
          showDots={false}
          ssr={true}
          infinite={false}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 768 },
              items: 2,
              partialVisibilityGutter: 150
            },
            tablet: {
              breakpoint: { max: 767, min: 575 },
              items: 2,
              partialVisibilityGutter: simpleLayout ? 60 : 150
            },
            mobile: {
              breakpoint: { max: 576, min: 319 },
              items: 2,
              partialVisibilityGutter: 15
            },
            smallMobile: {
              breakpoint: { max: 320, min: 0 },
              items: 2,
              partialVisibilityGutter: simpleLayout ? 10 : 15
            }
          }}>
          {carouselItems.map((item, i) => (
            <TheCarouselItem key={`TheCarouselItem-${i}`}>{item}</TheCarouselItem>
          ))}
        </TheCarousel>
      )}

      <Row
        gutter={[
          { xs: 15, sm: 15, md: 15, lg: 15, xl: 30 },
          { xs: 15, sm: 15, md: 15, lg: 15, xl: 30 }
        ]}
        css={css`
          ${carouselItems.length >= 2
            ? `
              ${md} {
                display: none;
              }            
          `
            : ""}
        `}
        className={className}>
        {carouselItems.map((item, i) => (
          <Col key={`Col-${i}`} xs={12} sm={6} md={6} lg={6} xl={6}>
            {item}
          </Col>
        ))}
      </Row>
    </>
  )
}

interface Props {
  courses: PrismicDocument[]
  simpleLayout?: boolean
  className?: string
  theme?: Theme
  informationOnly?: boolean
}
