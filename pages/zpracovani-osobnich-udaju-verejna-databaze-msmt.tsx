import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const Index = () => {
  return (
    <Layout>
      <SinglePage title="Zpracování osobních údajů - veřejná databáze MŠMT">
        <Section>
          <Typography.Paragraph>
            Zaškrtnutím tlačítka &quot;Souhlasím se zpracováním osobních údajů&quot; uděluji dobrovolně souhlas se zpracováním svých osobních údajů ve smyslu
            zákona č. 101/2000 Sb., o ochraně osobních údajů (v platném znění) společnosti Vzdělání budoucnosti, z.s., Donská 245/14, Vršovice, 101 00 Praha 10,
            Česká republika (dále jen správce) a to:
          </Typography.Paragraph>
          <ul>
            <li>a) V rozsahu jméno a příjmení, kraj aktuálně navštěvované školy, aktuálně navštěvovaná škola, ročník žáka; e-mailová adresa nebo méně</li>
            <li>b) Za účelem účasti na akci a vyhodnocení akce.</li>
            <li>c) Po dobu nezbytně nutnou, maximálně však 4 roky ode dne přihlášení.</li>
            <li>
              d) Jsem si vědom/a toho, že tento souhlas s uchováváním, resp. se zpracováním údajů, udělený v souladu se zákonem o ochraně osobních údajů a
              zákonem o některých službách informační společnosti, je dobrovolný, a že tento svůj souhlas mohu kdykoliv odvolat. Odvolání souhlasu musí být vůči
              společnosti Vzdělání budoucnosti, z.s. učiněno písemně na adresu Vzdělání budoucnosti, z.s., Donská 245/14, Vršovice, 101 00 Praha 10, Česká
              republika, nebo písemně na e-mailovou adresu info@vzdelanibudoucnosti.cz.
            </li>
            <li>e) Prohlašuji, že všechny mnou uvedené údaje jsou pravdivé a úplné.</li>
            <li>
              f) Po celou dobu zpracovávání osobních údajů máte k nim přístup, v případě pochybností o jejich správnosti či úplnosti, máte právo na vysvětlení
              či jejich opravu.
            </li>
            <li>
              g) Své osobní údaje poskytujete ke zpracování správcem údajů a k jejich dalšímu nakládání s nimi uvedeném v tomto souhlasu dobrovolně, nicméně
              jsou nezbytnou součástí pro účast na akci s níž je tento souhlas spojený v registračním formuláři akce.
            </li>
          </ul>
        </Section>
      </SinglePage>
    </Layout>
  )
}

export default Index
