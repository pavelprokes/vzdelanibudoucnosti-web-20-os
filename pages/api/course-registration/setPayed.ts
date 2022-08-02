import { NextApiRequest, NextApiResponse } from "next"
import { setPayed } from "../../../lib/supabase/registrations/setPayed"

module.exports = async ({ body: { paymentId, is_payed } }: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await setPayed(paymentId, is_payed)

    res.send(apiRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
