import React from "react"
import { PrismicDocument } from "@prismicio/types"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import MiniArticle from "../../../components/blog/MiniArticle"
import { SinglePage } from "../../../components/SinglePage/SinglePage"
import { Layout } from "../../../components/Layout/Layout"
import { Col, Row, Typography } from "antd"
import { getArticlesByNotTag, getArticlesByTags, getTags, PrismicCustomTypes } from "../../../lib/prismic/prosmic"
import StandardArticle from "../../../components/blog/StandardArticle"
import Link from "next/link"
import { css } from "@emotion/react"

const dev = process.env.NODE_ENV !== "production"

const ArticleByTag = ({ blogPosts, otherBlogPosts, slug, tags }: Props) => {
  return (
    <Layout>
      <SinglePage title={`Články se štítkem ${slug}`}>
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
            <div>
              {blogPosts?.map((d) => (
                <StandardArticle key={`blogPosts2${d.id}`} document={d} />
              ))}
            </div>
          </Col>

          <Col
            xs={24}
            md={10}
            lg={8}
            xl={8}
            css={css`
              padding: 15px 0 15px 0;
            `}>
            <div>
              {otherBlogPosts?.map((d) => (
                <MiniArticle key={d.id} document={d} />
              ))}
            </div>

            <div>
              <Typography.Title level={4}>Štítky</Typography.Title>
              <ul>
                {tags?.map((t) => (
                  <Link key={`tags${t}`} href={`/blog/stitek/${encodeURIComponent(t)}`}>
                    <a title={`Přejít na ${t}`}>
                      <li>{t}</li>
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </SinglePage>
    </Layout>
  )
}

interface Props {
  slug: string
  blogPosts: PrismicDocument<any>[] | null
  otherBlogPosts: PrismicDocument<any>[] | null
  tags: string[] | null
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const tags = (await getTags()) || []
  return {
    paths: tags.map((p: string) => ({ params: { tag: p } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<Props>> => {
  const tag = params?.tag as string
  const revalidate = dev ? 1 : 60
  const returnPropsData = {
    slug: tag,
    highlightedBlogPosts: null,
    blogPosts: null,
    otherBlogPosts: null,
    tags: null
  }

  if (!tag) {
    return {
      props: returnPropsData,
      revalidate
    }
  }

  const posts = await getArticlesByTags([tag], [PrismicCustomTypes.blogPost])
  const otherBlogPosts = await getArticlesByNotTag([tag], [PrismicCustomTypes.blogPost])
  const tags = await getTags()

  if (!posts || posts.length === 0) {
    return {
      props: {
        ...returnPropsData,
        slug: tag,
        otherBlogPosts: otherBlogPosts || null,
        tags: tags || null
      },
      revalidate
    }
  }

  return {
    props: {
      ...returnPropsData,
      slug: tag,
      otherBlogPosts: otherBlogPosts || null,
      blogPosts: posts || null,
      tags: tags || null
    },
    revalidate
  }
}

export default ArticleByTag
