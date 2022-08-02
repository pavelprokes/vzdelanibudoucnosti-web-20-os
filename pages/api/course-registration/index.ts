import { InsertCourseRegistration, insertCourseRegistration } from "../../../lib/supabase/insertCourseRegistration"
import { DuplicateError } from "../../../lib/supabase/NotFoundError"

export default async function courseRegistration({ body: { registration, course, paymentData } }, res) {
  try {
    const data = { registration, course, paymentData } as InsertCourseRegistration

    const apiRes = await insertCourseRegistration(data)
    if (apiRes instanceof DuplicateError) {
      res.status(500).send(apiRes.message)
      return
    }

    res.send(apiRes)
  } catch (e) {
    console.error(e)

    res.status(500).send(e)
  }
}
