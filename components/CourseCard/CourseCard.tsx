import React from "react"
import styled from "@emotion/styled"
import { Button, Rate, Space, Tooltip, Typography } from "antd"
import Link from "next/link"
import { css } from "@emotion/react"
import { md, sm, xl } from "../../styles/mediaQuery"
import { CourseTechnology, MappedCourse } from "../../lib/prismic/mapData"
import { H4 } from "../blog/common"
import Image from "next/image"
import { darken, desaturate, rgba } from "polished"
import { Theme } from "../../styles/theme"
import { theme as themeColorPalette } from "../../styles/styles"

const getTopSpaceTextColorTheme = (theme: Theme, technology: CourseTechnology, isOpen: boolean): string => {
  if (theme === Theme.dark) {
    return darken(0.2, technology.color)
  }

  if (!isOpen) {
    return desaturate(0.2, technology.color)
  }

  return technology.color
}

export const CourseCard = ({ course, technology, simpleLayout = false, theme, informationOnly = false }: CourseCardType) => {
  const textColor = theme === Theme.dark ? themeColorPalette.colors.dark.textWhite : "#fff"

  return (
    <>
      <CourseCardWrapper theme={theme}>
        <Link href={course.registerUrl}>
          <a title={`Přejít na ${course.name}`}>
            <TopSpace simpleLayout={simpleLayout}>
              <TopSpaceText color={getTopSpaceTextColorTheme(theme, technology, course.isOpen)} bgOpacity={course.image ? 0.5 : 1}>
                <Typography.Text type="secondary" style={{ color: textColor, fontSize: 12, textTransform: "uppercase" }}>
                  {course.descriptionType}
                </Typography.Text>

                <Typography.Title level={3} style={{ color: textColor, marginBottom: 0 }}>
                  {course.name}
                </Typography.Title>
              </TopSpaceText>

              <div
                css={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;

                  ${course.isOpen ? "" : grayScaleImageStyle}
                `}>
                {course.image && course.image.url && (
                  <Image alt={course.image.alt || "course-image-url"} src={course.image.url} layout="fill" objectFit="cover" />
                )}
              </div>
            </TopSpace>
          </a>
        </Link>

        {!simpleLayout && (
          <BottomSpace theme={theme}>
            {informationOnly ? (
              <Typography.Paragraph style={paragraphStyle} ellipsis={ellipsis}>
                {course.excerptAsText}
              </Typography.Paragraph>
            ) : (
              <>
                <Rate
                  disabled
                  defaultValue={course.rate}
                  style={{ fontSize: 14 }}
                  css={css`
                    position: absolute;
                    right: 0;
                    top: 0;
                    margin: 10px 10px 0 0;
                  `}
                />
                <Space direction="vertical">
                  <div>
                    <H4 level={4} style={h4Style}>
                      Kde?
                    </H4>
                    <Typography.Paragraph style={paragraphStyle} ellipsis={ellipsis}>
                      {course.where}
                    </Typography.Paragraph>
                  </div>
                  <div>
                    <H4 level={4} style={h4Style}>
                      Kdy?
                    </H4>
                    <Typography.Paragraph style={paragraphStyle} ellipsis={ellipsis}>
                      {course.when}
                    </Typography.Paragraph>
                  </div>
                  <div>
                    <H4 level={4} style={h4Style}>
                      Informace
                    </H4>
                    <Typography.Paragraph style={paragraphStyle} ellipsis={ellipsis}>
                      {course.excerptAsText}
                    </Typography.Paragraph>
                  </div>
                </Space>
              </>
            )}
            <FlexEnd>
              {course.isOpen ? (
                <Button
                  type="primary"
                  {...(theme === Theme.dark && {
                    style: {
                      backgroundColor: desaturate(0.3, themeColorPalette.colors["primary-color"]),
                      borderColor: desaturate(0.4, themeColorPalette.colors["primary-color"])
                    }
                  })}>
                  <Link href={course.registerUrl}>
                    <a>Více informací</a>
                  </Link>
                </Button>
              ) : (
                <Button type="primary">
                  <Link href={course.registerUrl}>
                    <a>Více informací</a>
                  </Link>
                </Button>
              )}
            </FlexEnd>
          </BottomSpace>
        )}
      </CourseCardWrapper>
    </>
  )
}

export interface CourseCardType {
  course: MappedCourse
  technology: CourseTechnology
  simpleLayout?: boolean
  theme?: Theme
  informationOnly?: boolean
}

const CourseCardWrapper = styled.div<{ disabled?: boolean; isBeforeRegistration?: boolean; isAfterRegistration?: boolean; theme?: Theme }>`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  height: 100%;
  position: relative;

  ${(props: { disabled?: boolean; isBeforeRegistration?: boolean; isAfterRegistration?: boolean; theme?: Theme }) =>
    props.disabled || props.isBeforeRegistration || props.isAfterRegistration
      ? `
    pointer-events: none;
    filter: grayscale(1);
    opacity: 75%;
    
    &:before {
      content: "${props.isBeforeRegistration ? "Již brzy!" : ""}${props.isAfterRegistration ? "Již proběhlo." : ""}"
      position: absolute;
      transform: rotate(-45deg) translate(50%, 50%);
      top: 50%;
      left: 5%;
      color: #fff;
      z-index: 9;
      opacity: 50%;
      font-size: 50px;
      padding: 5px 15px 5px 15px;
      ${props.theme === Theme.dark ? `background-color: ${themeColorPalette.colors.dark.bgGray};` : `background-color: #000;`}
    }
  `
      : ""}

  ${md} {
    flex-direction: column;
    width: 100%;
  }
`

const TopSpace = styled.div<{ simpleLayout: boolean }>`
  position: relative;
  ${(props: { simpleLayout: boolean }) => (props.simpleLayout ? `height: 150px;` : `height: 180px;`)}
  width: 100%;

  ${xl} {
    min-width: 140px;
    width: initial;
  }

  ${md} {
    min-width: 140px;
    width: initial;
    height: 150px;
  }

  ${sm} {
    min-width: 130px;
    width: initial;
  }
`

const TopSpaceText = styled.div<{ color: string; bgOpacity: number }>`
  ${(props: { color: string; bgOpacity: number }) => `background-color: ${rgba(props.color, props.bgOpacity)};`}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${md} {
    padding: 10px;
  }

  &:hover {
    ${(props: { color: string }) => `background-color: ${rgba(props.color, 0.8)};`}
  }
`

const BottomSpace = styled.div<{ theme?: Theme }>`
  width: 100%;
  padding: 15px;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  place-content: space-between;
  ${(props: { theme?: Theme }) =>
    props.theme === Theme.dark
      ? `
    background-color: ${themeColorPalette.colors.dark.bgGray};
    
    .ant-typography, h3.ant-typography {
      color: ${themeColorPalette.colors.dark.textWhite};  
    }
  `
      : `background-color: #fff;`}

  ${md} {
    padding: 10px;
  }
`

const FlexEnd = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
`

const ellipsis = {
  rows: 4,
  symbol: "rozbalit",
  expandable: true
}

const paragraphStyle = {
  fontSize: 12,
  marginBottom: 0
}

const h4Style = {
  marginBottom: "0.25em"
}

const grayScaleImageStyle = `
  img {
    filter: grayscale(100%);
  }
`
