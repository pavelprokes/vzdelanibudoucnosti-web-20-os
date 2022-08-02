import React from "react"
import { PrismicDocument } from "@prismicio/types"
import { mapRecommend } from "./mapRecommend"
import styled from "@emotion/styled"
import { Button, Col, Typography } from "antd"
import { theme } from "../../styles/styles"
import Link from "next/link"
import { md } from "../../styles/mediaQuery"

export const RecommendList = ({ recommends }: Props) => {
  const mappedRecommends = recommends.map((d) => mapRecommend(d))

  return (
    <>
      {mappedRecommends.map((r) => (
        <RecommendListWrapper key={r.id} lg={6} md={6} sm={12} xs={12}>
          <RecommendItem>
            <TopSide backgroundImageUrl={r.background_image?.url} />

            <BottomSide>
              <Typography.Title level={3}>{r.title}</Typography.Title>
              <Typography.Text style={{ fontSize: 12 }}>{r.text}</Typography.Text>

              {r.button.link ? (
                <Link href={r.button.link}>
                  <a title={r.button.text} target="_blank">
                    <Button>{r.button.text}</Button>
                  </a>
                </Link>
              ) : null}
            </BottomSide>
          </RecommendItem>
        </RecommendListWrapper>
      ))}
    </>
  )
}

interface Props {
  recommends: PrismicDocument<any>[]
}

const RecommendListWrapper = styled(Col)`
  position: relative;
`

const TopSide = styled.div<{ backgroundImageUrl?: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.gray4};
  overflow: hidden;
  box-shadow: ${theme.boxShadow.default};
  margin-bottom: 20px;

  ${(props: { backgroundImageUrl?: string }) => (props.backgroundImageUrl ? `background-image: url(${props.backgroundImageUrl});` : "")}
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  ${md} {
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
  }
`

const BottomSide = styled.div``

const RecommendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
