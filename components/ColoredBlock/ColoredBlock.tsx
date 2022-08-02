import React from "react"
import { Col, Typography } from "antd"
import styled from "@emotion/styled"
import Link from "next/link"
import { md, sm } from "../../styles/mediaQuery"
import { H3 } from "../blog/common"

export const ColoredBlock = ({ title, content, moreHref, icon }: Props) => {
  return (
    <Col sm={12}>
      <ColoredBlockWrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Typography.Text type="secondary">Informace</Typography.Text>
        <H3 level={3} style={{ marginTop: "0.25em" }}>
          {title}
        </H3>
        {content}
        {moreHref && moreHref !== "" && (
          <More>
            <Link href={moreHref}>více ...</Link>
          </More>
        )}
      </ColoredBlockWrapper>
    </Col>
  )
}

interface Props {
  title: React.ReactNode
  content: React.ReactNode
  moreHref?: string
  icon?: React.ReactNode
}

const ColoredBlockWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;

  h3 {
    font-size: 34px;
  }

  ${md} {
    padding: 20px;

    h3 {
      font-size: 28px;
    }
  }

  ${sm} {
    padding: 20px;

    h3 {
      font-size: 24px;
    }
  }
`

const IconWrapper = styled.div`
  margin-bottom: 10px;
`

const More = styled.div``
