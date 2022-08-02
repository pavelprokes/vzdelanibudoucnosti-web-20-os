import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const Index = () => {
  return (
    <Layout>
      <SinglePage title="Souhlas o pořízení a použití fotografií a audiovizuálního záznamu">
        <Section>
          <Typography.Text></Typography.Text>
        </Section>
      </SinglePage>
    </Layout>
  )
}

export default Index
