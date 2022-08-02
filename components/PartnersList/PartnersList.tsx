import React from "react"
import { Col, Image, Row } from "antd"
import Link from "next/link"
import styled from "@emotion/styled"
import { partnersList } from "../../lib/partnersList"

export const PartnersList = () => {
  return (
    <PartnersListWrapper className="page-white-border-r-block">
      <Row
        justify="space-around"
        gutter={{
          xs: 0,
          sm: 10,
          md: 60
        }}>
        {partnersList.map((p) => (
          <CenterCol key={p.name} xs={24} sm={12} md={6}>
            <Link href={p.url}>
              <a title={`Přejít na webové stránky ${p.name}`} target="_blank" rel="noopener noreferrer">
                <Image key={p.url} preview={false} src={p.imagePath} width={170} alt={p.name} />
              </a>
            </Link>
          </CenterCol>
        ))}
      </Row>
    </PartnersListWrapper>
  )
}

const PartnersListWrapper = styled.div``

const CenterCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
