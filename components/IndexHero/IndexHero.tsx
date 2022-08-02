import React from "react"
import { ContentAboveContent, ContentAboveWrapper, whiteText } from "../Layout/common"
import { H1, Paragraph } from "../blog/common"
import { css } from "@emotion/react"
import { md, sm } from "../../styles/mediaQuery"
import Link from "next/link"
import { Button } from "antd"
import FullWidthImage from "../Layout/FullWidthImage"
import styled from "@emotion/styled"
import { theme } from "../../styles/styles"

export const IndexHero = ({ children }: Props) => {
  return (
    <>
      <ContentAboveWrapper>
        <ContentAboveContentHero>
          <Half>
            <H1 className="ml11" style={whiteText}>
              IT kroužky pro děti a dospělé, které mají smysl
            </H1>
            <Paragraph
              style={whiteText}
              css={css`
                ${sm} {
                  font-size: 16px;
                }
              `}>
              Bez IT se již dnes v životě neobejdeš. S programováním se staneš tvůrcem světa, proto začni hned teď!
            </Paragraph>
            <Link href="/krouzky-pro-deti">
              <a title="Přejít na nabídku kroužků">
                <Button
                  type="primary"
                  size="large"
                  css={css`
                    margin-top: 20px;
                  `}>
                  Přejít na nabídku kroužků
                </Button>
              </a>
            </Link>
          </Half>

          {children ? children : null}
        </ContentAboveContentHero>
      </ContentAboveWrapper>

      <FullWidthImage imageBgUrl="/images/01_2022_vzdelani_budoucnosti_web_header_1920_1.jpg" height="85vh" />
    </>
  )
}

interface Props {
  children?: React.ReactNode
}

const ContentAboveContentHero = styled(ContentAboveContent)`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: center;
  margin-top: -40px;

  ${md} {
    flex-direction: column;
    gap: 20px;
    margin-top: -20px;
  }
`

const Half = styled.div``

export const BlockHalf = styled(Half)`
  width: 40vw;

  .ant-space-item {
    width: 100%;
  }

  ${md} {
    width: 100%;
  }
`

export const HeroTextBlock = styled.div`
  color: black;
  font-size: 12px;
  border-radius: 20px;
  background-color: white;
  padding: 16px;
  position: relative;
  cursor: pointer;
  transition: ${theme.effects.transition.default};

  .ant-typography.ant-typography-ellipsis {
    color: ${theme.colors["main-color-red"]};

    & * {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  &:hover {
    background-color: ${theme.colors["main-color-blue"]};

    .ant-typography {
      color: white;

      span {
        color: white;
      }
    }
  }

  @media (max-height: 600px) {
    padding: 10px;
  }
`
