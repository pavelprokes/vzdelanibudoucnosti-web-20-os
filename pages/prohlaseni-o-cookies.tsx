import React from "react"
import { Typography } from "antd"
import { SinglePage } from "../components/SinglePage/SinglePage"
import { Layout } from "../components/Layout/Layout"
import { Section } from "../components/Section"

const Index = () => {
  return (
    <Layout>
      <SinglePage title="Prohlášení o použití cookies">
        <Section>
          <Typography.Text>
            Co jsou cookies?
            <br />
            Jde o malé datové soubory, které jsou nezbytné pro některé funkce webových stránek, jako je třeba přihlašování. Díky cookies si stránky mohou také
            zapamatovat různé nastavení, jako je jazyk, font a další možnosti, které jste si pro zobrazení stránek sami zvolili. To je důvod, proč cookies
            umísťujeme na váš počítač. Totéž dělá většina velkých internetových stránek a poskytovatelů.
            <br />
            Na co využíváme cookies na tomto webu?
            <br />
            Cookies lze podle trvanlivosti rozdělit na dva základní druhy
            <br />
            <br />
            Krátkodobé (session cookie) – zůstávají ve Vašem prohlížeči do zavření Vašeho prohlížeče, poté se vymažou. Dlouhodobé (persistent cookie) –
            zůstávají uloženy v prohlížeči dlouhou dobu (záleží na nastavení Vašeho prohlížeče a nastavení cookie) nebo dokud je ručně neodstraníte. Na našem
            webu používáme tyto cookies: Technické (krátkodobé) – jsou nezbytné pro zajištění elementární funkce stránek, tj. vložení produktů do košíku, proces
            nákupu a zobrazení verze stránky vyžadující javascript nebo bez něj. YouTube (krátkodobé i dlouhodobé) – využívá je přehrávač videí YouTube. Jsou na
            Váš počítač umístěny ve chvíli, kdy přehrávač spustíte. Google Analytics (dlouhodobé) - abychom Vám mohli stránky lépe přizpůsobit, využíváme pro
            měření anonymních dat o chování uživatelů nástroj Google Analytics. AdWords (dlouhodobé) – generované reklamním systémem. Pomocí těchto cookies
            můžeme vyhodnocovat efektivitu prodejních kanálů. Sklik (dlouhodobé) – generované reklamním systémem. Pomocí těchto cookies můžeme vyhodnocovat
            efektivitu prodejních kanálů. Facebook (krátkodobé i dlouhodobé) – jsou používány widgetem sociální sítě Facebook, který je vložen na těchto
            stránkách. Twitter (dlouhodobé) – jsou používány widgetem sociální sítě Twitter, který je vložen na těchto stránkách. MailChimp (krátkodobé i
            dlouhodobé) – generované aplikcí Mailchimp. Tyto cookies nám umožnují vyhodnotit účinnost reklamního kanálu. Cookies nikdy nepoužíváme k tomu,
            abychom vás osobně identifikovali a nikdy do nich neumisťujeme citlivá nebo osobní data.
            <br />
            Jak lze upravit využívání cookies
            <br />
            Všechny cookies, které už na vašem počítači jsou, můžete vymazat. Většina prohlížečů také nabízí možnost blokace umísťování cookies na Vás počítač,
            v takovém případě ale nebudete moci využít všechny naše online služby. Detailní informace o nastavení ukládání souborů cookies ve Vašem prohlížeči
            najdete na stránkách poskytovatele konkrétního prohlížeče. Pro nejrozšířenější prohlížeče to jsou:
            <br />
            Chrome Firefox Internet Explorer Opera Android Podrobnosti najdete na stránkách AboutCookies.org.
            <br />
            Využití Google Analytics Tato stránka používá službu Google Analytics, poskytovanou společností Google, Inc. (dále jen &quot;Google&quot;). Služba
            Google Analytics používá souborů cookies. Informace o užívání stránky spolu s obsahem souboru cookie bude společností Google přenesen a uložen na
            serverech ve Spojených státech. Google bude užívat těchto informací pro účely vyhodnocování užívání stránky a vytváření zpráv o její aktivitě,
            určených pro její provozovatele, a pro poskytování dalších služeb týkajících se činností na stránce a užívání internetu vůbec. Google může také
            poskytnout tyto informace třetím osobám, bude-li to požadováno zákonem nebo budu-li takovéto třetí osoby zpracovávat tyto informace pro Google.
            <br />
            Kvůli ochraně Vašeho soukromí jsme upravili službu Google Analytics tak, aby nezaznamenávala Vaši IP adresu.
            <br />
            Služba Google Analytics je rozšířena o související reklamní funkce poskytované společností Google, a to:
            <br />
            Přehledy zobrazení v reklamní síti Google, Remarketing (zobrazování reklam v obsahové síti na základě zhlédnutých produktů), Rozšířené demografické
            přehledy (reportování anonymních demografických dat).
            <br />
            Více informací o zpracování a využití dat najdete ve smluvních podmínkách společnosti Google.
            <br />
            Jak zakázat sledování Google Analytics
            <br />
            Chcete-li zablokovat odesílání anonymních statistik pomocí nástroje Google Analytics, můžete k tomu využít plugin poskytovaný společností Google.
            Tento plugin je třeba stáhnout a nainstalovat do Vašeho prohlížeče.
          </Typography.Text>
        </Section>
      </SinglePage>
    </Layout>
  )
}

export default Index
