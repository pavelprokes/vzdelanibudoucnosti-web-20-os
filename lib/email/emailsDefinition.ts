import { PaymentData, qrImageUrl } from "../../config/payments"
import { registrationEmailUtmParameters } from "../../components/RegisterModal/sendRegisterEmail"
import { generateEmailCallToActionButton, generateEmailParagraph } from "./emailInlineHtml"
import { getFooterSocialsNetworks } from "./emailComponents"
import moment from "moment"
import "moment/locale/cs"
moment.locale("cs")

export const registerEmail = (
  courseTitle: string,
  courseDetailPageUrl: string,
  capacity: number,
  equipmentBuyFromOrganization: boolean,
  paymentData: PaymentData
): string => {
  return `${generateEmailParagraph("Dobrý den, ")}${generateEmailParagraph(
    `děkujeme za registraci do kroužku (kurzu) <strong>${courseTitle}</strong> ze dne ${moment().format("D. M. YYYY hh:mm")}.`
  )}
${generateEmailParagraph(
  `Nyní Vás prosíme o zaplacení příslušného poplatku. O potvrzení platby Vás budeme informovat také emailem. Více informací o koužku naleznete na našich webových stránkách <a target="_blank" title="${courseDetailPageUrl}" href="${courseDetailPageUrl}${registrationEmailUtmParameters}">${courseDetailPageUrl}</a>.</p>`
)}  
${generateEmailParagraph(`<strong>Platební údaje:</strong><br/>
Banka: <strong>Fio banka</strong><br/>
Číslo účtu: <strong>${paymentData.account}/${paymentData.bank}</strong><br/>
Variabilní symbol: <strong>${paymentData.variableNumber}</strong><br/>
Částka: <strong>${paymentData.amount?.discount > 0 ? `aplikována sleva kuponu ${paymentData.coupon.code}` : ""}
${equipmentBuyFromOrganization ? ` + vybavení = ` : ""}${paymentData.amount.value} Kč</strong><br/>
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

export const registerEmailForProjectDays = (courseTitle: string, courseDetailPageUrl: string): string => `
<p>Dobrý den,
<br/>
děkujeme za registraci do ${courseTitle}. K účasti na projektovém dni budeš potřebovat pouze účet od Googlu (založený e-mail s doménou gmail.com, např. jana@gmail.com), který bude potřeba pro přístup do bezplatného online programovacího prostředí Colab. Pokud tedy ještě nemáš účet od Googlu, tak je třeba si ho do té doby založit.
<br/>
Projektový den se bude konat online. Na tuto e-mailovou adresu zašleme URL link skrze který se budeš moci připojit k pořádané akci.
<br/>
Více informací o daném projektovém dni nalezneš na našich webových stránkách <a target="_blank" title="${courseDetailPageUrl}" href="${courseDetailPageUrl}${registrationEmailUtmParameters}">${courseDetailPageUrl}</a>.</p>
<br/>

<p>
Naše sociální sítě <a href="https://www.facebook.com/vzdelanibudoucnosti" title="@vzdelanibudoucnosti" target="_blank">Facebook</a> a
 <a href="https://www.instagram.com/vzdelanibudoucnosti/" title="Instagram vzdelanibudoucnosti" target="_blank">Instagram</a> nebo
 <a href="https://www.youtube.com/channel/UC8JcFoMjLC1QDA3-y8V6rUg" title="náš Youtube kanál" target="_blank">náš Youtube kanál</a>, kde budeš moci nahlédnout do zákulisí hry a dozvědět se více!
</p>
<p>Těšíme se na Tebe!
  <br/>
  <a href="https://vzdelanibudoucnosti.cz" title="Vzdělání budoucnosti" target="_blank">Vzdělání budoucnosti</a> team
  <br/>
  <a href="mailto:info@vzdelanibudoucnosti.cz" title="email Vzdělání budoucnosti" target="_blank">info@vzdelanibudoucnosti.cz</a>
</p>
`

export const registerEmailForSampleCourse = (courseTitle: string, courseDetailPageUrl: string): string => {
  return `${generateEmailParagraph("Dobrý den, ")}${generateEmailParagraph(
    `děkujeme za registraci do <strong>${courseTitle}</strong> ze dne ${moment().format(
      "D. M. YYYY hh:mm"
    )}. Těší nás, že se i ty zajímáš o to, jak vypadá Vzdělání budoucnosti.</p>`
  )}
  ${generateEmailParagraph("")}
  ${generateEmailParagraph(
    `Ukázková lekce se bude konat online a využívat budeme platformu Zoom. Návod na používání Zoomu najdeš <a target="_blank" title="videokonference Zoom návod" href="https://vzdelanibudoucnosti.cz/blog/aktuality/videokonference-zoom--navod/${registrationEmailUtmParameters}">zde</a>. Budeme tě včas informovat.`
  )}
  ${generateEmailParagraph("")}
  ${generateEmailParagraph(
    `Více informací o dané ukázkové lekci nalezneš na našich webových stránkách <a target="_blank" title="${courseDetailPageUrl}" href="${courseDetailPageUrl}${registrationEmailUtmParameters}">${courseDetailPageUrl}</a>`
  )}
  ${getFooterSocialsNetworks()}`
}

export const contactEmail = (email: string, message: string, contactFormName: string, contactFormUrl: string): string => {
  return `${generateEmailParagraph("Dobrý den, ")}${generateEmailParagraph(
    `<strong>${email}</strong> vám posílá z kontaktního formuláře <a href="${contactFormUrl}?utm_source=email&utm_medium=contact_form" title="Otevřít stránku ${contactFormName}" target="_blank">${contactFormName}<a/> webových stránek <a href="https://vzdelanibudoucnosti.cz?utm_source=email&utm_medium=contact_form" title="Otevřít stránku" target="_blank">https://vzdelanibudoucnosti.cz</a> zprávu.`
  )}
${generateEmailParagraph(`<br/>`)}
${generateEmailParagraph(`Odesílatel: ${email}`)}
${generateEmailParagraph(`Zpráva:`)}
${generateEmailParagraph(message)}
${generateEmailParagraph(`<br/>`)}

${generateEmailParagraph(`Děkujeme
  <br/>
  <a href="https://vzdelanibudoucnosti.cz" title="Vzdělání budoucnosti" target="_blank">Vzdělání budoucnosti</a> team
  <br/>
  <a href="mailto:info@vzdelanibudoucnosti.cz" title="email Vzdělání budoucnosti" target="_blank">info@vzdelanibudoucnosti.cz</a>`)}
`
}
