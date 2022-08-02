import React from "react"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { H2, H3, Paragraph } from "../components/blog/common"
import { css } from "@emotion/react"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { Col, Row, Space } from "antd"
import Image from "next/image"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

const Organizace = () => {
  const title = "Organizace"
  const description = "Jsme tým programátorů a ekonomů, že programování je zábava a zároveň důležitá dovednost pro jejich vysněné povolání."

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${webUrl}/organizace`}
        openGraph={{
          url: `${webUrl}/organizace`,
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
        <SinglePage title="Organizace">
          <section
            css={css`
              padding: 20px 0 20px 0;
            `}>
            <Space direction={"vertical"} size="large">
              <div>
                <H2>Naše poslání</H2>
                <Paragraph>
                  Dostupné a zábavné programování pro všechny. <br />
                  Boříme bariéry, aby se každý mohl vzdělávat pro svou vysněnou budoucnost.
                </Paragraph>
                <Paragraph>
                  Jsme tým programátorů a ekonomů, kteří chtějí ukázat klukům i holkám, že programování je zábava a zároveň důležitá dovednost pro jejich
                  vysněné povolání.
                </Paragraph>
              </div>

              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/-WUghiSiJW0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <Row gutter={[40, 40]} align="middle" justify="center">
                <Col md={16}>
                  <H3>Jakub</H3>
                  <Paragraph>
                    Jakub je náš CEO. Poeticky řečeno to znamená, že určuje vizi naší organizace. (Věřte nebo ne, přemýšlí nad námi tolik, že si obzvlášť při
                    úplňku mumlá ze spaní: „vzdělání“, „budoucnost“ a ráno má nějaký skvělý nápad.) Prakticky to ale znamená hlavně to, že se stará o naše
                    fungování - akce, kampaně, projekty nebo o spolupráci s jinými organizacemi. Rád přichází na kloub tomu, čemu nerozumí, a proto je náplní
                    jeho práce taky hledání odborníků, kteří to pomůžou pochopit.
                  </Paragraph>
                  <Paragraph>
                    Kubovo oblíbené číslo je 666. Věděli jste, že v hebrejské abecedě znamená www? Mimo Vzdělání budoucnosti studuje Automatizaci a informatiku
                    na ČVUT a programuje v jedné (tajné) firmě. Jeho nezbytným nástrojem k práci je počítač, a nikomu to neříkejte, ale kdybyste se ho zeptali,
                    co na počítači dělá úplně nejradši, tak je to sledování filmů.
                  </Paragraph>
                </Col>
                <Col
                  md={8}
                  css={css`
                    text-align: center;
                  `}>
                  <ImageRounded width={200} height={200} src="/images/organizace/jakub.jpg" alt="jakub" />
                </Col>
              </Row>

              <Row gutter={[40, 40]} align="middle" justify="center">
                <Col md={16}>
                  <H3>
                    Pavel{" "}
                    <Link href="https://www.linkedin.com/in/pavel-proke%C5%A1-3860b282/">
                      <a title="LinkedIn profil" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          css={css`
                            color: var(--main-color-blue);
                            width: 20px;
                            height: 20px;
                          `}
                        />
                      </a>
                    </Link>
                  </H3>
                  <Paragraph>
                    Jestlipak víte, co by se stalo, kdybychom neměli Pavla? Nejspíš byste tyhle řádky vůbec nečetli, protože by neexistoval náš web. Kdyby
                    neexistoval náš web, nebyly ani jiné textové materiály – brožury, plakáty nebo letáky na naše akce. A pojďme ještě hlouběji do apokalypsy –
                    bez Pavla by nebyly ani fotky. No a to by nám toho teda moc nezbylo! Pavel je totiž náš CTO – technický ředitel, fotograf a vývojář a
                    správce našeho webu, což vám asi došlo. Kromě práce u nás dělá softwarového inženýra v Avastu, fotí různé společenské akce a hodně cestuje.
                  </Paragraph>
                  <Paragraph>
                    Když zrovna neupravuje svoje fotky nebo nepřemýšlí nad technologickými novinkami, docela rád si udělá pohodu u počítače a zahraje si nějakou
                    hru. Taky jste fanoušci Portal 2, CS:GO, GTA IV nebo serie Need for speed?
                  </Paragraph>
                </Col>
                <Col
                  md={8}
                  css={css`
                    text-align: center;
                  `}>
                  <ImageRounded width={200} height={200} src="/images/organizace/pavel.jpg" alt="pavel" />
                </Col>
              </Row>
            </Space>
          </section>
        </SinglePage>
      </Layout>
    </>
  )
}

export const ImageRounded = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`

export default Organizace
