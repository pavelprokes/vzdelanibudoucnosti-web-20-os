import React, { useEffect, useMemo } from "react"
import { Course, getCourseBySlug, getCourseList, getFeedbackAvatarUrl, getFeedbacksRateRound } from "../../lib/prismic/courses"
import { Alert, Col, List, Rate, Row, Space, Spin, Typography } from "antd"
import { getCourse, getFeedBacks, getLecturer, getTechnology, isCourseRegistrationOpen, MappedCourse, slugifyCourse } from "../../lib/prismic/mapData"
import { RegisterForm } from "../../components/RegisterModal/RegisterForm"
import { css } from "@emotion/react"
import Link from "next/link"
import { Comments } from "../../components/Comments/Comments"
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next"
import { Layout } from "../../components/Layout/Layout"
import { SinglePage } from "../../components/SinglePage/SinglePage"
import Image from "next/image"
import { RobotFilled } from "@ant-design/icons"
import { NextSeo } from "next-seo"
import { webUrl } from "../../config/web"
import { fbAppId, secondTitle } from "../../next-seo.config"
import styled from "@emotion/styled"
import { CourseAgeGroup, CourseType, CourseVariant } from "../../lib/prismic/Course"
import { RegisterFormForOnlineAdult } from "../../components/RegisterModal/RegisterFormForOnlineAdult"
import { RegisterFormForInPersonAdult } from "../../components/RegisterModal/RegisterFormForInPersonAdult"
import { RegisterFormOnlineChildren } from "../../components/RegisterModal/RegisterFormOnlineChildren"
import { RegisterFormForInPersonChildren } from "../../components/RegisterModal/RegisterFormForInPersonChildren"
import { RegisterFormForProjectDaysOnlineChildren } from "../../components/RegisterModal/RegisterFormForProjectDaysOnlineChildren"
import { PrismicDocument } from "@prismicio/types"
import { CommonArticles } from "../../components/blog/common"
import { CoursesList } from "../../components/CoursesList/CoursesList"
import { useCourseCapacityStatus } from "../../lib/supabase/useCourseCapacityStatus"
import { shareEvent, viewItemEvent } from "../../lib/ga"
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share"
import { useRouter } from "next/router"
import { Section } from "../../components/Section"
import { SubscribeForm } from "../../components/SubscribeForm/SubscribeForm"
import slugify from "slugify"
import { ContactForm } from "../../components/ContactForm/ContactForm"
import { RegisterFormForSampleCourse } from "../../components/RegisterModal/RegisterFormForSampleCourse"
import { sm } from "../../styles/mediaQuery"
import { CheckCourseCapacity } from "../../lib/supabase/checkCourseCapacity"

