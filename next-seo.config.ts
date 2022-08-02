import { NextSeoProps } from "next-seo"
import { webUrl } from "./config/web"

export const secondTitle = "IT kroužky programování pro děti a dospělé"
export const fbAppId = "2292387061015118"
export const fbPageId = "312874116024015"

const defaultSeo: NextSeoProps = {
  titleTemplate: `%s | ${secondTitle} | Vzdělání budoucnosti`,
  canonical: webUrl,
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    site_name: "Vzdělání budoucnosti"
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image"
  },
  facebook: {
    appId: fbAppId
  }
}

export default defaultSeo
