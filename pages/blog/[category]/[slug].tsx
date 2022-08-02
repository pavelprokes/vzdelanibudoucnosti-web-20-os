import React from "react"
import { PrismicDocument } from "@prismicio/types"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from "next"
import { CommonArticles } from "../../../components/blog/common"
import ArticleFooter from "../../../components/blog/ArticleFooter"
import styled from "@emotion/styled"
import Image from "next/image"
import StandardArticle from "../../../components/blog/StandardArticle"
import { Layout } from "../../../components/Layout/Layout"
import { SinglePage } from "../../../components/SinglePage/SinglePage"
import { getArticlesByTags, getArticlesWithAuthorsByDocumentType, PrismicCustomTypes, searchPostBySlugAndCategory } from "../../../lib/prismic/prosmic"
import { htmlSerializer } from "../../../lib/prismic/htmlSerializer"
import { css } from "@emotion/react"
import { md } from "../../../styles/mediaQuery"
import { BlogJsonLd, NextSeo } from "next-seo"
import { webUrl } from "../../../config/web"
import { RichText } from "prismic-reactjs"

const dev = process.env.NODE_ENV !== "production"

const ArticleByCategoryAndSlug = ({ document, documentsWithSameTag }: Props) => {
  if (!document) {
    return "nenalezeno"
  }

  const title = document?.data.title[0].text
  const url = `${webUrl}/blog/${document.data.category?.slug}/${document.slugs?.[0]}`
  const postImage = document.data.image
  const postDescription = document.data.excerpt

  return (
    <>
      <NextSeo
        title={title}
        description={postDescription}
        canonical={url}
        openGraph={{
          url: url,
          title: title,
          description: postDescription,
          images: [
            {
              url: postImage.url,
              width: postImage.dimensions.width,
              height: postImage.dimensions.height,
              alt: postImage.alt || document.slugs?.[0]
            }
          ]
        }}
      />

      <BlogJsonLd
        url={url}
        title={title}
        images={[postImage.url]}
        datePublished={document.first_publication_date}
        dateModified={document.last_publication_date}
        authorName={document.data?.author?.data?.name?.[0].text ?? ""}
        description={postDescription}
      />

      <Layout>
        <SinglePage
          title={title}
          css={css`
            background-color: #fff;
          `}>
          <section
            css={css`
              padding: 15px 0 15px 0;
            `}>
            <article>
              {document.data?.image?.url && document.data.image.url !== "" && (
                <ImageWrapperMargin>
                  <Image
                    src={document.data.image.url}
                    alt={document.data.image.alt || "header-post-image."}
                    width={document.data.image.dimensions.width}
                    height={document.data.image.dimensions.height}
                  />
                </ImageWrapperMargin>
              )}

              <ArticleFooterWithMargin document={document} hideReadMore />

              <RichText render={document.data.content} htmlSerializer={htmlSerializer} />
            </article>

            {documentsWithSameTag?.length > 0 && (
              <CommonArticles>
                <h2>Další články{document.tags.length > 0 && ` od ${document.tags.join(", ")}`}</h2>
                {documentsWithSameTag.map((d: PrismicDocument) => (
                  <StandardArticle key={d.id} document={d} />
                ))}
              </CommonArticles>
            )}
          </section>
        </SinglePage>
      </Layout>
    </>
  )
}

interface Props {
  slug: string
  document: PrismicDocument<any> | null
  documentsWithSameTag: PrismicDocument<any>[] | null
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const posts = await getArticlesWithAuthorsByDocumentType(PrismicCustomTypes.blogPost)
  const paths = posts.results.map((d: PrismicDocument<any>) => ({ params: { category: d.data.category?.slug, slug: d.slugs[0] } }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<Props>> => {
  const category = params?.category as string
  const slug = params?.slug as string
  if (!slug || !category) {
    return {
      props: {
        slug: slug,
        document: null,
        documentsWithSameTag: null
      },
      revalidate: dev ? 1 : 60
    }
  }

  const document = await searchPostBySlugAndCategory(slug, category, [PrismicCustomTypes.blogPost])
  const documentsWithSameTag = document?.tags?.length > 0 ? await getArticlesByTags(document.tags, [PrismicCustomTypes.blogPost]) : undefined
  const filteredDocumentsWithSameTag = documentsWithSameTag?.filter((d) => d.id !== document.id)

  return {
    props: {
      slug,
      document,
      documentsWithSameTag: filteredDocumentsWithSameTag || null
    },
    revalidate: dev ? 1 : 60
  }
}

const ArticleFooterWithMargin = styled(ArticleFooter)`
  margin-bottom: 15px;
  display: block;
`

const ImageWrapperMargin = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: center;

  ${md} {
    width: 100%;
    height: auto;
  }
`

export default ArticleByCategoryAndSlug
