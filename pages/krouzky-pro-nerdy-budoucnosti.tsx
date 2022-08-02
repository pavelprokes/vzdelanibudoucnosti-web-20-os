import React from "react"
import { Typography } from "antd"
import { Layout } from "../components/Layout/Layout"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { css } from "@emotion/react"
import { CoursesList } from "../components/CoursesList/CoursesList"
import { PrismicDocument } from "@prismicio/types"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../lib/prismic/courses"
import { LandingCarouselPage } from "../components/LandingPage/LandingCarouselPage"
import { Section } from "../components/Section"
import { isCourseRegistrationOpen } from "../lib/prismic/mapData"
import { theme } from "../styles/styles"
import { Theme } from "../styles/theme"

const dev = process.env.NODE_ENV !== "production"

const LP_PythonProBitcoin32021 = ({ openCourses }: Props) => {
  const title = "krouzky pro nerdy budoucnosti"
  const url = "krouzky-pro-nerdy-budoucnosti"
  const description = "Pojďte naprogramovat funkční kód, kterým propojíte vaše účty na směnárnách ve 2 navazujících workshopech."
  const bgBlack = theme.colors.dark.bgBlack
  const textWhite = theme.colors.dark.textWhite

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
          images: [
            {
              url: `${webUrl}/images/lp/03-20210-python-a-bitcoin-v1_1280x964.png`,
              width: 1280,
              height: 964,
              alt: "03-20210-python-a-bitcoin-v1_1280x964"
            }
          ]
        }}
      />

      <Layout>
        <LandingCarouselPage
          theme={Theme.dark}
          color={bgBlack}
          textColor={textWhite}
          sectionContentCss={css`
            margin-top: -80px;
          `}
          sectionContent={<></>}
          carousel={{
            items: [
              {
                src: "/images/hacker-working-darkness.jpg",
                content: (
                  <div
                    css={css`
                      text-align: center;
                    `}>
                    <Typography.Title level={1} style={{ color: textWhite }}>
                      Ahoj nerdi!
                    </Typography.Title>
                    <Typography.Text style={{ color: textWhite }}>Toto je stranka pro vsechny opravdove nerdy budoucnosti.</Typography.Text>
                  </div>
                ),
                itemCss: css`
                  background-color: rgba(0, 0, 0, 0.3);
                `
              },
              {
                src: "/images/3dtisk/AdobeStock_267378479.jpg"
              }
            ]
          }}>
          {openCourses?.length > 0 && (
            <Section>
              <CoursesList theme={Theme.dark} courses={openCourses} />
            </Section>
          )}
        </LandingCarouselPage>
      </Layout>
    </>
  )
}

interface Props {
  openCourses: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList()
  const openCourses = coursesRes.results.filter((d) => isCourseRegistrationOpen(d))

  return {
    props: {
      openCourses: openCourses || []
    },
    revalidate: dev ? 1 : 600
  }
}

export default LP_PythonProBitcoin32021
