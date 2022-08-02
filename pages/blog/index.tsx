import React from "react"
import { GetStaticProps } from "next"
import HighlightedArticle from "../../components/blog/HighlightedArticle"
import StandardArticle from "../../components/blog/StandardArticle"
import MiniArticle from "../../components/blog/MiniArticle"
import Link from "next/link"
import Image from "next/image"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import { Col, Row, Typography } from "antd"
import { Layout } from "../../components/Layout/Layout"
import { PrismicDocument } from "@prismicio/types"
import { getArticlesWithAuthorsByDocumentType, getAuthors, getSections, getTags, PrismicCustomTypes } from "../../lib/prismic/prosmic"
import { H2, H3, h3Size } from "../../components/blog/common"
import { css } from "@emotion/react"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { secondTitle } from "../../next-seo.config"
import styled from "@emotion/styled"
import { sortDocumentByDateTime } from "../../lib/sortDateTime"
import { Section } from "../../components/Section"
import { SubscribeForm } from "../../components/SubscribeForm/SubscribeForm"

const dev = process.env.NODE_ENV !== "production"

const BlogIndex = ({ postsResult, highlightedPostsResult, tags, authors, sections }: Props) => {
  return (
    <>
      <NextSeo
        title={`Blog | ${secondTitle}`}
        description="Náš blog"
        canonical={`${webUrl}/blog`}
        openGraph={{
          url: `${webUrl}/blog`,
          title: "Blog",
          description: "Náš blog"
        }}
      />

      <Layout>
        <SinglePage title="Blog">
          <section>
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
                {highlightedPostsResult && highlightedPostsResult[0] && (
                  <div
                    css={css`
                      margin-bottom: 40px;
                    `}>
                    <HighlightedArticle
                      key={`highlightedBlogPosts${highlightedPostsResult[0].id}`}
                      document={highlightedPostsResult[0]}
                      css={css`
                        height: 320px;
                      `}
                    />
                  </div>
                )}

                <H2
                  css={css`
                    margin-top: 0;
                  `}>
                  Aktuálně
                </H2>

                <div>
                  {postsResult.slice(0, 10).map((d) => (
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
                {highlightedPostsResult && highlightedPostsResult.length > 0 && (
                  <div>
                    {highlightedPostsResult.slice(1).map((d) => (
                      <MiniArticle key={`blogPosts${d.id}`} document={d} />
                    ))}
                  </div>
                )}

                <div>
                  <Typography.Title level={4}>Rubriky</Typography.Title>
                  <ul>
                    {sections.map((s: PrismicDocument) => (
                      <Link key={`sections${s.id}`} href={`/blog/${encodeURIComponent(s.slugs[0])}`}>
                        <a title={`Přejít na ${s.data.title[0].text}`}>
                          <li>{s.data.title[0].text}</li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>

                <div>
                  <H3 level={3} style={h3Size}>
                    Štítky
                  </H3>
                  <ul>
                    {tags.map((t) => (
                      <Link key={`tags${t}`} href={`/blog/stitek/${encodeURIComponent(t)}`}>
                        <a title={`Přejít na ${t}`}>
                          <li>{t}</li>
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>

                <div>
                  <H3 level={3} style={h3Size}>
                    Autoři
                  </H3>
                  <ul
                    css={css`
                      list-style: none;
                      padding-left: 0;
                    `}>
                    {authors.map((a: PrismicDocument<any>) => (
                      <li
                        key={`authors${a.id}`}
                        css={css`
                          margin-bottom: 15px;

                          &:last-of-type {
                            margin-bottom: 0;
                          }
                        `}>
                        <AuthorListItemWrapper>
                          <div
                            css={css`
                              border-radius: 50%;
                              overflow: hidden;
                              width: 80px;
                              height: 80px;

                              > div {
                                display: block !important;
                              }
                            `}>
                            {a.data.picture.url && (
                              <Image src={a.data.picture.url} alt={a.data.name[0].text} width={80} height={80} objectFit="cover" layout="fixed" quality={90} />
                            )}
                          </div>
                          <p
                            css={css`
                              margin-left: 15px;
                            `}>
                            {a.data.name[0].text}
                          </p>
                        </AuthorListItemWrapper>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </section>

          <Section>
            <H2 level={2}>Odběr novinek</H2>
            <SubscribeForm tags={["Krouzky", "blog"]} description="Chcete vědět o novinkách nabízených kroužků? Vyplňte svůj email a my Vám dáme vědět." />
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

const AuthorListItemWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }
`

interface Props {
  postsResult: PrismicDocument<any>[]
  highlightedPostsResult: PrismicDocument<any>[]
  sections: PrismicDocument<any>[]
  tags: string[]
  authors: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getArticlesWithAuthorsByDocumentType(PrismicCustomTypes.blogPost)

  const postsResult = posts.results.filter((d: PrismicDocument) => !d.data.highlighted).sort(sortDocumentByDateTime)
  const highlightedPostsResult = posts.results.filter((d: PrismicDocument) => d.data.highlighted).sort(sortDocumentByDateTime)

  const sections = await getSections()
  const authors = await getAuthors()
  const tags = await getTags()

  return {
    props: {
      authors: authors.results,
      tags,
      sections: sections.results,
      postsResult: postsResult || [],
      highlightedPostsResult: highlightedPostsResult || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default BlogIndex
