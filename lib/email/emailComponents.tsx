import { generateEmailParagraph } from "./emailInlineHtml"

export const getFooterSocialsNetworks = (): string => `${generateEmailParagraph(
  ""
)}${generateEmailParagraph(`Naše sociální sítě <a href="https://www.facebook.com/vzdelanibudoucnosti" title="@vzdelanibudoucnosti" target="_blank">Facebook</a> a
 <a href="https://www.instagram.com/vzdelanibudoucnosti/" title="Instagram vzdelanibudoucnosti" target="_blank">Instagram</a> nebo
 <a href="https://www.youtube.com/channel/UC8JcFoMjLC1QDA3-y8V6rUg" title="náš Youtube kanál" target="_blank">náš Youtube kanál</a>, kde budete moci nahlédnout do zákulisí a dozvědět se více!`)}
${generateEmailParagraph(`Děkujeme
  <br/>
  <a href="https://vzdelanibudoucnosti.cz" title="Vzdělání budoucnosti" target="_blank">Vzdělání budoucnosti</a> team
  <br/>
  <a href="mailto:info@vzdelanibudoucnosti.cz" title="email Vzdělání budoucnosti" target="_blank">info@vzdelanibudoucnosti.cz</a>`)}
`
