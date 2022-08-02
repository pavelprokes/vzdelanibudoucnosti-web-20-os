import React from "react"
import { Col, Layout, Row, RowProps } from "antd"
import { css } from "@emotion/react"
import { md } from "../../styles/mediaQuery"
import { SerializedStyles } from "@emotion/utils"

const ContainerWide = ({ className, children }: Props) => {
  const { Content } = Layout

  return (
    <Content
      style={{
        minHeight: "calc(100vh - 110px)",
        padding: "0"
      }}
      className={className}>
      <Row {...containerRowProps}>
        <Col
          {...{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 24,
            xxl: 24
          }}>
          {children}
        </Col>
      </Row>
    </Content>
  )
}

interface Props {
  className?: string
  children: React.ReactNode
}

export const containerRowProps: RowProps &
  React.RefAttributes<HTMLDivElement> & {
    css: SerializedStyles
  } = {
  justify: "center",
  css: css`
    padding: 0 30px 0 30px;

    ${md} {
      padding: 0 15px 0 15px;
    }
  `
}

export default ContainerWide
