import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { Col, Row, Space, Typography } from "antd"
import Image from "next/image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { secondTitle } from "../../next-seo.config"

const TriDTisk = () => {
  return (
    <>
      <NextSeo
        title={`3D tisk`}
        description={`3D tisk je moderní metoda pro přenesení trojrozměrného modelu z digitální podoby do reálného světa.`}
        canonical={`${webUrl}/o-krouzcich/3d-tisk`}
        openGraph={{
          url: `${webUrl}/o-krouzcich/3d-tisk`,
          title: `3D tisk | ${secondTitle}`,
          description: `3D tisk je moderní metoda pro přenesení trojrozměrného modelu z digitální podoby do reálného světa.`,
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
        <SinglePage title="3D tisk">
          <CardRow align="middle" justify="center">
            <Col lg={14}>
              <Space direction="vertical" size="large">
                <div>
                  <Typography.Text>
                    3D tisk je moderní metoda pro přenesení trojrozměrného modelu z digitální podoby do reálného světa. To zní skvěle, že? Dětem to umožní
                    vytisknout si oblíbenou pohádkovou postavu, vysněnou hračku, prostě cokoliv. Zatímco ve školství se vedou debaty o motivaci, tady si děti
                    hrají a přitom se naprosto nenásilně učí klíčové dovednosti pro život ve 21. století. 3D tisk je prostě super zábava s obrovským přesahem!
                  </Typography.Text>
                </div>
                <div>
                  <Typography.Title level={3}>Jak funguje 3D tisk?</Typography.Title>
                  <Typography.Text>
                    Existuje více technologií tisku. My vám představíme tu naši. Kdybychom chtěli být hodně názorní, můžeme o 3D tiskárně prohlásit, že je to
                    taková sofistikovaná malá pekárna. Strčíte do ní filament, to je materiál pro tisk ve formě navinuté struny, a ona vám po kousíčkách „upeče“
                    hotový model.
                  </Typography.Text>
                </div>
              </Space>
            </Col>

            <Col lg={10}>
              <PageImage
                css={css`
                  width: 200px;
                  height: 200px;
                `}>
                <Image layout="fill" src="/images/logos/3dtisk_logo.svg" alt={"3dtisk logo"} />
              </PageImage>
            </Col>
          </CardRow>

          <CardRow align="middle" justify="center">
            <Col>
              <Space direction="vertical" size="large">
                <div>
                  <Typography.Title level={2}>Přihlašte se na náš kroužek Pythonu</Typography.Title>
                </div>

                <div>
                  <Typography.Text>Je to snažší, než by jste čekali.</Typography.Text>
                </div>

                <div>
                  <Row>
                    <Col lg={12}>
                      <Typography.Text>
                        Vhodné pro žáky <strong>6. až 9. třídy</strong>
                      </Typography.Text>
                    </Col>
                    <Col lg={12}>
                      <Typography.Text>
                        Časová náročnost: <strong>90 minut</strong>
                      </Typography.Text>
                    </Col>
                  </Row>
                </div>
              </Space>
            </Col>
          </CardRow>

          <CardRow align="middle" justify="center">
            <Col lg={8}>
              <PageImage>
                <Image width={250} height={370} src="/images/MK3s-home.png" alt={"MK3s logo"} />
              </PageImage>
            </Col>

            <Col lg={16}>
              <Space direction="vertical" size="large">
                <div>
                  <Typography.Text>
                    Zhmotnění digitální předlohy ovšem předcházejí důležité činnosti. Od digitálního návrhu ke konečné úpravě modelu procházíte těmito kroky.
                  </Typography.Text>
                </div>

                <div>
                  <ul>
                    <li>
                      <Typography.Title level={4}>Hurá, mám nápad!</Typography.Title>
                      <Typography.Text>Perfektní. Mít úžasnou myšlenku je základ. Kreativita vítána.</Typography.Text>
                    </li>
                    <li>
                      <Typography.Title level={4}>Připravuji 3D model</Typography.Title>
                      <div>
                        <Typography.Text>
                          Tady začíná ta pravá zábava a učení se kompetencím, které se v dnešním moderním světě rozhodně hodí. 3D modelování zahrnuje práci s
                          příslušným softwarem.{" "}
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text>
                          Trojrozměrné digitální modely dnes nacházejí uplatnění ve spoustě profesí. Využívají se například v oblasti designu, v grafice,
                          strojařině, herním průmyslu.
                        </Typography.Text>
                      </div>
                    </li>
                    <li>
                      <Typography.Title level={4}>Jupí, tisknu!</Typography.Title>
                      <Typography.Text>
                        O tisku už jsme psali výše. Takže jen krátce. 3D model se vytiskne na 3D tiskárně přesně podle digitální předlohy. Jen propojit počítač
                        s tiskárnou a chvíli počkat.
                      </Typography.Text>
                    </li>
                    <li>
                      <Typography.Title level={4}>Postprocessing</Typography.Title>
                      <Typography.Text>
                        Aby byl model dokonalý, můžete ho vybrousit, zpevnit, zatmelit, nabarvit. Když své dílo náležitě vymazlíte, výsledný „wow efekt“ je
                        zaručen.
                      </Typography.Text>
                    </li>
                  </ul>
                </div>
              </Space>
            </Col>
          </CardRow>
        </SinglePage>
      </Layout>
    </>
  )
}

const PageImage = styled.div``

const CardRow = styled(Row)`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
`

export default TriDTisk
