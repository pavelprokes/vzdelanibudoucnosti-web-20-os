import React from "react"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { Col, Row, Space, Tooltip, Typography } from "antd"
import Image from "next/image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { secondTitle } from "../../next-seo.config"

const Python = () => {
  return (
    <>
      <NextSeo
        title={`Python`}
        description={``}
        canonical={`${webUrl}/o-krouzcich/python`}
        openGraph={{
          url: `${webUrl}/o-krouzcich/python`,
          title: `Python | ${secondTitle}`,
          description: ``,
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
        <SinglePage title="Python">
          <CardRow align="middle" justify="center">
            <Col lg={14}>
              <Space direction="vertical" size="large">
                <div>
                  <Typography.Text>
                    Python v současné době vládne v oblastech jako je datová věda a strojové učení. Často se používá jako skriptovací jazyk v aplikacích
                    napsaných v jiných jazycích, například do Open Office, pro program Gimp, apod. Tento programovací jazyk se využívá také pro desktopové
                    aplikace v Pythonu, ale je to spíše odklon od této aplikace. Populární z nich jsou např. původní klient Dropbox nebo starší verze
                    BitTorrentu.
                  </Typography.Text>
                </div>
                <div>
                  <Typography.Title level={3}>Proč začít s Pythonem?</Typography.Title>
                  <Typography.Text>
                    <ul>
                      <li>Je to skvělý jazyk, kde se naučíte základy programování. Jednou by mohl nahradit jiné programovací jazyky na středních školách </li>
                      <li>Jedná se o velmi populární jazyk - 5. místo na seznamu nejpopulárnějších programovacích jazyků</li>
                      <li>Protože je to opravdu jednoduché a zároveň užitečné v každodenním životě</li>
                      <li>Poptávka po programátorech Pythonu je již vysoká a neustále roste</li>
                    </ul>
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
                <Image layout="fill" src="/images/logos/python_logo.svg" alt={"python logo"} />
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
            <Col lg={10}>
              <PageImage
                css={css`
                  width: 250px;
                  height: 250px;
                `}>
                <Image layout="fill" src="/images/logos/nasa_logo.svg" alt={"nasa logo"} />
              </PageImage>
            </Col>

            <Col lg={14}>
              <Space direction="vertical" size="large">
                <div>
                  <Typography.Text>
                    Python je v současné době považován za jeden z nejlepších programovacích jazyků, které jsou pro programátory nejlepší volbou. Díky své
                    jednoduché syntaxi se velmi lehce čte, píše a především učí. Python je jazyk s velmi širokou škálou použití, který umožňuje psát doslova
                    všechno pomocí vhodných knihoven nebo{" "}
                    <Tooltip
                      css={css`
                        border-bottom: 2px dotted;
                      `}
                      title="Framework je softwarová struktura, která slouží jako podpora při programování a vývoji a organizaci jiných softwarových projektů. Může obsahovat podpůrné programy, knihovny API, podporu pro návrhové vzory nebo doporučené postupy při vývoji. zdroj: Wikipedie">
                      frameworků
                    </Tooltip>
                    , což je důvod, proč to mnoho společností používá ve svých aplikacích.
                  </Typography.Text>
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

export default Python
