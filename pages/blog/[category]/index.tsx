import React from "react"
import { SinglePage } from "../../../components/SinglePage/SinglePage"
import { Layout } from "../../../components/Layout/Layout"
import { Col, Row } from "antd"
import MiniArticle from "../../../components/blog/MiniArticle"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { getSections, PrismicCustomTypes, searchPostByCategory, searchPostByNotCategory } from "../../../lib/prismic/prosmic"
import { PrismicDocument } from "@prismicio/types"
import StandardArticle from "../../../components/blog/StandardArticle"
import { css } from "@emotion/react"

const dev = process.env.NODE_ENV !== "production"

const ArticlesByCategory = ({ blogPosts, otherCategoryPosts, slug }: Props) => {
  return (
    <Layout>
      <SinglePage title={`Blog - ${slug}`}>
        <Row gutter={[40, 0]}>
          <Col
            xs={24}
            md={14}
            lg={16}
            xl={16}
            css={css`
              background-color: #fff;
              padding: 15px 0 15px 0;
            `}>
            {blogPosts?.map((d) => (
              <StandardArticle key={d.id} document={d} />
            ))}
          </Col>

          <Col
            xs={24}
            md={10}
            lg={8}
            xl={8}
            css={css`
              padding: 15px 0 15px 0;
            `}>
            {otherCategoryPosts?.map((d) => (
              <MiniArticle key={d.id} document={d} />
            ))}
          </Col>
        </Row>
      </SinglePage>
    </Layout>
  )
}

interface Props {
  slug: string
  blogPosts: PrismicDocument<any>[] | null
  otherCategoryPosts: PrismicDocument<any>[] | null
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const categories = await getSections()
  const paths = categories.results.map((d: PrismicDocument<any>) => ({ params: { category: d.slugs[0] } }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<Props>> => {
  const category = params?.category as string
  if (!category) {
    return {
      props: {
        slug: category,
        blogPosts: null,
        otherCategoryPosts: null
      },
      revalidate: dev ? 1 : 60
    }
  }

  const blogPosts = await searchPostByCategory(category, [PrismicCustomTypes.blogPost])
  const otherCategoryPosts = await searchPostByNotCategory(category, [PrismicCustomTypes.blogPost])
  return {
    props: {
      slug: category,
      blogPosts: blogPosts,
      otherCategoryPosts: otherCategoryPosts
    },
    revalidate: dev ? 1 : 60
  }
}

export default ArticlesByCategory
