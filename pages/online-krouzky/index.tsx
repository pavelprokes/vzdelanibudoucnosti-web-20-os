import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList } from "../../lib/prismic/courses"
import { PrismicDocument } from "@prismicio/types"
import { CourseAgeGroup, CourseType } from "../../lib/prismic/Course"
import { CoursesList } from "../../components/CoursesList/CoursesList"
import { Col, Row, Typography } from "antd"
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

const dev = process.env.NODE_ENV !== "production"

const Krouzky = ({ courses }: Props) => {
  const title = "Online kroužky pro děti"

  return (
    <>
      <NextSeo
        title={`${title} | ${secondTitle}`}
        description={`Nabízíme online kroužky jak pro děti tak pro dospělé`}
        canonical={`${webUrl}/online-krouzky`}
        openGraph={{
          url: `${webUrl}/online-krouzky`,
          title: `${title} | ${secondTitle}`,
          description: `Nabízíme online kroužky jak pro děti tak pro dospělé`,
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
        <SinglePage title="Online kroužky">
          <section
            css={css`
              padding: 20px 0 20px 0;
            `}>
            <div>
              <H2 level={2}>Nabídka online kroužků pro děti</H2>
              <CoursesList
                courses={courses}
                css={css`
                  margin: 20px 0 0 0;
                `}
              />
            </div>
          </section>

          <CardRow>
            <H2 level={2}>Nabízíme online kroužky jak pro děti tak pro dospělé</H2>
            <Typography.Text>
              Cílem našich volnočasových aktivit je podpoření zájmu dětí o IT vzdělání. Nabízíme kroužky pro děti od 11 let se zaměřením na programování v
              Pythonu, stavění chytrých řešení otevřené platformy Arduino, principy fungování neuronových sítí a 3D tisku.
            </Typography.Text>
          </CardRow>

          <CardRow justify="space-between">
            <Col lg={14}>
              <H3 level={3}>Python</H3>
              <Typography.Text>
                Python je v současné době považován za jeden z nejlepších programovacích jazyků, které jsou pro programátory nejlepší – vyměnit za ideální
                volbou. Díky své jednoduché syntaxi se velmi jednoduše čte, píše a především učí. Python je jazyk s velmi širokou škálou použití, který umožňuje
                psát doslova všechno pomocí vhodných knihoven nebo frameworků. To je také důvod, proč Python mnoho společností používá ve svých aplikacích.
                <br />
                <br />
                Zajímají Vás naše kroužky a kurzy Pythonu? Přečtěte si více o{" "}
                <Link href="/blog/stitek/python">
                  <a title="Přečtěte si více o Pythonu na našem blogu.">Pythonu</a>
                </Link>{" "}
                na našem blogu. Nebo se rovnou na nějaký z našich kroužků přihlašte.
              </Typography.Text>
            </Col>
          </CardRow>

          <CardRow justify="center" align="middle">
            <Col lg={10}>
              <Image width={405} height={307} src="/images/arduino/arduino.jpg" alt="arduino" />
            </Col>

            <Col lg={14}>
              <H3 level={3}>Arduino</H3>
              <Typography.Text>
                Arduino je nástroj pro tvorbu malých počítačů, které mají větší kontrolu a cit pro fyzický svět, než běžné počítače, jak je známe. Arduino je
                otevřená elektronická platforma založená na jednoduché počítačové desce (hardware) a vývojovém prostředí, které slouží k tvorbě software.
                <br />
                <br />
                <Link href="/blog/stitek/arduino">
                  <a title="Více o Arduinu na našem blogu.">Více o Arduinu na našem blogu.</a>
                </Link>
              </Typography.Text>
            </Col>
          </CardRow>

          <CardRow justify="center" align="middle">
            <Col lg={14}>
              <H3 level={3}>3D tisk</H3>
              <Typography.Text>
                Technologie 3D tisku v kostce pro všechny malé badatele a nadšené tvůrce. Zkušený lektor žáky provede celým procesem. Od návrhu až po finální
                úpravu vytisknutého modelu.
                <br />
                <br />
                3D tisk se řadí mezi moderní technologie současnosti i blízké budoucnosti. Děti se naučí techniky modelování a svůj model si poté vytisknou na
                3D tiskárně. Během závěrečné fáze postprocessingu jej finálně upraví. Tento krok zahrnuje vybroušení a čištění.
              </Typography.Text>
            </Col>

            <Col lg={10}>
              <Image width={942} height={530} src="/images/3dtisk/3d-tisk.jpeg" alt="3d-tisk" />
            </Col>
          </CardRow>

          <CardRow justify="center" align="middle">
            <Col lg={10}>
              <Image width={633} height={394} src="/images/neuronova-sit/neuronova-sit.jpg" alt="neuronova-sit" />
            </Col>

            <Col lg={14}>
              <H3 level={3}>Neuronové sítě</H3>
              <Typography.Text>
                Lidský mozek je tvořen obrovskou sítí neuronů, které jsou mezi sebou vzájemně propojené a neustále si mezi sebou předávají informace, které
                následně vyhodnocují.
                <br />
                <br />
                Něco takového se snaží zreplikovat metoda programování využívající princip neuronových sítí. Neuronové sítě jsou široce využitelné. My je na
                kroužku programujeme v jazyce Python a po vysvětlení základních principů programování a práce v Pythonu se rovnou pouštíme do akce. Začínáme
                generováním muziky a postupně program učíme rozpoznávat obrázky či fotografie.
                <br />
                <br />
                <Link href="/blog">
                  <a title="Více o neuronových sítích na našem blogu.">Více o neuronových sítích na našem blogu.</a>
                </Link>
              </Typography.Text>
            </Col>
          </CardRow>

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
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const coursesRes = await getCourseList({ type: CourseType.online, ageGroup: CourseAgeGroup.children })

  return {
    props: {
      courses: coursesRes.results || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default Krouzky
