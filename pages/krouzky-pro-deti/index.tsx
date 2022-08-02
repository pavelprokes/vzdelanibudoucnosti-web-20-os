import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../../lib/prismic/courses"
import { PrismicDocument } from "@prismicio/types"
import { CourseAgeGroup, CourseType } from "../../lib/prismic/Course"
import { CoursesList } from "../../components/CoursesList/CoursesList"
import { Col, Collapse, Row, Space, Typography } from "antd"
import { css } from "@emotion/react"
import { H2, H3 } from "../../components/blog/common"
import Image from "next/image"
import Link from "next/link"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import styled from "@emotion/styled"
import { secondTitle } from "../../next-seo.config"
import { Section } from "../../components/Section"
import { SubscribeForm } from "../../components/SubscribeForm/SubscribeForm"
import slugify from "slugify"
import { isCourseRegistrationBefore, isCourseRegistrationOpen } from "../../lib/prismic/mapData"
import { orderBy } from "lodash"
import { IndexHero } from "../../components/IndexHero/IndexHero"
import { Bubbles } from "../../components/IndexHero/Bubbles"
import Container from "../../components/Layout/Container"
import { ShowWhenDesktop, ShowWhenMobile } from ".."
import { PageHero } from "../../components/IndexHero/PageHero"
import { ImageRounded } from "../organizace"

const dev = process.env.NODE_ENV !== "production"

const KrouzkyProDeti = ({ courses, onlineCoursesRes, closedOldCourses, preparingCourses }: Props) => {
  const title = `Kroužky pro děti`
  const description = `Nabízíme kroužky jak pro děti, tak pro dospělé.`
  const mappedBubbles = [
    {
      title: "Lepší budoucnost pro Vaše dítě.",
      text: "Náš vzdělávací systém je zaměřen na praktickou výuku programování, robotiky a 3D tisku. Děti učíme již od 9 let, a to zábavnou a hravou formou. Věříme, že na začátku cesty každého programátora má být motivace, podpora a nadšení. Naši studenti u nás získají potřebné know-how a pevné základy programování. \n"
    },
    {
      title: "Nabízíme skvělé kroužky i osobní doučování.",
      text: "Online výuka nám umožňuje učit Vaše dítě, ať jste kdekoliv. Během 12 lekcí vysvětlíme a společně projdeme všechna témata našich kroužků. 3D tisk a roboty posíláme po celé republice."
    },
    {
      title: "Jako jediní v republice nabízíme kroužek formou stáže.",
      text: "Vaše dítě provedeme světem IT a společně vytvoříme projekty, kterými se bude moci prezentovat a v budoucnu se ucházet o brigádu nebo práci v IT sektoru."
    }
  ]

  return (
    <>
      <NextSeo
        title={`${title} | ${secondTitle}`}
        description={description}
        canonical={`${webUrl}/krouzky-pro-deti`}
        openGraph={{
          url: `${webUrl}/krouzky-pro-deti`,
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
        <section>
          <PageHero
            h1="Jakub Valenta, CEO projektu"
            text={
              <>
                <Space size={20}>
                  <div
                    css={css`
                      width: 100px;
                      height: 100px;
                    `}>
                    <ImageRounded width={100} height={100} src="/images/organizace/jakub.jpg" alt="jakub" />
                  </div>
                  <div>
                    Jmenuji se Jakub Valenta, jsem programátor a hrdý učitel Pythonu na základní škole a ve Vzdělání budoucnosti. Na učení mě nejvíc baví
                    objevovat s dětmi to, co baví je. Třeba programování v Minecraftu. To byste nevěřili, jak u toho dovedou být kreativní!
                  </div>
                </Space>
              </>
            }>
            <ShowWhenDesktop>
              <Bubbles mappedBubbles={mappedBubbles} />
            </ShowWhenDesktop>
          </PageHero>
        </section>

        <Container>
          <Section>
            <ShowWhenMobile>
              <Bubbles mappedBubbles={mappedBubbles} />
            </ShowWhenMobile>
          </Section>

          <Section>
            <Typography.Paragraph>Programovat může každý! Tak proč by to nebavilo i Vašeho syna nebo Vaši dceru?</Typography.Paragraph>
          </Section>

          <Section
            css={css`
              padding: 20px 0 20px 0;
            `}>
            {onlineCoursesRes.length > 0 && (
              <div>
                <H2 level={2}>Nabídka online kroužků pro děti</H2>
                <CoursesList
                  courses={onlineCoursesRes}
                  css={css`
                    margin: 20px 0 0 0;
                  `}
                />
              </div>
            )}

            {courses.length > 0 && (
              <div>
                <H2 level={2}>Nabídka prezenčních kroužků pro děti</H2>
                <CoursesList
                  courses={courses}
                  css={css`
                    margin: 20px 0 0 0;
                  `}
                />
              </div>
            )}

            {preparingCourses.length > 0 && (
              <div
                css={css`
                  margin-top: 40px;
                `}>
                <H2 level={2}>Připravujeme</H2>
                <CoursesList
                  courses={preparingCourses}
                  css={css`
                    margin: 20px 0 0 0;
                  `}
                />
              </div>
            )}

            {closedOldCourses.length > 0 && (
              <Collapse
                ghost
                css={css`
                  margin-top: 40px;

                  .ant-collapse-header {
                    padding-left: 30px !important;
                  }

                  .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
                    font-size: 28px;
                    line-height: 1.35;
                    left: 0;
                  }

                  h2 {
                    display: inline;
                  }
                `}>
                <Collapse.Panel header={<H2 level={2}>Již proběhlé</H2>} key="1">
                  <div>
                    <CoursesList
                      courses={closedOldCourses}
                      css={css`
                        margin: 20px 0 0 0;
                      `}
                    />
                  </div>
                </Collapse.Panel>
              </Collapse>
            )}
          </Section>

          <Section>
            <H2 level={2}>Odběr novinek</H2>
            <SubscribeForm
              tags={["Krouzky", slugify(title).toLowerCase()]}
              description="Chcete vědět o novinkách nabízených kroužků? Vyplňte svůj email a my Vám dáme vědět."
            />
          </Section>
        </Container>
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
  courses: PrismicDocument<any>[]
  onlineCoursesRes: PrismicDocument<any>[]
  closedOldCourses: PrismicDocument<any>[]
  preparingCourses: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesChildrenRes = await getCourseList({ ageGroup: CourseAgeGroup.children })

  const openInPersonCoursesRes = (coursesChildrenRes.results || []).filter((d) => isCourseRegistrationOpen(d) && d.data.type === CourseType.inPerson)
  const openOnlineCoursesRes = (coursesChildrenRes.results || []).filter((d) => isCourseRegistrationOpen(d) && d.data.type === CourseType.online)

  const closedOldChildrenCourses = orderBy(
    coursesChildrenRes.results.filter((d) => !isCourseRegistrationOpen(d)),
    "first_publication_date",
    "desc"
  )
  const preparingAllChildrenCourses = orderBy(
    coursesChildrenRes.results.filter((d) => isCourseRegistrationBefore(d)),
    "first_publication_date",
    "desc"
  )

  return {
    props: {
      courses: openInPersonCoursesRes || [],
      onlineCoursesRes: openOnlineCoursesRes || [],
      closedOldCourses: closedOldChildrenCourses || [],
      preparingCourses: preparingAllChildrenCourses || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default KrouzkyProDeti
