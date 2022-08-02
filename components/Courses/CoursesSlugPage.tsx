import React, { useMemo } from "react"
import { getCourse, getFeedBacks, getLecturer, getTechnology, isCourseRegistrationOpen, slugifyCourse } from "../../lib/prismic/mapData"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { Layout } from "../Layout/Layout"
import { SinglePage } from "../SinglePage/SinglePage"
import { css } from "@emotion/react"
import { Section } from "../Section"
import { Button, Col, List, Row, Space, Tooltip, Typography } from "antd"
import Link from "next/link"
import Image from "next/image"
import { Comments } from "../Comments/Comments"
import { Course, getCourseBySlug, getCourseList, GetCourseListFilterOptions, getFeedbackAvatarUrl } from "../../lib/prismic/courses"
import { CommonArticles, H2, H4 } from "../blog/common"
import { CoursesList } from "../CoursesList/CoursesList"
import { PrismicDocument } from "@prismicio/types"
import StandardArticle from "../blog/StandardArticle"
import { CourseAgeGroup } from "../../lib/prismic/Course"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { ParsedUrlQuery } from "querystring"
import { getArticlesByTags, PrismicCustomTypes } from "../../lib/prismic/prosmic"
import styled from "@emotion/styled"
import { useCourseCapacityStatus } from "../../lib/supabase/useCourseCapacityStatus"

const dev = process.env.NODE_ENV !== "production"

