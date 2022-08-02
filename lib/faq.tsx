import React from "react"
import { CollapsedPanelItem } from "./CollapsedPanelItem"

export const faqList: CollapsedPanelItem[] = [
  {
    name: "Jakou máme praxi?",
    text: "V našich řadách je spousta zkušených lektorů z řad vysokoškolských studentů ČVUT v Praze i odborníků z praxe např. ze společnosti Avast. Všichni lektoři aktivně pracují na svých IT projektech a chtějí své znalosti předávat dál."
  },
  {
    name: "Proč děláme kroužky v IT?",
    text: "Chceme, aby byly děti lépe připravené na dobu digitalizace. Aktuální školství není příliš pružné a rychle se měnící dobu stále více definuje IT sféra. Rozhodli jsme se přispět k tomu, aby se všichni mohli vzdělávat v oboru budoucnosti a zpřístupnit IT vzdělání dětem i dospělým."
  },
  {
    name: "Co učíme?",
    text: "Každý programovací jazyk je vhodný pro něco jiného,  má rozdílnou strukturu a odlišně se tvoří. Pro základ algoritmizace je dobrým začátkem i skvělým nástrojem jazyk Python. Pro pochopení základů mikroprocesorů a mikrokontrolerů je zde Arduino. Více o jednotlivých programovacích jazycích a kroužcích naleznete na našem blogu."
  },

  {
    name: "Jak učíme v době COVIDu?",
    text: "Především pro výuku dětí preferujeme prezenční výuku, ale jsme schopni ze dne na den přejít do ONLINE výuky, jak tomu bylo i teď na podzim. Právě jednoduchý přechod do online prostředí je jednou z výhod našich IT kroužků."
  },
  {
    name: "Kde vyučujeme?",
    text: (
      <>
        Máme nové výukové prostory ve Vršovicích pár zastávek autobusem od Náměstí Míru na adrese 28. pluku 458/7, 101 00 Praha 10 - Vršovice. Když nemůžeme
        učit zde, tak učíme především online.
        <br />
        Některé aktivity realizujeme i v budově Avastu na Pankráci, budově Strojní fakulty ČVUT v Praze v Dejvicích.
        <br />
        Učíme i přímo na některých školách, kam dojíždíme. Můžeme i do Vaší školy. Napište nám a domluvíme si podrobnosti.
      </>
    )
  },
  {
    name: "Jak se přidat do našich řad?",
    text: "Zajímá Tě IT? Chtěl nebo chtěla bys předávat své zkušenosti dětem, teenagerům, dospělým nebo dělat na zajímavých projektech? Tvorba webových stránek, webových aplikací, modelů strojového učení, datová analýza výsledků. Přidej se k nám a nauč se mnohem víc. Za tvou práci se Ti finančně odměníme. Napiš nám na info@vzdelanibudoucnosti.cz."
  },
  {
    name: "Děláte i jednorázové workshopy?",
    text: (
      <>
        Již jsme dělali jednodenní i víkendové workshopy Pythonu a Arduina. Můžeme je uzpůsobit Vám na míru jak pro děti, tak i pro dospělé, ať už jsou úplní
        začátečníci nebo pokročilí. Nabízíme hned několik možností. Zajímá vás něco jiného?
        <br />
        <ul>
          <li>Web aplikace</li>
          <li>Python</li>
          <li>Web aplikace</li>
          <li>Javascript</li>
          <li>Datovou analýzu</li>
          <li>Strojové učení</li>
          <li>Arduino</li>
          <li>3D tisk</li>
        </ul>
      </>
    )
  }
]
