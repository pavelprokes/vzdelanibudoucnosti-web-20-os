import { NextApiRequest, NextApiResponse } from "next"
import { setCancelled } from "../../../lib/supabase/registrations/setCancelled"

module.exports = async ({ body: { registrationId, cancel_reason } }: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await setCancelled(registrationId, cancel_reason)

    res.send(apiRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
