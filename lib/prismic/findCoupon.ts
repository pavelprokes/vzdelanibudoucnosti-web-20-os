import { defaultLang, PrismicClient, PrismicCustomTypes } from "./prosmic"
import * as Prismic from "@prismicio/client"
import moment from "moment"

const findCoupon = async (code: string, lang = defaultLang) => {
  try {
    if (!code || code === "") {
      return
    }

    const couponRes = await PrismicClient.get({
      predicates: [Prismic.predicate.at("document.type", PrismicCustomTypes.coupon), Prismic.predicate.at("my.coupon.code", code)],
      pageSize: 100,
      lang
    })

    return filterValid(couponRes)
  } catch (e) {
    throw new Error(`Error when getting coupon detail.`)
  }
}

export default findCoupon

const filterValid = (res: any) => res.results.filter((r) => moment().isSameOrAfter(moment(r.data.validfrom)) && moment().isSameOrBefore(moment(r.data.validto)))
