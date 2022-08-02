import { NextApiRequest, NextApiResponse } from "next"
import { checkCourseCapacity } from "../../../lib/supabase/checkCourseCapacity"

module.exports = async ({ body: { courseSlug, capacity } }: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await checkCourseCapacity(courseSlug, capacity)
    if (apiRes instanceof Error) {
      res.status(500).send(apiRes.message)
      return
    }

    res.send(apiRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
