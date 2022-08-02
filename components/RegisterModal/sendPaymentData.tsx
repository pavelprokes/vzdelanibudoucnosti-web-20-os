import { getWebSiteUrlFromWindow } from "../../lib/url/getWebSiteUrlFromWindow"
import { RegistrationTableWithPaymentStudentLegalRepre } from "../../lib/supabase/insertCourseRegistration"
import { account, bank, ibanAccount, PaymentData, qrImageUrl } from "../../config/payments"
import { emailInlineHTML, generateEmailCallToActionButton, generateEmailParagraph } from "../../lib/email/emailInlineHtml"
import moment from "moment"
import { registrationEmailUtmParameters } from "./sendRegisterEmail"
import { getFooterSocialsNetworks } from "../../lib/email/emailComponents"
import { SendEmail } from "../../lib/email/SendEmail"
import { strippedString } from "../../lib/email/strippedString"
import axios from "axios"
import { dev } from "../../lib/dev"

export const sendPaymentData = async (record: RegistrationTableWithPaymentStudentLegalRepre, onError?: (e: any) => void) => {
  const courseDetailPageUrl = `${getWebSiteUrlFromWindow()}/${record.course_slug}`
  const emailLetter = paymentDataEmail(record.course_slug, courseDetailPageUrl, record.created_at, {
    comment: record.payment.comment,
    variableNumber: record.payment.variable_number,
    amount: { value: record.payment.amount },
    account,
    ibanAccount,
    bank,
    coupon: undefined
  })

  const config: SendEmail = {
    emailList: record.legal_representative?.email ? [record.student.email, record.legal_representative.email] : [record.student.email],
    html: emailInlineHTML(`Platební údaje registrace, Vzdělání budoucnosti`, record.course_slug, emailLetter),
    text: strippedString(emailLetter),
    subject: "Platební údaje registrace, Vzdělání budoucnosti",
    attachments: [
      {
        filename: "vzdelanibudoucnosti-logo.png",
        path: `${dev ? "http://localhost:3003" : "https://vzdelanibudoucnosti.cz"}/images/vzdelanibudoucnosti_2_black_text.png`,
        cid: "vzdelanibudoucnosti-logo"
      }
    ]
  }

  return await axios
    .post("/api/email/send", config)
    .catch((err) => {
      console.error("sendRegisterEmail", err)
      onError && onError(err)
    })
    .then((res) => res)
}

const paymentDataEmail = (courseTitle: string, courseDetailPageUrl: string, createdAt: string, paymentData: PaymentData): string => {
  return `${generateEmailParagraph("Dobrý den, ")}${generateEmailParagraph(
    `posíláme vám platební údaje k registraci do kroužku (kurzu) <strong>${courseTitle}</strong>, která byla provedena dne ${moment(createdAt).format(
      "D. M. YYYY hh:mm"
    )}. O potvrzení platby Vás budeme informovat také emailem. Více informací o koužku naleznete na našich webových stránkách <a target="_blank" title="${courseDetailPageUrl}" href="${courseDetailPageUrl}${registrationEmailUtmParameters}">${courseDetailPageUrl}</a>.</p>`
  )}
${generateEmailParagraph(`<strong>Platební údaje:</strong><br/>
Banka: <strong>Fio banka</strong><br/>
Číslo účtu: <strong>${paymentData.account}/${paymentData.bank}</strong><br/>
Variabilní symbol: <strong>${paymentData.variableNumber}</strong><br/>
Částka: <strong>${paymentData.amount.value} Kč</strong><br/>
Poznámka: <strong>${paymentData.comment}</strong><br/>

(Pro platbu ze zahraničí použijte SEPA platbu na číslo účtu ve formátu IBAN: ${paymentData.ibanAccount})<br/>
<br/>Prosím, proveďte platbu do ${moment()
  .add(7, "days")
  .format("D. M. YYYY")} (7 kalendářních dnů), zároveň nejpozději v pátek, týden před začátkem kroužku (kurzu).`)}
  
${generateEmailParagraph(`Můžete použít rychlejší způsob. Platbu pomocí QR kódu:`)}
${generateEmailCallToActionButton(
  "Vygenerovat QR kód",
  "Vygenerovat QR kód",
  qrImageUrl(paymentData.variableNumber, paymentData.amount.value, undefined, paymentData.comment)
)}

${getFooterSocialsNetworks()}
`
}
