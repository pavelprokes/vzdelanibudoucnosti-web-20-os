import { generateEmailCallToActionButton, generateEmailParagraph } from "../email/emailInlineHtml"

export const magicLinkEmailDefinition = (url: string): string => `
${generateEmailParagraph(`Dobrý den, `)}${generateEmailParagraph(
  `k vašemu přihlášení do <a href="https://vzdelanibudoucnosti.cz/?utm_source=registration_email&utm_medium=email&utm_campaign=registration_email" title="Vzdělání budoucnosti" target="_blank">Vzdělání budoucnosti</a> vám posíláme magický odkaz.`
)}
${generateEmailCallToActionButton("Přihlásit se pomocí magického odkazu", "🪄 Přihlásit se", url)}
${generateEmailParagraph(`Tento odkaz platí pro jedno přihlášení. Odkáže vás na stránku vzdelanibudoucnosti.cz, kde budete přihlášen(a).`)}
${generateEmailParagraph(``)}
${generateEmailParagraph(`Sleduj naše sociální sítě <a href="https://www.facebook.com/vzdelanibudoucnosti" title="@vzdelanibudoucnosti" target="_blank">Facebook</a> a
 <a href="https://www.instagram.com/nerdi_budoucnosti/" title="Instagram nerdi_budoucnosti" target="_blank">Instagram nerdi_budoucnosti</a> nebo
 <a href="https://www.youtube.com/channel/UCo_bRS8x2_oYv78lEj52lUw" title="náš Youtube kanál Nerdi budoucnosti" target="_blank">náš Youtube kanál Nerdi budoucnosti</a>, kde budeš moci nahlédnout do zákulisí hry a dozvědět se více!
 <br/>
`)}
${generateEmailParagraph(`Děkujeme
  <a href="https://vzdelanibudoucnosti.cz/?utm_source=pythongo_registration_email&utm_medium=email&utm_campaign=pythongo" title="Vzdělání budoucnosti" target="_blank">Vzdělání budoucnosti</a> team
  <br/>
  <a href="mailto:info@vzdelanibudoucnosti.cz" title="email Vzdělání budoucnosti" target="_blank">info@vzdelanibudoucnosti.cz</a>
  <br/>
`)}
${generateEmailParagraph(`
Baví tě programovat v Pythonu? Chceš se naučit víc?<br/>
Máme pro tebe spoustu IT kroužků, ze kterých si můžeš vybrat – ať už se chceš pustit do programovacího jazyka Python nebo třeba do Neuronových sítí a 3D tisku!<br/>
Další info: <a href="https://vzdelanibudoucnosti.cz/?utm_source=pythongo_registration_email&utm_medium=email&utm_campaign=pythongo" title="Vzdělání budoucnosti" target="_blank">https://vzdelanibudoucnosti.cz</a>
`)}`
