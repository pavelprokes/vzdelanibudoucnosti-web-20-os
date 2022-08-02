import { NextApiRequest, NextApiResponse } from "next"
import { setReminder } from "../../../lib/supabase/registrations/setReminder"

module.exports = async ({ body: { paymentId } }: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await setReminder(paymentId)

    res.send(apiRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
