import { Layout } from "../Layout/Layout"
import { LandingPage } from "../LandingPage/LandingPage"
import { H1 } from "../blog/common"
import { Alert, Typography } from "antd"
import React from "react"
import styled from "@emotion/styled"
import { md } from "../../styles/mediaQuery"
import { PrismicDocument } from "@prismicio/types"
import { CoursesList } from "../CoursesList/CoursesList"
import { getCourseTechnology } from "../../lib/prismic/mapData"
import { theme } from "../../styles/styles"
import { Section } from "../Section"
import { SubscribeForm } from "../SubscribeForm/SubscribeForm"
import slugify from "slugify"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"

export const TypeCourseTypeTechnologyPageComponent = ({ courses, title, description, url }: Props) => {
  const imageFromContent: { url: string; alt: string } | undefined = {
    url: courses[0]?.data?.content?.find((c) => c.type === "image")?.url,
    alt: courses[0]?.data?.content?.find((c) => c.type === "image")?.alt
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${webUrl}/${url}`}
        openGraph={{
          url: `${webUrl}/${url}`,
          title,
          description,
          ...(imageFromContent && {
            images: [
              {
                url: imageFromContent.url,
                width: 1280,
                height: 964,
                alt: imageFromContent.alt || slugify(title)
              }
            ]
          })
        }}
      />

      <Layout>
        <LandingPage
          color={courses[0] ? getCourseTechnology(courses[0]).color : theme.colors["primary-color"]}
          sectionContent={
            <>
              <LandingPageLeftSectionHeading>
                <H1>{title}</H1>
                <Typography.Paragraph>{description}</Typography.Paragraph>
              </LandingPageLeftSectionHeading>
            </>
          }>
          <Section>
            {courses.length > 0 ? (
              <CoursesList courses={courses} />
            ) : (
              <Alert type="info" message="Zat??m nem??me nab??dku pro tyto krou??ky, kurzy nebo workshopy." />
            )}
          </Section>

          <Section>
            <Typography.Title level={2}>Odb??r novinek</Typography.Title>
            <SubscribeForm
              tags={["Krouzky", slugify(title).toLowerCase()]}
              description="Neve??li jste se do kapacity na???? registrace na krou??ek nebo kurz? Chcete v??d??t o novink??ch nab??zen??ch krou??k??? Vypl??te sv??j email a my V??m d??me v??d??t."
            />
          </Section>
        </LandingPage>
      </Layout>
    </>
  )
}

interface Props {
  courses: PrismicDocument<any>[]
  title: string
  description: string
  url: string
}

const LandingPageLeftSectionHeading = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  position: relative;

  ${md} {
    padding: 20px;
  }
`
