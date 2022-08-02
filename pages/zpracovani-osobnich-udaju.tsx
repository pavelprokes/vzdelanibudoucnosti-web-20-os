import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const Index = () => {
  return (
    <Layout>
      <SinglePage title="Zpracování osobních údajů">
        <Section>
          <Typography.Paragraph>
            Zaškrtnutím políčka &rdquo;Souhlasím se zpracováním osobních údajů&rdquo; udělujete v souladu s článkem 6 odst. 1 písm. a) nařízení Evropského
            parlamentu a Rady (EU) č. 2016/679 (dále jen „GDPR“) spolku Vzdělání budoucnosti, z.s., se sídlem Donská 245/14, Vršovice, 101 00 Praha 10, Česká
            republika, IČO: 08334463 (dále jen „Správce“) souhlas se zpracováním svých osobních údajů a případně též osobních údajů dítěte, jehož jste zákonným
            zástupcem, a to v nejvýše v rozsahu následujících osobních údajů:
          </Typography.Paragraph>
          <ul>
            <li>jméno a příjmení;</li>
            <li>e-mailová adresa;</li>
            <li>telefonní číslo; a</li>
            <li>údaje o škole a ročníku studia dítěte,</li>
          </ul>
          <Typography.Paragraph>(dále jen „Osobní údaje“).</Typography.Paragraph>
          <Typography.Paragraph>
            Osobní údaje budou Správcem zpracovávány za účelem poskytování služeb Správce a marketingových a obchodních aktivit Správce, včetně šíření
            obchodních sdělení týkajících se jeho výrobků či služeb, a to po dobu nezbytně nutnou, nejdéle však po dobu 4 let ode dne udělení souhlasu s jejich
            zpracováním. Právním základem pro zpracování Osobních údajů je tento souhlas.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Udělením tohoto souhlasu se zpracováním osobních údajů stvrzujete, že tento souhlas byl udělen svobodně, informovaně a berete na vědomí, že tento
            souhlas může být kdykoliv odvolán. Odvolání souhlasu musí být učiněno v písemné formě a zasláno Správci na adresu Donská 245/14, Vršovice, 101 00
            Praha 10, Česká republika nebo pomocí kontaktního formuláře.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Udělením souhlasu zároveň prohlašujete, že jste se poučil/a o svých právech vyplývajících z GDPR, a to zejména o tom, že po celou dobu zpracovávání
            Osobních údajů máte k Osobním údajům přístup, v případě pochybností o jejich správnosti či úplnosti máte právo na vysvětlení či jejich opravu a dále
            máte právo požadovat po Správci výmaz Osobních údajů a právo podat stížnost u Úřadu pro ochranu osobních údajů.
          </Typography.Paragraph>
          <Typography.Paragraph>
            V souvislosti s otázkami týkajícími se zpracování Osobních údajů a uplatňování práv na ochranu údajů můžete kontaktovat zodpovědnou osobu Správce:
            vaclav@vzdelanibudoucnosti.cz.
          </Typography.Paragraph>
        </Section>
      </SinglePage>
    </Layout>
  )
}

export default Index
