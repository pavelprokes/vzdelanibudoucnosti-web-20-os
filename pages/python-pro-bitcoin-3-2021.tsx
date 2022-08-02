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

  const title = "Python pro Bitcoin"
  const url = "python-pro-bitcoin-3-2021"
  const description = "Pojďte naprogramovat funkční kód, kterým propojíte vaše účty na směnárnách ve 2 navazujících workshopech."

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
        <LandingPage
          color="#45108A"
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
                  icon="bitcoin"
                  size={"2x"}
                  css={css`
                    color: white;
                    margin-bottom: 20px;
                    height: 30px;
                  `}
                />

                <H1>Python pro Bitcoin</H1>
                <Typography.Paragraph>
                  Pojďte naprogramovat funkční kód, kterým propojíte vaše účty na směnárnách ve 2 navazujících workshopech.
                </Typography.Paragraph>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      event({
                        action: "cta_click",
                        category: "lp",
                        label: "Python pro Bitcoin - Začít programovat"
                      })
                      router.push("/registrace/python-pro-bitcoin-1_2/YCnD3RMAACQAKZyf")
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
                      alt="03-20210-python-a-bitcoin-v1_header_image"
                      src="/images/lp/03-20210-python-a-bitcoin-v1_header_image.svg"
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
              Zajímáte se o kryptoměny? Držíte nějaké? Sledujete ceny BTC? Tak jste na správném místě. Během našeho workshopu vám ukážeme snadnou a
              pochopitelnou automatizaci pomocí Pythonu. Pokud nejste úplně zběhlí v programování, nevadí. Vše potřebné vám ukážeme a vysvětlíme. Po lekci navíc
              dostanete podrobný video návod a lektorův kód. Po drobných úpravách ho můžete použít pro vlastní účely. (Nebojte se, každý bude mít jiné klíče.
            </Typography.Paragraph>

            <Typography.Paragraph>
              Během workshopu se naučíte základy Pythonu, komunikaci s API směnáren Coinbase a dalších. Naučíme vás získat historická data, vhodně je zpracovat
              a zobrazit pomocí Python knihoven. Čeká vás práce s časovou řadou a ukážeme vám, jak zobrazovat Candles. Vše budeme vytvářet v Jupyter notebooku.
            </Typography.Paragraph>

            <Typography.Paragraph>Co si odnese někdo, kdo nikdy neprogramoval:</Typography.Paragraph>

            <ul>
              <li>Funkční kód, který je možné propojit s vašimi účty na směnárnách.</li>
              <li>Naučíte se, jak kód zapnout, i když nemusíte rozumět všem částem kódu.</li>
              <li>Vše probrané získáte po skončení workshopu ve video tutoriálu.</li>
            </ul>

            <Typography.Paragraph>Co si odnese člověk s předešlou zkušeností v programování (ale ne v Pythonu):</Typography.Paragraph>

            <ul>
              <li>Základy pohybu v Pythonu</li>
              <li>Práci s knihovnami</li>
              <li>Funkční kód, který je možné propojit s vašimi účty na směnárnách</li>
              <li>Naučíte se, jak kód zapnout, i když nemusíte rozumět všem částem kódu</li>
              <li>Vše probrané získáte po skončení workshopu ve video tutoriálu</li>
            </ul>

            <Alert
              css={css`
                margin: 20px 0 20px 0;
              `}
              message={
                "Druhý workshop Python bot pro Bitcoin navazuje na předcházející první workshop Python pro Bitcoin. Pokud jste tak již neučinili, tak Vám velmi doporučujeme se přihlásit i na první sobotní workshop Python pro Bitcoin 1/2."
              }
            />

            <Typography.Paragraph>Těšíme se na vás!</Typography.Paragraph>

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
  const coursesRes = await getCourseList({ tags: ["Bitcoin"] })

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
