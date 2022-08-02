import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const ZasadyCookies = () => {
  return (
    <Layout>
      <SinglePage title="Zásady cookies">
        <Section>
          <Typography.Paragraph>Pracujeme na tom.</Typography.Paragraph>
        </Section>
      </SinglePage>
    </Layout>
  )
}

export default ZasadyCookies
