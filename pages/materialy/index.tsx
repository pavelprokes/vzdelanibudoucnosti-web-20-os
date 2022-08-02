import React from "react"
import { GetServerSideProps } from "next"
import { getSession, signIn, useSession } from "next-auth/react"
import { Session } from "next-auth"
import { CollectionLayout } from "../../components/Collection/CollectionLayout"
import { H1, Paragraph } from "../../components/blog/common"
import { whiteText } from "../../components/Layout/common"
import { Button, Col, Row, Typography } from "antd"
import { getCollectionGroups, PrismicDocumentCollectionGroup } from "../../lib/prismic/collection/getCollectionGroups"
import { CollectionGroupItem } from "../../components/Collection/CollectionGroupItem"
import Container from "../../components/Layout/Container"
import { Section } from "../../components/Section"
import { Query } from "@prismicio/types"
import { getCollectionItems, PrismicDocumentCollectionItem } from "../../lib/prismic/collection/getCollectionItems"
import { CollectionItem } from "../../components/Collection/CollectionItem"
import { css } from "@emotion/react"
import { sm } from "../../styles/mediaQuery"

const Materials = ({ subCollectionGroups, topCollectionGroups, lastSixCollectionItems }: Props) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <CollectionLayout
        contentAbove={
          <>
            <H1 className="ml11" style={whiteText}>
              Přihlaš se dostaň se ke stovkám naučným videím a materiálům.
            </H1>

            <Paragraph
              style={whiteText}
              css={css`
                ${sm} {
                  font-size: 16px;
                }
              `}>
              Zdarma několik naučných videií, tutoriálů a pomůcek. Přihlášení je opravdu jednoduché.
            </Paragraph>

            <Button
              type="primary"
              size="large"
              onClick={() => signIn()}
              css={css`
                margin-top: 20px;
              `}>
              Přihlásit se
            </Button>
          </>
        }>
        {""}
      </CollectionLayout>
    )
  }

  return (
    <CollectionLayout
      contentAbove={
        <H1
          className="ml11"
          style={whiteText}
          css={css`
            margin-top: -10vh;
          `}>
          Ahoj{" "}
          <Typography.Text code style={whiteText}>
            {session.user.name || session.user.email}
          </Typography.Text>
          !
        </H1>
      }>
      <Container>
        <Section>
          {topCollectionGroups?.total_results_size > 0 ? (
            <>
              <Typography.Title level={2} style={whiteText}>
                Top kategorie
              </Typography.Title>
              <Row gutter={20}>
                {topCollectionGroups.results.map((d) => (
                  <Col key={d.id} span={24 / 4}>
                    <CollectionGroupItem d={d} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div>Teprve pro tebe vse chystame.</div>
          )}

          {subCollectionGroups?.total_results_size > 0 && (
            <>
              <Typography.Title level={2}>Podkategorie</Typography.Title>
              <Row gutter={20}>
                {subCollectionGroups.results.map((d) => (
                  <Col key={d.id} span={24 / 4}>
                    <CollectionGroupItem d={d} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {lastSixCollectionItems?.total_results_size > 0 && (
            <>
              <Typography.Title level={2}>Nové</Typography.Title>
              <Row gutter={20}>
                {lastSixCollectionItems.results.map((d) => (
                  <Col key={d.id} span={24 / 4}>
                    <CollectionItem d={d} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Section>
      </Container>
    </CollectionLayout>
  )
}

interface Props {
  session: Session
  subCollectionGroups?: Query<PrismicDocumentCollectionGroup>
  topCollectionGroups?: Query<PrismicDocumentCollectionGroup>
  lastSixCollectionItems?: Query<PrismicDocumentCollectionItem>
}

export default Materials

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getSession(context)
  if (session) {
    const topCollectionGroups = await getCollectionGroups(false)
    const subCollectionGroups = await getCollectionGroups(true)
    const lastSixCollectionItems = await getCollectionItems(4)

    return {
      props: {
        session,
        subCollectionGroups: subCollectionGroups || null,
        topCollectionGroups: topCollectionGroups || null,
        lastSixCollectionItems: lastSixCollectionItems || null
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
