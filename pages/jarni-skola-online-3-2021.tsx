import React from "react"
import { Alert, Button, Typography } from "antd"
import { Layout } from "../components/Layout/Layout"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { H1 } from "../components/blog/common"
import { css } from "@emotion/react"
import { LandingPage } from "../components/LandingPage/LandingPage"
import styled from "@emotion/styled"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { md } from "../styles/mediaQuery"
import { CoursesList } from "../components/CoursesList/CoursesList"
import { PrismicDocument } from "@prismicio/types"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../lib/prismic/courses"
import { useRouter } from "next/router"
import { event } from "../lib/ga"

const dev = process.env.NODE_ENV !== "production"

const LP_PythonProBitcoin32021 = ({ courses }: Props) => {
  const router = useRouter()

  const title = "Jarní škola"
  const url = "jarni-skola-online-3-2021"
  const description =
    "Nikdy jsi neprogramoval/a? Vůbec nevadí! Zasvětíme tě do základů programovacího jazyka Python a vše ti vysvětlíme na jednoduchých kódech."

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
              url: `${webUrl}/images/lp/03-20210-jarni-skola-online-v11_1280x964.png`,
              width: 1280,
              height: 964,
              alt: "03-20210-jarni-skola-online-v11_1280x964"
            }
          ]
        }}
      />

      <Layout>
        <LandingPage
          color="#619e00"
          sectionContentCss={css`
            h1,
            p,
            div {
              color: white;
            }
          `}
          sectionContent={
            <>
              <LandingPageLeftSectionHeading>
                <FontAwesomeIcon
                  icon="frog"
                  size={"2x"}
                  css={css`
                    color: white;
                    margin-bottom: 20px;
                    height: 30px;
                  `}
                />

                <H1>Jarní škola</H1>
                <Typography.Paragraph>
                  Nikdy jsi neprogramoval/a? Vůbec nevadí! Zasvětíme tě do základů programovacího jazyka Python a vše ti vysvětlíme na jednoduchých kódech.
                </Typography.Paragraph>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      event({
                        action: "cta_click",
                        category: "lp",
                        label: "Jarní škola - Začít programovat"
                      })
                      router.push("/registrace/jarni-skola-1-4-zaklady-pythonu-na-projektech/YCm7GxMAACMAKXW4")
                    }}
                    type="primary"
                    size="large"
                    css={css`
                      margin-top: 20px;
                    `}>
                    Začít programovat
                  </Button>
                </div>
              </LandingPageLeftSectionHeading>
              <LandingPageLeftSectionHeading
                css={css`
                  top: 100px;

                  ${md} {
                    top: unset;
                  }
                `}>
                <div
                  css={css`
                    width: 100%;
                    height: 100%;
                    min-height: 400px;
                    background-color: transparent;
                    border-radius: 20px;
                    padding: 20px;

                    ${md} {
                      min-height: 200px;
                      padding: 0;
                    }
                  `}>
                  <div
                    css={css`
                      position: relative;
                      width: 100%;
                      height: 100%;
                      min-height: inherit;
                    `}>
                    <Image
                      alt="03-20210-jarni-skola-online-v11_5ku4"
                      src="/images/lp/03-20210-jarni-skola-online-v11_5ku4.png"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </LandingPageLeftSectionHeading>
            </>
          }>
          <section
            css={css`
              ${md} {
                padding-top: 15px;
                padding-bottom: 15px;
              }
            `}>
            <Typography.Paragraph>
              Nikdy jsi neprogramoval/a? Vůbec nevadí! Zasvětíme tě do základů programovacího jazyka Python a vše ti vysvětlíme na jednoduchých kódech. Pokud
              jsi už někdy programoval/a, tak menší opáčko nikdy neuškodí :) Ať už je to tak nebo tak, všichni společně si vytvoříme 3 mini projekty.
            </Typography.Paragraph>

            <Typography.Paragraph>Co tě čeká?</Typography.Paragraph>

            <ul>
              <li>Vysvětlíme si práci v Colabu.</li>
              <li>Projdeme si základy.</li>
              <li>Naprogramujeme kód, který lokalizuje mobilní telefon.</li>
              <li>Vytvoříme kód, který z textu vygeneruje zvukovou nahrávku.</li>
              <li>Napojíme se na Google trendy a zjistíme, co teď aktuálně frčí.</li>
            </ul>

            <Typography.Paragraph>
              Zní to to zajímavě? Tak neváhej a přihlas se :). Všechny 4 dny jarní školy jsou navržené koncepčně a obsahově na sebe navazují.
            </Typography.Paragraph>

            <Typography.Paragraph>Na tuto hodinu nic instalovat nemusíš. Stačí mít vytvořený vlastní Google účet.</Typography.Paragraph>

            <div
              css={css`
                margin-top: 80px;
              `}>
              <CoursesList courses={courses} />
            </div>
          </section>
        </LandingPage>
      </Layout>
    </>
  )
}

interface Props {
  courses: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList({ tags: ["Jarní škola"] })

  return {
    props: {
      courses: coursesRes?.results || []
    },
    revalidate: dev ? 1 : 60
  }
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

export default LP_PythonProBitcoin32021
