import React from "react"
import { Layout } from "../components/Layout/Layout"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { NextSeo } from "next-seo"
import { webUrl } from "../config/web"
import { H2 } from "../components/blog/common"
import { ContactForm } from "../components/ContactForm/ContactForm"
import { Section } from "../components/Section"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getArticlesWithAuthorsByDocumentType, PrismicCustomTypes } from "../lib/prismic/prosmic"
import { dev } from "../lib/dev"
import { PrismicDocument } from "@prismicio/types"
import { getFeedbackAvatarUrl } from "../lib/prismic/courses"
import { Comments } from "../components/Comments/Comments"

const Recenze = ({ feedbacks }: Props) => {
  const title = "Recenze"
  const description = ""

  const mappedComments = feedbacks.map((d, i) => ({
    avatarImagePath: d.data.image?.url || getFeedbackAvatarUrl(d.data.sex, i),
    photoPath: d.data.photo?.url,
    author: d.data.name?.[0] ? d.data.name?.[0]?.text : "",
    content: d.data.description?.[0] ? d.data.description?.[0]?.text : "",
    dateTime: d.data.forcedFirstPublicationDate || d.first_publication_date
  }))

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${webUrl}/recenze`}
        openGraph={{
          url: `${webUrl}/recenze`,
          title,
          description,
          images: [
            {
              url: `${webUrl}/images/header_laptop.jpg`,
              width: 1920,
              height: 1080,
              alt: "header_laptop"
            }
          ]
        }}
      />

      <Layout>
        <SinglePage title="Recenze">
          <Section>
            <H2>Recenze</H2>
            <Comments comments={mappedComments} />
          </Section>

          <Section>
            <H2>Kontaktní formulář</H2>
            <ContactForm contactFormName={"Kontakt"} contactFormUrl={`${webUrl}/recenze`} />
          </Section>
        </SinglePage>
      </Layout>
    </>
  )
}

interface Props {
  feedbacks: PrismicDocument<any>[]
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const comments = await getArticlesWithAuthorsByDocumentType(PrismicCustomTypes.feedback, undefined, false, { pageSize: 20 })

  return {
    props: {
      feedbacks: comments?.results || []
    },
    revalidate: dev ? 1 : 60
  }
}

export default Recenze
