import axios, { AxiosError, AxiosResponse } from "axios"
import { NowRequest, NowResponse } from "@vercel/node"

const dev = process.env.NODE_ENV !== "production"

module.exports = async ({ body }: NowRequest, res: NowResponse) => {
  if (!body && !body.email && !body.tags) {
    throw new Error("Empty body, email or tags.")
  }
  const { email, tags } = body

  await axios(`${process.env.MAILCHIMP_API_URL}/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    method: "post",
    auth: {
      username: process.env.MAILCHIMP_USERNAME,
      password: process.env.MAILCHIMP_PASSWORD
    },
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: {
      email_address: email,
      status: "subscribed",
      tags: tags
    }
  })
    .then((data: AxiosResponse) => {
      res.status(200).send({ data: data.data, message: data.statusText })
    })
    .catch((err: AxiosError) => {
      if (!err || !err.response) {
        res.status(500)
        return
      }

      dev && console.error(err)
      res.status(err.response.data.status).send(err.response.data.title)
    })
}
