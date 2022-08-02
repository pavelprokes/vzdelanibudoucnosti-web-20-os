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
        title={`IT kroužky pro děti a dospělé`}
        description={`Zábavné a dostupné IT kroužky pro kluky i holky. Stvoř si svůj vlastní svět a začni s IT i Ty!`}
        canonical={webUrl}
        openGraph={{
          url: webUrl,
          title: `IT kroužky pro děti a dospělé`,
          description: `Zábavné a dostupné IT kroužky pro kluky i holky. Stvoř si svůj vlastní svět a začni s IT i Ty!`,
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
                  Programování učím už několik let a pořád se nepřestávám divit, jak chápavé umí děti být a jak rychle může správně zvolená aktivita dítě
                  oslovit a nadchnout. Jen díky nadšení a opravdovému zájmu je možná cesta i ke složitějšímu IT, a právě tou my chceme s dětmi jít. Jestli
                  chcete poradit, co by bylo nejlepší zrovna pro vaše dítě, tak se nám ozvěte, moc rádi s vámi vše pobereme.
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
              <Typography.Title level={2}>Právě probíhá</Typography.Title>
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
              <Typography.Title level={2}>Otevřené registrace</Typography.Title>
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
              <Typography.Title level={2}>Doporučujeme</Typography.Title>
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
              <Typography.Title level={2}>Ukázkové lekce</Typography.Title>
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
              <Typography.Title level={2}>Projektové dny</Typography.Title>
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
              <Typography.Title level={2}>Připravujeme</Typography.Title>
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
                Aktuálně z našeho{" "}
                <Link href="/blog">
                  <a title="Přejít na blog">blogu</a>
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
                title="Ideální student"
                content={
                  <Typography.Paragraph>
                    Baví tě hrát hry, sledovat filmy, trávit čas četbou na internetu a hledat nové informace. To vše musel někdo vytvořit. Jestli tě láká umět
                    vytvořit vlastní web, navrhnout stroj, napsat program, který pomůže stovkám lidí, pak jsi tady správně. Je to lehčí, než se zdá.
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
                title="Vybavení ke kurzu"
                content={
                  <Typography.Paragraph>
                    Chcete se přihlásit ale máte slabý počítač, notebook nebo nemáte správné vybavení? Napište nám a spolu s organizací{" "}
                    <Link href="https://www.pocitacedetem.cz/">
                      <a title="web Počítače dětem" target="_blank">
                        Počítače dětem
                      </a>
                    </Link>{" "}
                    se vám pokusíme pomoci. Můžete tak získat{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      počítač zdarma
                    </span>
                    . Mrkněte na náš{" "}
                    <Link href="/blog/aktuality/znalosti-it-pomohou-vasim-detem-ziskat-nadstandardne-placenou-praci">
                      <a title="článek na na3em bolgu" target="_blank">
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
                    Přístupné a{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      kreativní programování
                    </span>{" "}
                    pro všechny
                  </>
                }
                content={
                  <Typography.Paragraph>
                    Svůj budoucí život ovlivni již dnes. Nauč se programovat a připrav se tak na dobu, kdy stroje budou nahrazovat lidi. Někdo vše musí řídit.
                    Buď tou osobou ty!
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
                    Aktuálně vyučujeme{" "}
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
                      Proč
                    </span>{" "}
                    právě nás?
                  </>
                }
                content={
                  <List>
                    <List.Item>Učíme děti i dospělé základy IT použít v praxi</List.Item>
                    <List.Item>Kvalitní a dostupné vzdělání pro všechny</List.Item>
                    <List.Item>Kroužky vedeme formou hry a zábavy</List.Item>
                    <List.Item>Lektoři jsou vybíráni z řad studentů a pedagogů vysokých technických škol</List.Item>
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
                    Naše{" "}
                    <span
                      css={css`
                        color: var(--main-color-red);
                      `}>
                      IT kroužky!
                    </span>
                  </>
                }
                content={
                  <Typography.Paragraph>
                    Naše kroužky jsou koncipované s ohledem na věk uchazeče. Jednoduše, jasně a s praktickými příklady využití IT v běžném životě. Názorné
                    ukázky pomáhají dětem i dospělým si lépe představit, co vše se jim pomocí programování v životě otevírá. Doporučujeme absolvování kroužků
                    všem, kteří chtějí najít uplatnění, dobrou hodnotnou práci a mít lepší budoucnost. Kurzy jsou také skvělou nadstavbou základního vzdělání.
                    Dětem rozšíří obzory a dodají možnosti do života, dospělým poskytnou příležitost pro změnu.
                  </Typography.Paragraph>
                }
              />
            </Row>
          </Section>
          {technologyTools.length > 0 && (
            <Section>
              <Typography.Title level={2}>Používáme moderní technologie</Typography.Title>
              <TechnologyToolList technologyTools={technologyTools} />
            </Section>
          )}
          {homePageComments.length > 0 && (
            <Section>
              <Typography.Title level={2}>
                Reference <Link href="/recenze">a další hodnocení</Link>
              </Typography.Title>
              <Comments comments={homePageComments} colProps={{ lg: 12 }} />
            </Section>
          )}
          <Section>
            <Typography.Title level={2}>Odběr novinek</Typography.Title>
            <SubscribeForm tags={["Krouzky"]} description="Chcete vědět o novinkách nabízených kroužků?" />
          </Section>
          <Section>
            <Typography.Title level={2}>Partneři</Typography.Title>
            <PartnersList />
          </Section>
          <Section>
            <Typography.Title level={2}>FAQ - často kladené dotazy</Typography.Title>
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
