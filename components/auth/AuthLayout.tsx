import React from "react"
import { css } from "@emotion/react"
import { Col, Layout, Row, Spin, Typography } from "antd"
import { Content } from "antd/lib/layout/layout"
import { Footer } from "../Layout/Footer"
import Link from "next/link"
import styled from "@emotion/styled"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { isArray } from "lodash"
import { Beta } from "../../lib/menu/menuItems"

export const AuthLayout = ({ title, children, className }: Props) => {
  const { status } = useSession()
  const { query, replace } = useRouter()

  if (status === "authenticated") {
    if (query?.callbackUrl) {
      replace(isArray(query?.callbackUrl) ? query?.callbackUrl[0] : query?.callbackUrl)
    } else if (query?.error) {
      // continue
    } else {
      replace("/")
    }
  }

  return (
    <Layout>
      <Content
        css={css`
          display: flex;
          justify-content: center;
          height: 100vh;
          flex-direction: column;
        `}>
        <Row gutter={0} align="middle" justify="center">
          <Col
            xs={18}
            sm={14}
            lg={14}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}>
            <Link href={"/"}>
              <a title="Domu">
                <Logo>
                  <Beta>beta</Beta>
                </Logo>
              </a>
            </Link>

            <Typography.Title
              level={1}
              css={css`
                text-align: center;
              `}>
              {title}
            </Typography.Title>

            <div className={className}>{children}</div>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  )
}

const Logo = styled.div`
  background-image: url("/images/vzdelanibudoucnosti_2_black_text.svg");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 50px;
  width: 250px;
  display: inline-block;
  margin-bottom: 20px;
  position: relative;
`

interface Props {
  className?: string
  title: React.ReactNode
  children: React.ReactNode
}
