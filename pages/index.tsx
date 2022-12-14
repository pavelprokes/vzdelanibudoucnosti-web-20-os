import React from "react"
import Container, { containerRowProps } from "../components/Layout/Container"
import { Layout } from "../components/Layout/Layout"
import { Col, List, Row, Space, Typography } from "antd"
import { ColoredBlock } from "../components/ColoredBlock/ColoredBlock"
import { css } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PartnersList } from "../components/PartnersList/PartnersList"
import { CollapsedPanel } from "../components/CollapsedPanel/CollapsedPanel"
import { Comments } from "../components/Comments/Comments"
import { CoursesList } from "../components/CoursesList/CoursesList"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getCourseList, getFeedbackAvatarUrl, getTechnologyList } from "../lib/prismic/courses"
import { isCourseRegistrationBefore, isCourseRegistrationOpen, isOngoingCourse } from "../lib/prismic/mapData"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { getArticlesWithAuthorsByDocumentType, PrismicCustomTypes } from "../lib/prismic/prosmic"
import Link from "next/link"
import { faqList } from "../lib/faq"
import { Section } from "../components/Section"
import { SubscribeForm } from "../components/SubscribeForm/SubscribeForm"
import { CourseVariant } from "../lib/prismic/Course"
import { theme } from "../styles/styles"
import HighlightedArticle from "../components/blog/HighlightedArticle"
import { sortDocumentByDateTime } from "../lib/sortDateTime"
import { getTechnologyToolList } from "../lib/prismic/technologyTool"
import { TechnologyToolList } from "../components/TechnologyTools/TechnologyToolList"
import { getRecommends } from "../lib/prismic/recommend"
import { RecommendList } from "../components/RecommendList/RecommendList"
import { PrismicDocument } from "@prismicio/types"
import { faAward, faBus, faLaptopCode, faPerson, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { faPython } from "@fortawesome/free-brands-svg-icons"
import { IndexHero } from "../components/IndexHero/IndexHero"
import { getLandingPages, slugifyLandingPage } from "../lib/prismic/landingPages"
import styled from "@emotion/styled"
import { md } from "../styles/mediaQuery"
import { Bubble, Bubbles } from "../components/IndexHero/Bubbles"
import moment from "moment"
import { ImageRounded } from "./organizace"

const dev = process.env.NODE_ENV !== "production"

const Index = ({
  openCourses,
  projectDaysCourses,
  preparingCourses,
  sampleCourses,
  workshopCourses,
  comments,
  technologies,
  postsResult,
  technologyTools,
  recommends,
  ongoingCourses,
  mappedBubbles
}: Props) => {
  const homePageComments = comments.map((d, i) => ({
    avatarImagePath: d.data.image.url || getFeedbackAvatarUrl(d.data.sex, i),
    author: d.data.name[0] ? d.data.name[0].text : "",
    content: d.data.description[0] ? d.data.description[0].text : "",
    dateTime: d.data.forcedFirstPublicationDate || d.first_publication_date
  }))

  return (
    <>
      <NextSeo
        title={`IT krou??ky pro d??ti a dosp??l??`}
        description={`Z??bavn?? a dostupn?? IT krou??ky pro kluky i holky. Stvo?? si sv??j vlastn?? sv??t a za??ni s IT i Ty!`}
        canonical={webUrl}
        openGraph={{
          url: webUrl,
          title: `IT krou??ky pro d??ti a dosp??l??`,
          description: `Z??bavn?? a dostupn?? IT krou??ky pro kluky i holky. Stvo?? si sv??j vlastn?? sv??t a za??ni s IT i Ty!`,
          images: [
            {
              url: `${webUrl}/images/01_2022_vzdelani_budoucnosti_web_header_1920_1.jpg`,
              width: 1920,
              height: 1080,
              alt: "01_2022_vzdelani_budoucnosti_web_header_1920_1"
            }
          ]
        }}
      />

      <Layout>
        <section>
          <IndexHero>
            <ShowWhenDesktop>
              <Bubbles mappedBubbles={mappedBubbles} />
            </ShowWhenDesktop>
          </IndexHero>
        </section>

        <Container>
          <Section>
            <ShowWhenMobile>
              <Bubbles mappedBubbles={mappedBubbles} />
            </ShowWhenMobile>
          </Section>

          <Section
            css={css`
              padding: 0;
            `}>
            <Space size={20} align="start">
              <div>
                <Typography.Paragraph>
                  Programov??n?? u????m u?? n??kolik let a po????d se nep??est??v??m divit, jak ch??pav?? um?? d??ti b??t a jak rychle m????e spr??vn?? zvolen?? aktivita d??t??
                  oslovit a nadchnout. Jen d??ky nad??en?? a opravdov??mu z??jmu je mo??n?? cesta i ke slo??it??j????mu IT, a pr??v?? tou my chceme s d??tmi j??t. Jestli
                  chcete poradit, co by bylo nejlep???? zrovna pro va??e d??t??, tak se n??m ozv??te, moc r??di s v??mi v??e pobereme.
                </Typography.Paragraph>
                <Typography.Paragraph style={{ textAlign: "right" }}>Jakub Valenta, CEO projektu</Typography.Paragraph>
              </div>
              <div
                css={css`
                  width: 100px;
                  height: 100px;
                `}>
                <ImageRounded width={100} height={100} src="/images/organizace/jakub.jpg" alt="jakub" />
              </div>
            </Space>
          </Section>

          {openCourses.length === 0 && ongoingCourses.length > 0 && (
            <Section>
              <Typography.Title level={2}>Pr??v?? prob??h??</Typography.Title>
              <CoursesList
                courses={ongoingCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          )}
          {openCourses.length > 0 ? (
            <Section>
              <Typography.Title level={2}>Otev??en?? registrace</Typography.Title>
              <CoursesList
                courses={openCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          ) : (
            <div
              css={css`
                height: 20px;
              `}
            />
          )}
          {recommends.length > 0 && (
            <Section>
              <Typography.Title level={2}>Doporu??ujeme</Typography.Title>
              <Row
                {...containerRowProps}
                gutter={[20, 20]}
                css={css`
                  margin: 20px 0 0 0;
                `}>
                <RecommendList recommends={recommends} />
              </Row>
            </Section>
          )}
          {sampleCourses.length > 0 && (
            <Section>
              <Typography.Title level={2}>Uk??zkov?? lekce</Typography.Title>
              <CoursesList
                courses={sampleCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          )}
          {projectDaysCourses.length > 0 && (
            <Section>
              <Typography.Title level={2}>Projektov?? dny</Typography.Title>
              <CoursesList
                courses={projectDaysCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          )}
          {workshopCourses.length > 0 && (
            <Section>
              <Typography.Title level={2}>Workshopy</Typography.Title>
              <CoursesList
                courses={workshopCourses}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          )}
          {preparingCourses.length > 0 && (
            <Section>
              <Typography.Title level={2}>P??ipravujeme</Typography.Title>
              <CoursesList
                courses={preparingCourses}
                simpleLayout={true}
                css={css`
                  margin: 20px 0 0 0;
                `}
                informationOnly={true}
              />
            </Section>
          )}
          {postsResult.length > 0 && (
            <Section>
              <Typography.Title level={2}>
                Aktu??ln?? z na??eho{" "}
                <Link href="/blog">
                  <a title="P??ej??t na blog">blogu</a>
                </Link>
              </Typography.Title>
              <Row
                gutter={[10, 10]}
                css={css`
                  margin: 20px 0 0 0;
                `}>
                {postsResult.map((post) => (
                  <Col key={post.id} lg={8} md={12} sm={12} xs={12}>
                    <HighlightedArticle
                      document={post}
                      titleAs="h3"
                      css={css`
                        margin-bottom: 0;
                        height: 320px;

                        > div {
                          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                        }
                      `}
                    />
                  </Col>
                ))}
              </Row>
            </Section>
          )}
          <Section
            css={css`
              margin-top: 40px;
              background-color: #fff;
              border-radius: 20px;
              overflow: hidden;
            `}>
            <Row>
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faPerson}
                    size={"2x"}
                    css={css`
                      color: var(--main-color-blue);
                      height: 30px;
                    `}
                  />
                }
                title="Ide??ln?? student"
                content={
                  <Typography.Paragraph>
                    Bav?? t?? hr??t hry, sledovat filmy, tr??vit ??as ??etbou na internetu a hledat nov?? informace. To v??e musel n??kdo vytvo??it. Jestli t?? l??k?? um??t
                    vytvo??it vlastn?? web, navrhnout stroj, napsat program, kter?? pom????e stovk??m lid??, pak jsi tady spr??vn??. Je to leh????, ne?? se zd??.
                  </Typography.Paragraph>
                }
              />
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faBus}
                    size={"2x"}
                    css={css`
                      height: 30px;
                    `}
                  />
                }
                title="Vybaven?? ke kurzu"
                content={
                  <Typography.Paragraph>
                    Chcete se p??ihl??sit ale m??te slab?? po????ta??, notebook nebo nem??te spr??vn?? vybaven??? Napi??te n??m a spolu s organizac??{" "}
                    <Link href="https://www.pocitacedetem.cz/">
                      <a title="web Po????ta??e d??tem" target="_blank">
                        Po????ta??e d??tem
                      </a>
                    </Link>{" "}
                    se v??m pokus??me pomoci. M????ete tak z??skat{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      po????ta?? zdarma
                    </span>
                    . Mrkn??te na n????{" "}
                    <Link href="/blog/aktuality/znalosti-it-pomohou-vasim-detem-ziskat-nadstandardne-placenou-praci">
                      <a title="??l??nek na na3em bolgu" target="_blank">
                        blog
                      </a>
                    </Link>
                    .
                  </Typography.Paragraph>
                }
              />
            </Row>
            <Row>
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faLaptopCode}
                    size={"2x"}
                    css={css`
                      color: var(--main-color-red);
                      height: 30px;
                    `}
                  />
                }
                title={
                  <>
                    P????stupn?? a{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      kreativn?? programov??n??
                    </span>{" "}
                    pro v??echny
                  </>
                }
                content={
                  <Typography.Paragraph>
                    Sv??j budouc?? ??ivot ovlivni ji?? dnes. Nau?? se programovat a p??iprav se tak na dobu, kdy stroje budou nahrazovat lidi. N??kdo v??e mus?? ????dit.
                    Bu?? tou osobou ty!
                  </Typography.Paragraph>
                }
              />
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faPython}
                    size={"2x"}
                    css={css`
                      color: var(--python-color);
                      height: 30px;
                    `}
                  />
                }
                title={
                  <>
                    Aktu??ln?? vyu??ujeme{" "}
                    {technologies.length > 0 && (
                      <>
                        {technologies.map((t, i) => (
                          <React.Fragment key={t.id}>
                            <span
                              css={css`
                                color: ${theme.colors[t.data.color]};
                              `}>
                              {t.data.name[0].text}
                            </span>
                            {i === technologies.length - 2 ? " a " : i === technologies.length - 1 ? "" : ", "}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                    .
                  </>
                }
                content={""}
              />
            </Row>
            <Row>
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faQuestion}
                    size={"2x"}
                    css={css`
                      color: var(--main-color-blue);
                      height: 30px;
                    `}
                  />
                }
                title={
                  <>
                    <span
                      css={css`
                        color: var(--main-color-blue);
                      `}>
                      Pro??
                    </span>{" "}
                    pr??v?? n??s?
                  </>
                }
                content={
                  <List>
                    <List.Item>U????me d??ti i dosp??l?? z??klady IT pou????t v praxi</List.Item>
                    <List.Item>Kvalitn?? a dostupn?? vzd??l??n?? pro v??echny</List.Item>
                    <List.Item>Krou??ky vedeme formou hry a z??bavy</List.Item>
                    <List.Item>Lekto??i jsou vyb??r??ni z ??ad student?? a pedagog?? vysok??ch technick??ch ??kol</List.Item>
                  </List>
                }
              />
              <ColoredBlock
                icon={
                  <FontAwesomeIcon
                    icon={faAward}
                    size={"2x"}
                    css={css`
                      color: var(--main-color-red);
                      height: 30px;
                    `}
                  />
                }
                title={
                  <>
                    Na??e{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      IT krou??ky!
                    </span>
                  </>
                }
                content={
                  <Typography.Paragraph>
                    Na??e krou??ky jsou koncipovan?? s ohledem na v??k uchaze??e. Jednodu??e, jasn?? a s praktick??mi p????klady vyu??it?? IT v b????n??m ??ivot??. N??zorn??
                    uk??zky pom??haj?? d??tem i dosp??l??m si l??pe p??edstavit, co v??e se jim pomoc?? programov??n?? v ??ivot?? otev??r??. Doporu??ujeme absolvov??n?? krou??k??
                    v??em, kte???? cht??j?? naj??t uplatn??n??, dobrou hodnotnou pr??ci a m??t lep???? budoucnost. Kurzy jsou tak?? skv??lou nadstavbou z??kladn??ho vzd??l??n??.
                    D??tem roz???????? obzory a dodaj?? mo??nosti do ??ivota, dosp??l??m poskytnou p????le??itost pro zm??nu.
                  </Typography.Paragraph>
                }
              />
            </Row>
          </Section>
          {technologyTools.length > 0 && (
            <Section>
              <Typography.Title level={2}>Pou????v??me modern?? technologie</Typography.Title>
              <TechnologyToolList technologyTools={technologyTools} />
            </Section>
          )}
          {homePageComments.length > 0 && (
            <Section>
              <Typography.Title level={2}>
                Reference <Link href="/recenze">a dal???? hodnocen??</Link>
              </Typography.Title>
              <Comments comments={homePageComments} colProps={{ lg: 12 }} />
            </Section>
          )}
          <Section>
            <Typography.Title level={2}>Odb??r novinek</Typography.Title>
            <SubscribeForm tags={["Krouzky"]} description="Chcete v??d??t o novink??ch nab??zen??ch krou??k???" />
          </Section>
          <Section>
            <Typography.Title level={2}>Partne??i</Typography.Title>
            <PartnersList />
          </Section>
          <Section>
            <Typography.Title level={2}>FAQ - ??asto kladen?? dotazy</Typography.Title>
            <CollapsedPanel items={faqList} />
          </Section>
        </Container>
      </Layout>
    </>
  )
}

export const ShowWhenDesktop = styled.div`
  ${md} {
    display: none;
  }
`

export const ShowWhenMobile = styled.div`
  display: none;

  ${md} {
    display: block;
  }
`

interface Props {
  openCourses: PrismicDocument<any>[]
  projectDaysCourses: PrismicDocument<any>[]
  preparingCourses: PrismicDocument<any>[]
  sampleCourses: PrismicDocument<any>[]
  workshopCourses: PrismicDocument<any>[]
  comments: PrismicDocument<any>[]
  technologies: PrismicDocument<any>[]
  postsResult: PrismicDocument<any>[]
  technologyTools: PrismicDocument<any>[]
  recommends: PrismicDocument<any>[]
  ongoingCourses: PrismicDocument<any>[]
  mappedBubbles: Bubble[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const courseList = await getCourseList({ registrationOpenFrom: `${moment("2022-03-01").format("YYYY-MM-DD")}T00:00:00+0000` })
  const comments = await getArticlesWithAuthorsByDocumentType(PrismicCustomTypes.feedback, undefined, false, { pageSize: 4 })
  const technologiesRes = await getTechnologyList().then((res) => res.results.sort((a, b) => a.data.name[0].text.localeCompare(b.data.name[0].text)))
  const technologyToolsRes = await getTechnologyToolList()

  const blogPosts = await getArticlesWithAuthorsByDocumentType(PrismicCustomTypes.blogPost)
  const postsResult = blogPosts.results.filter((d: PrismicDocument) => !d.data.highlighted).sort(sortDocumentByDateTime) as PrismicDocument[]
  const highlightedPostsResult = blogPosts.results.filter((d: PrismicDocument) => d.data.highlighted).sort(sortDocumentByDateTime) as PrismicDocument[]

  const openCourses = courseList.results.filter((d) => isCourseRegistrationOpen(d) && d.data.course_type === CourseVariant.course)
  const sampleCourses = courseList.results.filter((d) => isCourseRegistrationOpen(d) && d.data.course_type === CourseVariant.sampleCourse)
  const projectDaysCourses = courseList.results.filter((d) => isCourseRegistrationOpen(d) && d.data.course_type === CourseVariant.projectDays)
  const preparingCourses = courseList.results.filter((d) => isCourseRegistrationBefore(d))
  const workshopCourses = courseList.results.filter((d) => isCourseRegistrationOpen(d) && d.data.course_type === CourseVariant.workshop)

  const ongoingCourses = courseList.results.filter((d) => isOngoingCourse(d))

  const recommends = await getRecommends()

  const bubblesLandingPages = await getLandingPages(["bublina-index"])
  const mappedBubbles: Bubble[] = (bubblesLandingPages.results || []).map((d) => ({
    title: d.data?.title?.[0]?.text || "",
    text: d.data?.perex?.[0]?.text || "",
    link: slugifyLandingPage(d).slug
  }))

  return {
    props: {
      openCourses: openCourses || [],
      projectDaysCourses: projectDaysCourses || [],
      sampleCourses: sampleCourses || [],
      preparingCourses: preparingCourses || [],
      workshopCourses: workshopCourses || [],
      comments: comments.results.slice(0, 6) || [],
      technologies: technologiesRes || [],
      postsResult: [...(highlightedPostsResult.slice(0, 1) || []), ...(postsResult?.slice(0, 2) || [])],
      technologyTools: technologyToolsRes.results || [],
      recommends: recommends?.results || [],
      ongoingCourses: ongoingCourses || [],
      mappedBubbles
    },
    revalidate: dev ? 1 : 60
  }
}

export default Index
