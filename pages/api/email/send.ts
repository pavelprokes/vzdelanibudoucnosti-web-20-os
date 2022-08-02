import { NextApiRequest, NextApiResponse } from "next"
import Mail from "nodemailer/lib/mailer"
import { transporter } from "../../../lib/email/transporter"

module.exports = async ({ body: { emailList, replyTo, ccEmailList, subject, text, html, attachments } }: NextApiRequest, res: NextApiResponse) => {
  const promise = new Promise((resolve, reject) => {
    try {
      if (!emailList || !subject || !text || !html) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject("empty or wrong input data")
      }

      const mailOptions: Mail.Options = {
        from: `Vzdělání budoucnosti z.s. <${process.env.AMAZON_AWS_SES_MAIN_EMAIL_USER}>`,
        to: emailList.join(", "),
        ...(ccEmailList?.length > 0 && { cc: ccEmailList.join(", ") }),
        replyTo,
        subject,
        text,
        html,
        attachments
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error)
        }

        resolve(info.response)
      })
    } catch (e) {
      res.status(500).send(e)
    }
  })

  const done = await promise
  res.send(done)
}
