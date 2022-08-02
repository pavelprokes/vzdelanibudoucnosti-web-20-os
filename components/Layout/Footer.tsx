import React from "react"
import { Image, Col, Layout as AntdLayout, Row, Typography, Space, List } from "antd"
import styled from "@emotion/styled"
import Link from "next/link"
import { FacebookFilled, InstagramFilled, YoutubeFilled } from "@ant-design/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { menuItems } from "../../lib/menu/menuItems"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import moment from "moment"

export const Footer = () => {
  return (
    <FooterWithPadding style={{ marginTop: 30 }}>
      <Row gutter={[0, 60]} justify="space-between">
        <Col>
          <Row key="row1" gutter={[0, 0]}>
            <Col>
              <Space direction="vertical" size="middle">
                <Image alt="vzdelanibudoucnosti_2_black_text" src="/images/vzdelanibudoucnosti_2_black_text.svg" width={180} />

                <Typography.Title level={2}>Vzdělání budoucnosti, z.s.</Typography.Title>

                <Typography.Text>
                  Spisová značka: L 72272/MSPH Městský soud v Praze
                  <br />
                  Sídlo: Donská 245/14, Vršovice, 101 00 Praha, Česká republika
                  <br />
                  IČO: 08334463
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row key="row2" gutter={[0, 0]}>
            <Col>
              <Typography.Title level={4}>Vzdělání budoucnosti</Typography.Title>

              <ListWithoutBorder size="small">
                {[
                  ...menuItems,
                  {
                    title: "Prohlášení o cookies",
                    href: "/prohlaseni-o-cookies",
                    slug: "prohlaseni-o-cookies"
                  },
                  {
                    title: "Zpracování osobních údajů",
                    href: "/zpracovani-osobnich-udaju",
                    slug: "zpracovani-osobnich-udaju"
                  },
                  {
                    title: "Zpracování osobních údajů - kroužky pro děti",
                    href: "/zpracovani-osobnich-udaju-krouzky-pro-deti",
                    slug: "zpracovani-osobnich-udaju-krouzky-pro-deti"
                  }
                ].map((item) => (
                  <List.Item key={item.slug}>
                    <Link href={item.href}>
                      <a title={item.title}>{item.label ?? item.title}</a>
                    </Link>
                  </List.Item>
                ))}
              </ListWithoutBorder>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row key="row2" gutter={[0, 0]}>
            <Col>
              <Typography.Title level={4}>Naše projekty</Typography.Title>

              <ListWithoutBorder size="small">
                {[
                  {
                    label: "Python GO",
                    href: "https://pythongo.cz/",
                    slug: "PythonGo"
                  }
                ].map((item) => (
                  <List.Item key={item.label}>
                    <Link href={item.href}>
                      <a title={item.label} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    </Link>
                  </List.Item>
                ))}
              </ListWithoutBorder>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row key="row3" gutter={[0, 0]}>
            <Col>
              <Typography.Title level={3}>Přidejte se k nám</Typography.Title>

              <Space size="middle">
                <Link href="https://g.page/r/CfOxvTup-d7hEAE">
                  <a title="Google business" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGoogle} style={{ fontSize: 24 }} />
                  </a>
                </Link>
                <Link href="https://www.facebook.com/vzdelanibudoucnosti">
                  <a title="Facebook" target="_blank" rel="noopener noreferrer">
                    <FacebookFilled style={{ fontSize: 24 }} />
                  </a>
                </Link>

                <Link href="https://www.instagram.com/nerdi_budoucnosti/">
                  <a title="Instagram" target="_blank" rel="noopener noreferrer">
                    <InstagramFilled style={{ fontSize: 24 }} />
                  </a>
                </Link>

                <Link href="https://www.youtube.com/channel/UC8JcFoMjLC1QDA3-y8V6rUg">
                  <a title="Youtube" target="_blank" rel="noopener noreferrer">
                    <YoutubeFilled style={{ fontSize: 24 }} />
                  </a>
                </Link>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row key="row3" gutter={[0, 0]} justify="center">
        <Col>
          <Typography.Paragraph>
            © Vzdělání budoucnosti {moment().format("YYYY")} v.3.1 <Typography.Text type="secondary">Webové stránky tvoří Pavel Prokeš</Typography.Text>
          </Typography.Paragraph>
        </Col>
      </Row>
    </FooterWithPadding>
  )
}

const FooterWithPadding = styled(AntdLayout.Footer)`
  padding: 80px 40px 0 40px;
`

const ListWithoutBorder = styled(List)`
  .ant-list-item {
    border-bottom: none;
  }
`
