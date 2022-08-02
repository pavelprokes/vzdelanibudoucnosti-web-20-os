import React from "react"
import { Space } from "antd"
import { Layout } from "../components/Layout/Layout"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { Paragraph } from "../components/blog/common"
import { H2 } from "../components/blog/common"
import { css } from "@emotion/react"
import Link from "next/link"
import { ContactForm } from "../components/ContactForm/ContactForm"
import { Section } from "../components/Section"
import { getCompleteAccountNumber } from "../config/payments"

const Kontakt = () => {
  const title = "Kontakt"
  const description = "Neváhejte a napište nám. Co v nejkratší době vám odpovíme."

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${webUrl}/kontakt`}
        openGraph={{
          url: `${webUrl}/kontakt`,
          title,
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
        <SinglePage title="Kontakt">
          <Section
            css={css`
              padding: 20px 0 20px 0;
            `}>
            <Space direction={"vertical"}>
              <div>
                <H2>Kontakt</H2>
                <Paragraph>Vzdělání budoucnosti, z.s. , Praha IČO 08334463</Paragraph>
                <Link href="https://vzdelanibudoucnosti.cz">
                  <a title="Vzdělání budoucnosti" rel="noreferrer" target="_blank">
                    Vzdělání budoucnosti
                  </a>
                </Link>{" "}
                team
                <br />
                <Link href="mailto:info@vzdelanibudoucnosti.cz">
                  <a title="email Vzdělání budoucnosti" rel="noreferrer" target="_blank">
                    info@vzdelanibudoucnosti.cz
                  </a>
                </Link>
                <Paragraph>
                  Donská 245/14, Vršovice, 101 00 Praha 10
                  <br />
                  IČO: 08334463
                  <br />L 72272 vedená u Městského soudu v Praze
                </Paragraph>
              </div>
            </Space>
          </Section>

          <Section>
            <H2>Platební údaje</H2>
            <Paragraph>{getCompleteAccountNumber()}</Paragraph>
          </Section>

          <Section>
            <H2>Kontaktní formulář</H2>
            <Paragraph>
              Máte jakýkoliv dotaz týkající se našich kroužků nebo se chcete jen zeptat?
              <br />
              Neváhejte a napište nám. Co v nejkratší době vám odpovíme.
            </Paragraph>

            <ContactForm contactFormName={"Kontakt"} contactFormUrl={`${webUrl}/kontakt`} />
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

export default Kontakt