export const CoursesSlugPage = ({ slug, document, blogPostsWithSameTag, openSimilarCourses }: Props) => {
  const course = useMemo(() => document && getCourse(document.course), [document])
  const capacityData = useMemo(() => course && document && { capacity: course.capacity, courseSlug: course.slug }, [course, document])
  const courseCapacityStatus = useCourseCapacityStatus(course && document && capacityData)

  if (!document) {
    return <>nenalezeno</>
  }
  const lecturer = getLecturer(document.authorWithFeedbacks)
  const feedbacks = getFeedBacks(document.authorWithFeedbacks.feedbacks)
  const technology = getTechnology(document.course)
  const courseStringType = course.ageGroup === CourseAgeGroup.adult ? "kurzy" : "krouzky"

  return (
    <>
      <NextSeo
        title={`${course.name} | ${course.descriptionType}`}
        description={course.excerpt.toString()}
        canonical={`${webUrl}/${courseStringType}/${slug}`}
        openGraph={{
          url: `${webUrl}/${courseStringType}/${slug}`,
          title: `${course.name} | ${course.descriptionType}`,
          description: course.excerpt.toString(),
          ...(course.image && {
            images: [
              {
                url: course.image.url,
                width: course.image.dimensions.width,
                height: course.image.dimensions.height,
                alt: course.image.alt ?? slug
              }
            ]
          })
        }}
      />

      <Layout>
        <SinglePage title={course.name} color={technology.color}>
          <Section
            css={css`
              padding-top: 20px;
            `}>
            <Space direction="vertical" size="large">
              <div
                css={css`
                  background-color: #fff;
                  border-radius: 20px;
                  padding: 20px;
                `}>
                {course.content}
              </div>

              <div>
                <H4 level={4}>Chcete se přihlásit?</H4>
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 40px 0 40px 0;
                  `}>
                  {course.isOpen && !courseCapacityStatus?.all.isFull ? (
                    <Tooltip title={`Přihlašte se na ${course.name} nyní.`}>
                      <Link href={course.registerUrl}>
                        <a>
                          <Button type="primary" size="large">
                            Přihlásit se
                          </Button>
                        </a>
                      </Link>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip title={`Omlouváme se, registrace jsou uzavřeny.${courseCapacityStatus?.all.isFull ? " Byla naplněna kapacita." : ""}`}>
                        <Button type="primary" size="large" disabled={true}>
                          Přihlásit se
                        </Button>
                      </Tooltip>

                      {course.isAfterRegistration && (
                        <Typography.Paragraph
                          css={css`
                            margin-left: 10px;
                          `}>
                          Registrace jsou uzavřeny.
                        </Typography.Paragraph>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div
                css={css`
                  margin-bottom: 20px;
                `}>
                <H4 level={4}>Základní informace</H4>
                <List
                  size="small"
                  css={css`
                    padding: 15px;
                    background-color: #fff;
                    border-radius: 20px;
                  `}>
                  <ListItem>
                    <Typography.Title level={5}>Kdy?</Typography.Title>
                    <Typography.Text style={{ fontSize: 12 }}>{course.when}</Typography.Text>
                  </ListItem>
                  <ListItem>
                    <Typography.Title level={5}>Kde?</Typography.Title>
                    <Typography.Text style={{ fontSize: 12 }}>{course.where}</Typography.Text>
                  </ListItem>
                  <ListItem>
                    <Typography.Title level={5}>Cena</Typography.Title>
                    <Typography.Text style={{ fontSize: 12 }}>{`${course.price} Kč`}</Typography.Text>
                  </ListItem>
                  {course.additionalInformation && course.additionalInformation !== "" && (
                    <List.Item>
                      <Typography.Text style={{ fontSize: 12 }}>{course.additionalInformation}</Typography.Text>
                    </List.Item>
                  )}
                </List>
              </div>

              {lecturer && (
                <div
                  css={css`
                    margin-bottom: 20px;
                  `}>
                  <H4 level={4}>Lektor</H4>
                  <Row
                    align="middle"
                    css={css`
                      padding: 15px;
                      background-color: #fff;
                      border-radius: 20px;
                    `}>
                    <Col
                      css={css`
                        width: 100px;
                        height: 100px;
                        margin-right: 20px;
                      `}>
                      {lecturer.pictureUrl && <ImageRounded src={lecturer.pictureUrl} width={100} height={100} objectFit="cover" layout="fixed" />}
                    </Col>
                    <Col>
                      <Typography.Title level={5} style={{ marginBottom: 0 }}>
                        {lecturer.name}
                      </Typography.Title>
                      <Typography.Text style={{ fontSize: 12 }}>
                        {lecturer.position}
                        <br />
                        <Link href={`mailto:${lecturer.email}`}>
                          <a title="email">{lecturer.email}</a>
                        </Link>
                      </Typography.Text>
                    </Col>
                    <Col>
                      {feedbacks?.length > 0 && (
                        <div
                          css={css`
                            margin-bottom: 20px;
                          `}>
                          <div
                            css={css`
                              margin-bottom: 20px;
                            `}>
                            <Comments
                              commentStyle={{ fontSize: 12 }}
                              css={css`
                                padding: 0 15px 0 15px;
                              `}
                              comments={feedbacks.slice(0, 6).map((f, i) => ({
                                dateTime: f.dateTime,
                                avatarImagePath: f.imageUrl || getFeedbackAvatarUrl(f.sex, i),
                                content: f.description,
                                author: f.name
                              }))}
                            />
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
            </Space>
          </Section>

          <Section>
            {openSimilarCourses?.length > 0 && (
              <div>
                <CommonArticles>
                  <Typography.Title level={3}>Nabídka dalších kroužků a kurzů</Typography.Title>

                  <CoursesList
                    courses={openSimilarCourses}
                    css={css`
                      margin: 20px 0 0 0;
                    `}
                  />
                </CommonArticles>
              </div>
            )}
          </Section>

          <Section>
            {blogPostsWithSameTag?.length > 0 && (
              <div>
                <CommonArticles>
                  <H2>Články z našeho blogu</H2>
                  {blogPostsWithSameTag.map((d: PrismicDocument) => (
                    <StandardArticle key={d.id} document={d} />
                  ))}
                </CommonArticles>
              </div>
            )}
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

const ImageRounded = styled(Image)`
  border-radius: 50%;
  overflow: hidden;
`

const ListItem = styled(List.Item)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > h5 {
    margin-bottom: 0.25em;
  }
`

interface Props {
  id?: string
  slug: string
  document: Course | null
  blogPostsWithSameTag: PrismicDocument<any>[] | null
  openSimilarCourses: PrismicDocument<any>[] | null
}

export const getStaticCoursesPageSlugPaths = async (filterOptions?: GetCourseListFilterOptions): Promise<GetStaticPathsResult> => {
  const posts = await getCourseList(filterOptions)
  const paths = (posts.results || []).map((d: PrismicDocument) => {
    const { slug } = slugifyCourse(d)

    return { params: { slug } }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticCoursesPageSlugProps = async (
  params: ParsedUrlQuery,
  filterOptions?: GetCourseListFilterOptions
): Promise<GetStaticPropsResult<Props>> => {
  const slug = params?.slug as string
  const document = await getCourseBySlug(slug, filterOptions || {})
  if (!document) {
    return {
      props: {
        slug,
        document: null,
        blogPostsWithSameTag: null,
        openSimilarCourses: null
      },
      revalidate: dev ? 1 : 60
    }
  }
  const collectedTags = (document.course?.tags || []).map((t) => (t || "").toLowerCase())

  const blogPostsWithSameTag = await getArticlesByTags(collectedTags, [PrismicCustomTypes.blogPost])
  const similarCourses = await getCourseList({
    ...(filterOptions ? filterOptions : {}),
    tags: [...collectedTags, ...(filterOptions.tags?.length > 0 ? [...filterOptions.tags] : [])]
  })
  const openSimilarCourses = (similarCourses?.results || []).filter((d) => isCourseRegistrationOpen(d) && d.id !== document.course.id)

  return {
    props: {
      slug,
      document,
      blogPostsWithSameTag: blogPostsWithSameTag || null,
      openSimilarCourses: openSimilarCourses || null
    },
    revalidate: dev ? 1 : 60
  }
}