const RegistraceSlug = ({ slug, document, openSimilarCourses }: Props) => {
  const { asPath } = useRouter()
  const course = useMemo(() => document && getCourse(document.course), [document])
  const capacityData = useMemo(() => course && document && { capacity: course.capacity, courseSlug: course.slug }, [course, document])
  const courseCapacityStatus = useCourseCapacityStatus(course && document && capacityData)

  useEffect(() => {
    if (course && courseCapacityStatus && process.browser) {
      viewItemEvent({
        items: [
          {
            affiliation: "Website",
            currency: "CZK",
            item_brand: "VzdelaniBudoucnosti z.s.",
            item_category: course.courseVariant,
            item_id: course.id,
            item_name: course.name,
            item_variant: `${course.ageGroup}/${course.type}`,
            price: course.price,
            quantity: 1
          }
        ],
        currency: "CZK",
        value: course.price
      })
    }
  }, [course, courseCapacityStatus])

  if (!document) {
    return <Spin />
  }
  const technology = getTechnology(document.course)
  const lecturer = getLecturer(document.authorWithFeedbacks)
  const feedbacks = getFeedBacks(document.authorWithFeedbacks.feedbacks)
  const feedbackRate = getFeedbacksRateRound(feedbacks)
  const pageTitle = `Přihláška - ${course.name}`

  const getRegistrationForm = (course: MappedCourse, capacityStatus: CheckCourseCapacity) => {
    if (course.ageGroup === CourseAgeGroup.adult && course.type === CourseType.online && course.courseVariant === CourseVariant.course) {
      return <RegisterFormForOnlineAdult course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    } else if (course.ageGroup === CourseAgeGroup.adult && course.type === CourseType.inPerson && course.courseVariant === CourseVariant.course) {
      return <RegisterFormForInPersonAdult course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    } else if (course.ageGroup === CourseAgeGroup.children && course.type === CourseType.online && course.courseVariant === CourseVariant.course) {
      return <RegisterFormOnlineChildren course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    } else if (course.ageGroup === CourseAgeGroup.children && course.type === CourseType.inPerson && course.courseVariant === CourseVariant.course) {
      return <RegisterFormForInPersonChildren course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    } else if (course.ageGroup === CourseAgeGroup.children && course.type === CourseType.online && course.courseVariant === CourseVariant.projectDays) {
      return <RegisterFormForProjectDaysOnlineChildren course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    } else if (course.courseVariant === CourseVariant.sampleCourse) {
      return <RegisterFormForSampleCourse course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
    }

    return <RegisterForm course={course} lecturer={lecturer} capacityStatus={capacityStatus} />
  }

  return (
    <>
      <NextSeo
        title={`${pageTitle} | ${secondTitle}`}
        description={course.excerptAsText}
        canonical={`${webUrl}/registrace/${course.slug}`}
        openGraph={{
          url: `${webUrl}/registrace/${course.slug}`,
          title: `${pageTitle} | ${secondTitle}`,
          description: course.excerptAsText,
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
        <SinglePage title={pageTitle} color={technology.color}>
          <section>
            <Row
              gutter={[40, 0]}
              css={css`
                ${sm} {
                  flex-direction: column-reverse;
                }
              `}>
              <Col
                md={16}
                css={css`
                  background-color: #fff;
                  padding: 20px 0 20px 0;
                `}>
                {course.content}

                {course.isOpen && !courseCapacityStatus?.all.isFull ? (
                  getRegistrationForm(course, courseCapacityStatus)
                ) : course.isBeforeRegistration ? (
                  <>
                    <Typography.Title level={2}>Váš zájem nás zajímá</Typography.Title>
                    <SubscribeForm
                      tags={["Krouzky", "Připravujeme", technology.slug, slugify(course.name).toLowerCase()]}
                      description="Kurz připravujeme. Vyplňte svůj email a my Vám dáme vědět jakmile bude kurz připraven."
                    />
                  </>
                ) : (
                  <Alert
                    type="info"
                    banner
                    message={`Omlouváme se, registrace jsou uzavřeny.${
                      courseCapacityStatus?.all.isFull ? " Byla naplněna maximální kapacita." : ""
                    } Podívejte se na naše další kroužky a kurzy.`}
                  />
                )}

                {lecturer && lecturer.name != "" && (
                  <>
                    <Typography.Title
                      level={2}
                      css={css`
                        margin-top: 40px;
                      `}>
                      Kontaktní formulář
                    </Typography.Title>
                    <ContactForm sendTo={lecturer.email} contactFormName={course.name} contactFormUrl={`${webUrl}/registrace/${course.slug}`}>
                      <Typography.Paragraph
                        css={css`
                          text-align: center;
                        `}>
                        Pokud máte jakékoliv dotazy, pošlete zprávu přímo našemu lektorovi.
                      </Typography.Paragraph>
                    </ContactForm>
                  </>
                )}
              </Col>

              <Col
                md={8}
                css={css`
                  padding: 20px 0 20px 0;
                `}>
                <Space direction="vertical" style={{ display: "initial" }}>
                  <div
                    css={css`
                      margin-bottom: 20px;

                      > button {
                        margin-right: 10px;

                        &:last-of-type {
                          margin-right: 0;
                        }
                      }

                      ${sm} {
                        display: none;
                      }
                    `}>
                    <Typography.Title level={4}>Sdílejte</Typography.Title>
                    <FacebookShareButton
                      onClick={() => {
                        shareEvent({
                          content_id: course.id,
                          content_type: "course",
                          method: "facebook"
                        })
                      }}
                      url={`https://vzdelanibudoucnosti.cz${asPath}`}>
                      <FacebookIcon size={35} round={true} />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                      onClick={() => {
                        shareEvent({
                          content_id: course.id,
                          content_type: "course",
                          method: "facebookMessenger"
                        })
                      }}
                      appId={fbAppId}
                      url={`https://vzdelanibudoucnosti.cz${asPath}`}>
                      <FacebookMessengerIcon size={35} round={true} />
                    </FacebookMessengerShareButton>

                    <TwitterShareButton
                      onClick={() => {
                        shareEvent({
                          content_id: course.id,
                          content_type: "course",
                          method: "twitter"
                        })
                      }}
                      url={`https://vzdelanibudoucnosti.cz${asPath}`}>
                      <TwitterIcon size={35} round={true} />
                    </TwitterShareButton>
                  </div>
                  <div
                    css={css`
                      margin-bottom: 20px;

                      .ant-list-sm .ant-list-item {
                        padding: 8px 0;
                      }
                    `}>
                    <Typography.Title level={4}>Základní informace</Typography.Title>
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
                          <Typography.Paragraph style={{ fontSize: 12, marginBottom: "-1em" }}>{course.additionalInformation}</Typography.Paragraph>
                        </List.Item>
                      )}

                      {courseCapacityStatus?.all.isAlmostFull && (
                        <Alert style={{ fontSize: 12 }} type="warning" banner message="Kroužek bude brzy naplněn. Zaregistrujte se nyní!" />
                      )}
                    </List>
                  </div>

                  {lecturer && lecturer.name !== "" && (
                    <div
                      css={css`
                        margin-bottom: 20px;
                      `}>
                      <Typography.Title level={4}>Lektor</Typography.Title>
                      <Row
                        align="middle"
                        css={css`
                          padding: 15px;
                          background-color: #fff;
                          border-radius: 20px;
                        `}>
                        {lecturer.pictureUrl && (
                          <Col
                            css={css`
                              width: 100px;
                              height: 100px;
                              margin-right: 20px;
                            `}>
                            <ImageRounded src={lecturer.pictureUrl} width={100} height={100} objectFit="cover" layout="fixed" loading="eager" />
                          </Col>
                        )}
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
                      </Row>
                    </div>
                  )}

                  {feedbacks?.length > 0 && (
                    <div
                      css={css`
                        margin-bottom: 20px;
                      `}>
                      <div>
                        <Typography.Title level={4}>Hodnocení</Typography.Title>
                        <div
                          css={css`
                            padding: 15px;
                            background-color: #fff;
                            border-radius: 20px;
                            margin-bottom: 10px;
                          `}>
                          <Typography.Text>{feedbackRate} z 5</Typography.Text>
                          <Rate disabled allowHalf defaultValue={feedbackRate} style={{ fontSize: 14, marginLeft: 10 }} />
                        </div>
                      </div>

                      <div
                        css={css`
                          margin-bottom: 20px;
                        `}>
                        <Comments
                          commentStyle={{ fontSize: 12 }}
                          css={css`
                            padding: 0 15px 0 15px;
                          `}
                          comments={feedbacks.slice(0, 4).map((f, i) => ({
                            dateTime: f.dateTime,
                            avatarImagePath: f.imageUrl || getFeedbackAvatarUrl(f.sex, i),
                            content: f.description,
                            author: f.name
                          }))}
                        />
                      </div>
                    </div>
                  )}

                  {course.difficulty ? (
                    <div
                      css={css`
                        margin-bottom: 20px;
                      `}>
                      <Typography.Title level={4}>Náročnost</Typography.Title>
                      <div
                        css={css`
                          padding: 15px;
                          background-color: #fff;
                          border-radius: 20px;
                        `}>
                        <Typography.Text>{course.difficulty} z 5</Typography.Text>
                        <Rate
                          disabled
                          allowHalf
                          value={course.difficulty}
                          character={<RobotFilled />}
                          style={{ fontSize: 14, marginLeft: 10, color: technology.color }}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Space>
              </Col>
            </Row>
          </section>

          {!course.isBeforeRegistration && (
            <Section>
              <Typography.Title level={2}>Odběr novinek</Typography.Title>
              <SubscribeForm
                tags={["Krouzky", technology.slug, slugify(course.name).toLowerCase()]}
                description="Nevešli jste se do kapacity naší registrace na kroužek nebo kurz? Chcete vědět o novinkách nabízených kroužků? Vyplňte svůj email a my Vám dáme vědět."
              />
            </Section>
          )}

          <section>
            {openSimilarCourses.length > 0 && (
              <div>
                <CommonArticles>
                  <Typography.Title level={2}>Nabídka dalších kroužků a kurzů</Typography.Title>

                  <CoursesList
                    courses={openSimilarCourses}
                    css={css`
                      margin: 20px 0 0 0;
                    `}
                  />
                </CommonArticles>
              </div>
            )}
          </section>
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
  slug: string
  document: Course
  openSimilarCourses: PrismicDocument[] | null
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const pathsRes = await getCourseList()
  const paths = (pathsRes.results || []).map((d: PrismicDocument<any>) => {
    const { slug } = slugifyCourse(d)

    return { params: { slug } }
  })

  return {
    paths,
    fallback: true
  }
}

const dev = process.env.NODE_ENV !== "production"

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const document = await getCourseBySlug(params.slug as string)
  if (!document) {
    return {
      props: {
        slug: params.slug,
        document: null,
        openSimilarCourses: null
      },
      revalidate: dev ? 1 : 120
    }
  }

  const similarCourses = await getCourseList()
  const openSimilarCourses = similarCourses.results.filter((d) => isCourseRegistrationOpen(d) && d.id !== document.course.id)

  return {
    props: {
      slug: params.slug,
      document,
      openSimilarCourses: openSimilarCourses || null
    },
    revalidate: dev ? 1 : 120
  }
}

export default RegistraceSlug
