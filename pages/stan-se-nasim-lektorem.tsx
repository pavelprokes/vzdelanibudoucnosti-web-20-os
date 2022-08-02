import React from "react"
import { Typography } from "antd"
import { Layout } from "../components/Layout/Layout"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { H1, H2, H3 } from "../components/blog/common"
import { css } from "@emotion/react"
import { LandingPage } from "../components/LandingPage/LandingPage"
import styled from "@emotion/styled"
import { md } from "../styles/mediaQuery"
import { ContactForm } from "../components/ContactForm/ContactForm"
import { Section } from "../components/Section"

const LP_StanSeNasimLektorem = () => {
  const title = "Staň se naším lektorem"
  const url = "stan-se-nasim-lektorem"
  const description = "Chceš se stát součástí našeho týmu a pracovat s námi na podpoře a zlepšování vzdělávání dětí i dospělých, které má smysl?"

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
              url: `${webUrl}/images/lp/nabor-lektoru.jpg`,
              width: 1280,
              height: 964,
              alt: "nabor-lektoru"
            }
          ]
        }}
      />

      <Layout>
        <LandingPage
          color="#619e00"
          sectionContentCss={css`
            background-image: url("/images/lp/nabor-lektoru.jpg");
            background-position: 10% center;
            background-size: cover;

            &:before {
              content: "";
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              position: absolute;
              background-color: rgba(49, 106, 153, 0.6);
            }

            h1,
            p,
            div {
              color: white;
            }
          `}
          sectionContent={
            <>
              <LandingPageLeftSectionHeading>
                <H1>Staň se naším lektorem</H1>
                <Typography.Paragraph>
                  Chceš se stát součástí našeho týmu a pracovat s námi na podpoře a zlepšování vzdělávání dětí i dospělých, které má smysl? Napiš nám pomocí
                  kontaktního formuláře nebo přímo na info@vzdelanibudoucnosti.cz. Brzy se ti ozveme!
                </Typography.Paragraph>
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
                  `}
                />
              </LandingPageLeftSectionHeading>
            </>
          }>
          <Section
            css={css`
              ${md} {
                padding-top: 0;
                padding-bottom: 15px;
              }
            `}>
            <Typography.Paragraph>
              Baví tě programování, grafika, bastlení nebo se vyznáš ve financích a chceš své nadšení předávat dál? Pojď učit k nám!
            </Typography.Paragraph>
            <ul>
              <li>férové ohodnocení</li>
              <li>odborné zaškolení zdarma</li>
              <li>dlouhodobou spolupráci v případě vzájemné spokojenosti</li>
              <li>práce prakticky odkudkoliv</li>
              <li>online pomocí video-konference aplikace Zoom</li>
              <li>malé skupiny</li>
              <li>možnost růstu</li>
              <li>příjemný a zkušený kolektiv</li>
            </ul>

            <H3 level={3}>Jaké technologie můžeš učit?</H3>
            <ul>
              <li>Python</li>
              <li>Arduino</li>
              <li>Micro:bit</li>
              <li>Bastlení</li>
              <li>3D tisk</li>
              <li>3D modelování</li>
              <li>Tvorba webu</li>
              <li>Microsoft Office</li>
              <li>grafika</li>
              <li>Minecraft Education edition</li>
              <li>Skratch</li>
              <li>Mediální/online gramotnost</li>
              <li>Finanční gramotnost</li>
              <li>a další</li>
            </ul>

            <H3 level={3}>Požadujeme</H3>
            <ul>
              <li>kladný vztah k dětem</li>
              <li>spolehlivost, profesionální vystupování a komunikativnost</li>
              <li>chuť se vzdělávat, pozitivní myšlení a kreativitu</li>
            </ul>

            <Typography.Paragraph>Zní to to zajímavě? Tak neváhej a napiš nám :)</Typography.Paragraph>

            <Section>
              <ContactForm contactFormName={url} contactFormUrl={`${webUrl}/${url}`}>
                <H2>Kontantí formulář</H2>
              </ContactForm>
            </Section>
          </Section>
        </LandingPage>
      </Layout>
    </>
  )
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

export default LP_StanSeNasimLektorem
