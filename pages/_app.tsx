import React, { useEffect } from "react"
import type { AppProps } from "next/app"
import "../styles/antd.less"
import { globalStyles, theme } from "../styles/styles"
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"
import { useRouter } from "next/router"
import * as ga from "../lib/ga"
import dynamic from "next/dynamic"
import NextNprogress from "nextjs-progressbar"
import * as moment from "moment"
import "moment/locale/cs"
moment.locale("cs")
import { SessionProvider } from "next-auth/react"
import { Auth } from "../components/auth/Auth"
import { Loading } from "../components/Loading/Loading"

const CookiesNotificationWithNoSSR = dynamic(
  async () => {
    return await import("../components/CookiesNotification/CookieDialog")
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => <Loading />,
    ssr: false
  }
)

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url): void => {
      ga.pageView(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {globalStyles}
      <DefaultSeo {...SEO} />
      <CookiesNotificationWithNoSSR />
      <NextNprogress color={theme.colors["primary-color"]} startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />

      <SessionProvider session={session} refetchInterval={5 * 60}>
        {/* @ts-ignore */}
        {Component?.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  )
}

export default MyApp
