import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const Index = () => {
  return (
    <Layout>
      <SinglePage title="Zpracování osobních údajů - kroužky pro děti">
        <Section>
          <Typography.Paragraph>
            Zaškrtnutím políčka „Souhlas se zpracováním osobních údajů – kroužky pro děti“ udělujete v souladu s článkem 6 odst. 1 písm. a) nařízení Evropského
            parlamentu a Rady (EU) č. 2016/679 (dále jen „GDPR“) spolku Vzdělání budoucnosti, z.s., se sídlem Donská 245/14, Vršovice, 101 00 Praha 10, Česká
            republika, IČO: 08334463 (dále jen „Správce“) souhlas s vyhotovením a zveřejněním videozáznamů, fotozáznamů a video nahrávek z akcí a kurzů (dále
            jen „Osobní údaje“), které budete navštěvovat vy, nebo dítě, které přihlašujete a jehož jste zákonným zástupcem a udělujete Správci souhlas se
            zpracováním Osobních údajů.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Osobní údaje budou Správcem zpracovány a zveřejněny za účelem propagace činnosti Správce, a to po dobu trvání propagace, nejdéle však po dobu 4 let
            ode dne udělení souhlasu s jejich zpracováním. Právním základem pro zpracování Osobních údajů je tento souhlas.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Udělením tohoto souhlasu se zpracováním osobních údajů stvrzujete, že tento souhlas byl udělen svobodně, informovaně a berete na vědomí, že tento
            souhlas může být kdykoliv odvolán. Odvolání souhlasu musí být učiněno v písemné formě a zasláno Správci na adresu Donská 245/14, Vršovice, 101 00
            Praha 10, Česká republika nebo pomocí kontaktního formuláře.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Udělením souhlasu zároveň prohlašujete, že jste se poučil/a o právech vyplývajících z GDPR, a to zejména o tom, že po celou dobu zpracovávání
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
