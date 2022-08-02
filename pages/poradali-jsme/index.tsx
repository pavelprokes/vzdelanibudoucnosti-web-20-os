import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../../lib/prismic/courses"
import { PrismicDocument } from "@prismicio/types"
import { CoursesList } from "../../components/CoursesList/CoursesList"
import { css } from "@emotion/react"
import { H2 } from "../../components/blog/common"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { secondTitle } from "../../next-seo.config"
import { Section } from "../../components/Section"
import { SubscribeForm } from "../../components/SubscribeForm/SubscribeForm"
import slugify from "slugify"
import { isCourseRegistrationOpen } from "../../lib/prismic/mapData"

const dev = process.env.NODE_ENV !== "production"

const PoradaliJsme = ({ closeCourses }: Props) => {
  const title = "Pořádali jsme"

  return (
    <>
      <NextSeo
        title={`${title} | ${secondTitle}`}
        description={`Již proběhlé kroužky, kurzy pro dospělé a další akce od nás.`}
        canonical={`${webUrl}/online-krouzky`}
        openGraph={{
          url: `${webUrl}/online-krouzky`,
          title: `${title} | ${secondTitle}`,
          description: `Již proběhlé kroužky, kurzy pro dospělé a další akce od nás.`,
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
          <Section>
            <div>
              <H2 level={2}>Již proběhlé kroužky, kurzy pro dospělé a další akce od nás.</H2>
              <CoursesList
                courses={closeCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
              />
            </div>
          </Section>

          <Section>
            <H2 level={2}>Odběr novinek</H2>
            <SubscribeForm
              tags={["Krouzky", slugify(title).toLowerCase()]}
              description="Chcete vědět o novinkách nabízených kroužků? Vyplňte svůj email a my Vám dáme vědět."
            />
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

interface Props {
  closeCourses: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList()
  const closeCourses = coursesRes.results.filter((d) => !isCourseRegistrationOpen(d))

  return {
    props: {
      closeCourses: closeCourses || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default PoradaliJsme
