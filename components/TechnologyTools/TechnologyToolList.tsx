import React from "react"
import { Col, Row } from "antd"
import { PrismicDocument } from "@prismicio/types"
import { H3 } from "../blog/common"
import Paragraph from "antd/lib/typography/Paragraph"
import styled from "@emotion/styled"
import Image from "next/image"
import { css } from "@emotion/react"

export const TechnologyToolList = ({ technologyTools }: Props) => {
  return (
    <Row gutter={[10, 10]}>
      {technologyTools.map((tt) => (
        <Col key={tt.id} xs={12} sm={6} md={6} lg={4}>
          <TechnologyToolItem>
            <H3 level={3}>{tt.data.title[0].text}</H3>
            <ImageSize>
              <Image
                src={tt.data.image.url}
                alt={tt.data.image.alt || tt.data.image.alt !== "" ? tt.data.image.alt : tt.data.title[0].text.toLowerCase() || ""}
                layout="fill"
                objectFit="contain"
              />
            </ImageSize>
            {tt.data.description[0].text !== "" && (
              <Paragraph
                css={css`
                  font-size: 11px;
                `}>
                {tt.data.description[0].text}
              </Paragraph>
            )}
          </TechnologyToolItem>
        </Col>
      ))}
    </Row>
  )
}

interface Props {
  technologyTools: PrismicDocument<any>[]
}

const TechnologyToolItem = styled.div`
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-align: center;
  justify-content: space-around;
`

const ImageSize = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`
