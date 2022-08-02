import { magicLinkEmailDefinition } from "./magicLinkEmailDefinition"
import { strippedString } from "../email/strippedString"
import { emailInlineHTML } from "../email/emailInlineHtml"
import { dev } from "../dev"
import { transporter } from "../email/transporter"
import Mail from "nodemailer/lib/mailer"

export const sendVerificationRequest = async ({ identifier: email, url }) => {
  const emailLetter = magicLinkEmailDefinition(url)

  const mailOptions: Mail.Options = {
    from: `Vzdělání budoucnosti z.s. <${process.env.AMAZON_AWS_SES_MAIN_EMAIL_USER}>`,
    to: email,
    subject: `Magic link to login`,
    text: strippedString(emailLetter),
    html: emailInlineHTML("Vzdělání budoucnosti, magický odkaz k přihlášení", "", emailLetter),
    attachments: [
      {
        filename: "vzdelanibudoucnosti-logo.png",
        path: `${dev ? "http://localhost:3003" : "https://vzdelanibudoucnosti.cz"}/images/vzdelanibudoucnosti_2_black_text.png`,
        cid: "vzdelanibudoucnosti-logo"
      }
    ]
  }

  await transporter.sendMail(mailOptions)
}
