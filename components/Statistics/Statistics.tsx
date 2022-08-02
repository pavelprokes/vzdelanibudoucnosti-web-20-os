import React from "react"
import { Col, Row, Statistic } from "antd"
import { LikeOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

export const Statistics = () => {
  return (
    <StatisticsWrapper className="page-white-border-r-block">
      <Row gutter={[35, 10]}>
        <Col>
          <Statistic title="Spokojených dětí" value={184} />
        </Col>
        <Col>
          <Statistic title="Facebokových fanoušků" value={742} prefix={<LikeOutlined />} />
        </Col>
      </Row>
    </StatisticsWrapper>
  )
}

const StatisticsWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`
