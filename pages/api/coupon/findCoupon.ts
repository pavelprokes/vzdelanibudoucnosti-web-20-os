import findCoupon from "../../../lib/prismic/findCoupon"

export default async function findCouponApi(req, res) {
  try {
    const coupon = req.body.coupon
    const couponRes = await findCoupon(coupon)
    if (couponRes instanceof Error) {
      res.status(500).send(couponRes.message)
      return
    }

    res.send(couponRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
