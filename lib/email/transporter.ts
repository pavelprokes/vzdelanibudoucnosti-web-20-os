import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.AMAZON_AWS_SES_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.AMAZON_AWS_SES_SMTP_USER,
    pass: process.env.AMAZON_AWS_SES_SMTP_PASS
  }
})
