import React from "react"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { getLandingPageBySlug, getLandingPages, slugifyLandingPage } from "../lib/prismic/landingPages"
import { PrismicDocument } from "@prismicio/types"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { Layout } from "../components/Layout/Layout"
import { css } from "@emotion/react"
import { md } from "../styles/mediaQuery"
import { htmlSerializer } from "../lib/prismic/htmlSerializer"
import { RichText } from "prismic-reactjs"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Section } from "../components/Section"

const PageSlug = ({ document, url }: Props) => {
  const title = document?.data?.title[0]?.text || ""
  const description = document?.data?.perex[0]?.text || ""

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${webUrl}/${url}`}
        openGraph={{
          url: `${webUrl}/${url}`,
          title,
          description,
          images: [
            {
              url: `${webUrl}/images/lp/03-20210-python-a-bitcoin-v1_1280x964.png`,
              width: 1280,
              height: 964,
              alt: "03-20210-python-a-bitcoin-v1_1280x964"
            }
          ]
        }}
      />

      <Layout>
        <SinglePage title={title}>
          <Section
            css={css`
              ${md} {
                padding-top: 15px;
                padding-bottom: 15px;
              }
            `}>
            {document?.data?.content ? <RichText render={document?.data?.content} htmlSerializer={htmlSerializer} /> : null}
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

export default PageSlug

interface Props {
  document: PrismicDocument<any>
  url: string
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const landingPagesRes = await getLandingPages()
  //const technologyRes = await getTechnologyList()

  const paths = [
    /*...(technologyRes.results || []).map((d: PrismicDocument) => {
      return { params: { pageSlug: slugifyTechnology(d).slug } }
    }),*/
    ...(landingPagesRes?.results || []).map((l) => {
      return {
        params: {
          pageSlug: slugifyLandingPage(l).slug
        }
      }
    })
  ]

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { pageSlug } }): Promise<GetStaticPropsResult<Props>> => {
  const document = await getLandingPageBySlug(pageSlug as string)
  const { slug } = slugifyLandingPage(document)

  return {
    props: {
      document,
      url: slug
    },
    revalidate: process.env.NODE_ENV !== "production" ? 10 : 60
  }
}
