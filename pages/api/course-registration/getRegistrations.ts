import { NextApiRequest, NextApiResponse } from "next"
import { getRegistrations } from "../../../lib/supabase/registrations/getRegistrations"
import { getSession } from "next-auth/react"

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  try {
    if (session) {
      const apiRes = await getRegistrations()

      res.send(apiRes)
    } else {
      res.status(401)
    }

    res.end()
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
