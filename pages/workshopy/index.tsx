import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../../lib/prismic/courses"
import { PrismicDocument } from "@prismicio/types"
import { CourseVariant } from "../../lib/prismic/Course"
import { CoursesList } from "../../components/CoursesList/CoursesList"
import { Row, Typography } from "antd"
import { css } from "@emotion/react"
import { H2 } from "../../components/blog/common"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import styled from "@emotion/styled"
import { secondTitle } from "../../next-seo.config"
import { Section } from "../../components/Section"
import { SubscribeForm } from "../../components/SubscribeForm/SubscribeForm"
import slugify from "slugify"
import { isCourseRegistrationOpen } from "../../lib/prismic/mapData"

const dev = process.env.NODE_ENV !== "production"

const Workshopy = ({ openWorkshops }: Props) => {
  const title = `Workshopy pro děti i dospělé`
  const description = `Nabízíme workshopy pro děti i dospělé.`

  return (
    <>
      <NextSeo
        title={`${title} | ${secondTitle}`}
        description={description}
        canonical={`${webUrl}/workshopy`}
        openGraph={{
          url: `${webUrl}/workshopy`,
          title: `${title} | ${secondTitle}`,
          description,
          images: [
            {
              url: `${webUrl}/images/header_laptop.jpg`,
              width: 1920,
              height: 1080,
              alt: "header_laptop"
            }
          ]
        }}
      />

      <Layout>
        <SinglePage title={title}>
          <section
            css={css`
              padding: 20px 0 20px 0;
            `}>
            {openWorkshops.length > 0 && (
              <div>
                <H2 level={2}>Nabídka workshopů</H2>
                <CoursesList
                  courses={openWorkshops}
                  css={css`
                    margin: 20px 0 0 0;
                  `}
                />
              </div>
            )}
          </section>

          <CardRow>
            <H2 level={2}>{description}</H2>
            <Typography.Text>
              Cílem našich volnočasových aktivit je podpoření zájmu dětí o IT vzdělání. Nabízíme kroužky pro děti od 11 let se zaměřením na programování v
              Pythonu, stavění chytrých řešení otevřené platformy Arduino, principy fungování neuronových sítí a 3D tisku.
            </Typography.Text>
          </CardRow>

          <Section>
            <H2 level={2}>Odběr novinek</H2>
            <SubscribeForm
              tags={["Workshopy", slugify(title).toLowerCase()]}
              description="Chcete vědět o novinkách nabízených kroužků? Vyplňte svůj email a my Vám dáme vědět."
            />
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

const CardRow = styled(Row)`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 20px;

  &:first-of-type {
    margin-top: 20px;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

interface Props {
  openWorkshops: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList({ courseType: CourseVariant.workshop })
  const openWorkshops = coursesRes.results.filter((d) => isCourseRegistrationOpen(d))

  return {
    props: {
      openWorkshops: openWorkshops || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default Workshopy
