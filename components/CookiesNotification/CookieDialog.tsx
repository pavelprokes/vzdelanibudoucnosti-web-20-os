import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { Button, Col, Row, Space, Tooltip, Typography } from "antd"
import { theme } from "../../styles/styles"
import { darken, lighten } from "polished"
import { sm } from "../../styles/mediaQuery"
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent"
import { initGA, initGA4 } from "../../lib/ga-utils"
import { InfoCircleOutlined } from "@ant-design/icons"
import { event, pageView } from "../../lib/ga"
import { useRouter } from "next/router"

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

const CookieDialog = () => {
  const { asPath } = useRouter()
  const [cookiesSettingsVisible, setCookiesSettingsVisible] = useState(false)

  const handleAcceptCookie = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA4_ID) {
      initGA(process.env.NEXT_PUBLIC_GA_ID)
      initGA4(process.env.NEXT_PUBLIC_GA4_ID)

      pageView(asPath)
    }

    await timeout(2000)

    event({
      action: "accept",
      category: "cookies_dialog"
    })
  }, [asPath])

  const handleDeclineCookie = () => {
    Cookies.remove("_ga")
    Cookies.remove("_gat")
    Cookies.remove("_gid")
  }

  useEffect(() => {
    const isConsent = getCookieConsentValue()
    if (isConsent === "true") {
      handleAcceptCookie()
    }
  }, [handleAcceptCookie])

  return (
    <CookieDialogWrapper>
      {/* @ts-ignore */}
      <CookieConsent
        enableDeclineButton
        disableStyles={true}
        overlay={true}
        declineButtonText="Zamítnout vše"
        ariaDeclineLabel="Zamítnout vše"
        buttonText="Povolit vše"
        ariaAcceptLabel="Povolit vše"
        buttonClasses="ant-btn ant-btn-primary"
        declineButtonClasses="ant-btn"
        buttonWrapperClasses="btn-wrapper"
        containerClasses="cookies-dialog-wrapper"
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}>
        <Logo />
        <FirstRow>
          <Typography.Title level={2}>Záleží nám na vašem soukromí</Typography.Title>
        </FirstRow>
        <Typography.Paragraph>
          Kliknutím na tlačítko &quot;Povolit vše&quot; povolíte používání cookies, které usnadňují navigaci na našem webu, pomáhají nám analyzovat fungování a
          používání našeho webu.
        </Typography.Paragraph>

        <Buttons>
          <Button onClick={() => setCookiesSettingsVisible(!cookiesSettingsVisible)}>Spravovat</Button>
        </Buttons>

        {cookiesSettingsVisible && (
          <>
            <Typography.Title level={3}>Správa nastavení souhlasu</Typography.Title>

            <Space direction="vertical" style={{ width: "100%" }}>
              <Row>
                <Col span={8}>
                  Nezbytná cookies{" "}
                  <Tooltip
                    placement="bottom"
                    title="Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní základní funkce jako navigace stránky a přístup k zabezpečeným sekcím webové stránky. Webová stránka nemůže správně fungovat bez těchto cookies.">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Col>
                <Col span={14}>Vždy aktivní.</Col>
              </Row>
              <Row>
                <Col span={8}>
                  Statistické cookies{" "}
                  <Tooltip
                    placement="bottom"
                    title="Statistické cookies pomáhají majitelům webových stránek, aby porozuměli, jak návštěvníci používají webové stránky. Anonymně sbírají a sdělují informace.">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Col>
                <Col span={14}>Zapnuto nebo vypnuto kliknutím na &quot;Zamítnout vše&quot; nebo &quot;Povolit vše&quot;.</Col>
              </Row>
            </Space>
          </>
        )}
      </CookieConsent>
    </CookieDialogWrapper>
  )
}

const CookieDialogWrapper = styled.div`
  .cookies-dialog-wrapper {
    bottom: initial !important;
    display: flex;
    position: fixed;
    z-index: 999;
    width: 80vw;
    min-height: 20vh;
    padding: 40px;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .btn-wrapper {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;

      > * {
        margin-right: 10px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .ant-btn-primary {
      border-color: ${theme.colors["main-color-blue"]};
      background: ${theme.colors["main-color-blue"]};
    }

    .ant-btn-primary:hover,
    .ant-btn-primary:focus {
      color: #fff;
      border-color: ${lighten(0.1, theme.colors["main-color-blue"])};
      background: ${lighten(0.1, theme.colors["main-color-blue"])};
    }

    .ant-btn-primary:active {
      color: #fff;
      border-color: ${darken(0.1, theme.colors["main-color-blue"])};
      background: ${darken(0.1, theme.colors["main-color-blue"])};
    }
  }
`

const Buttons = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const FirstRow = styled.div``

const Logo = styled.div`
  background-image: url("/images/vzdelanibudoucnosti_2_black_text.svg");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 50px;
  width: 200px;
  display: block;
  margin-bottom: 20px;

  ${sm} {
    width: 125px;
    height: 35px;
    background-size: 125px 35px;
  }
`

export default CookieDialog
