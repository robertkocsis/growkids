/**
 * 2026-os Országos Lombikprogram (FIV) — content source of truth.
 *
 * Consumed by two pages so the text never diverges:
 *   src/pages/ivf-program/national-program.astro        — the public page
 *   src/pages/ivf-program/national-program-print.astro  — noindex print route
 *                                                         → public/docs/*.pdf
 *
 * Regenerating the PDF after editing this file is documented in README.md.
 */

/** Official Ministry of Labour page listing the forms and conditions. */
export const officialInfoUrl = "https://mmuncii.gov.ro/familie/crestere-natalitate-fiv/";

/** Facebook group where GrowKids answers application questions. */
export const communityGroupUrl = "https://www.facebook.com/groups/1569573524898807";

/** Phone number of the GrowKids team member helping with applications. */
export const helpPhone = { display: "0754 038 984", href: "tel:+40754038984" };

/** Downloadable step-by-step guide (generated from the print route). */
export const stepsPdf = "/docs/orszagos-lombikprogram-2026-lepesek.pdf";

/** At-a-glance numbers, shown as a facts strip above the steps. */
export const keyFacts = [
  {
    icon: "ph:wallet-duotone",
    value: "15 000 lej",
    label: "Támogatás összesen — 5 000 lej gyógyszerekre, 10 000 lej a kezelésre.",
  },
  {
    icon: "ph:calendar-check-duotone",
    value: "November 15.",
    label: "A jelentkezési határidő, de érdemes a platform megnyitásának napján beadni.",
  },
  {
    icon: "ph:users-three-duotone",
    value: "10 000 fő",
    label: "Évente legfeljebb ennyi kedvezményezett, érkezési sorrendben.",
  },
  {
    icon: "ph:hourglass-duotone",
    value: "12 hónap",
    label: "Az utalványok érvényessége; a kezelést 6 hónapon belül el kell indítani.",
  },
];

export interface StepGroup {
  /** Short lead-in sentence above the bullet list. */
  intro?: string;
  bullets: string[];
}

export interface Step {
  title: string;
  icon: string;
  /** Free-standing paragraph(s) before any bullet group. */
  intro?: string;
  groups?: StepGroup[];
  /** Highlighted closing remark ("Fontos: …", consequences of missing a deadline). */
  note?: string;
}

export const steps: Step[] = [
  {
    title: "Ellenőrizd, hogy jogosult vagy-e",
    icon: "ph:seal-check-duotone",
    groups: [
      {
        intro: "A jelentkezéshez az alábbi feltételeknek együttesen kell megfelelni:",
        bullets: [
          "A jelentkező nő a jelentkezés napján betöltötte a 24. életévét, de még nem töltötte be a 43-at (24–42 év között, bezárólag).",
          "A pár legalább egyik tagja román állampolgár, és romániai állandó lakcímmel rendelkezik. Egyedülálló nő esetén ez rá vonatkozik.",
          "Mindkét partner (vagy egyedülálló nő esetén ő maga) rendelkezik érvényes állami egészségbiztosítással (CAS).",
          "Igazolt meddőségi diagnózis vagy olyan egészségügyi állapot áll fenn, amely természetes úton nem teszi lehetővé a gyermekvállalást, és orvosi javaslat szükséges lombikprogramra (FIV).",
          "A kezelést a programban részt vevő szerződött klinikán végzik.",
          "A jelentkező ugyanabban az évben nem részesül más, állami finanszírozású lombikprogram támogatásában.",
        ],
      },
    ],
  },
  {
    title: "Válassz egy partnerklinikát",
    icon: "ph:hospital-duotone",
    groups: [
      {
        intro: "Miután megjelenik a hivatalos klinikalista:",
        bullets: [
          "válaszd ki azt a klinikát, ahol a kezelést szeretnéd elvégeztetni;",
          "a klinikának a program hivatalos partnere és reprodukciós eljárásokra akkreditált intézménynek kell lennie;",
          "a klinikát az online platformon kell kiválasztani.",
        ],
      },
    ],
    note: "Fontos: a kérelem jóváhagyása után a klinika csak meghatározott esetekben és az Egészségügyi Minisztérium értesítésével módosítható.",
  },
  {
    title: "Szerezd be a FIV-javaslatot",
    icon: "ph:stethoscope-duotone",
    intro:
      "Kérj időpontot egy meddőségi és asszisztált reprodukciós szakorvoshoz, aki az általad választott klinikán dolgozik vagy együttműködik vele. Az orvos kitölti az 1b mellékletet (Anexa 1b).",
    groups: [
      {
        intro: "A dokumentumnak:",
        bullets: [
          "tartalmaznia kell a diagnózist és a lombikprogram orvosi indoklását;",
          "legfeljebb 60 nappal a dokumentum feltöltése előtt készülhet;",
          "csak a klinika programhoz való csatlakozása után állítható ki.",
        ],
      },
    ],
  },
  {
    title: "Készítsd elő a dokumentumokat",
    icon: "ph:folders-duotone",
    groups: [
      {
        intro: "A jelentkezési csomag tartalmazza:",
        bullets: [
          "az online rendszer által generált jelentkezési kérelmet;",
          "saját felelősségre tett nyilatkozatot (Anexa 1a);",
          "a FIV-orvosi javaslatot (Anexa 1b);",
          "GDPR-hozzájáruló nyilatkozatot (Anexa 1c);",
          "személyazonosító okmányok másolatát, „Az eredetivel megegyező” felirattal és aláírással;",
          "mindkét jelentkező részére (vagy egyedülálló nő esetén egy részére) a CAS által kiállított igazolást az egészségbiztosítás meglétéről.",
        ],
      },
    ],
    note: "Párok esetén minden dokumentumot mindkét félnek alá kell írnia.",
  },
  {
    title: "Nyújtsd be online a jelentkezést",
    icon: "ph:paper-plane-tilt-duotone",
    groups: [
      {
        intro: "Amikor megnyílik a pályázati felület:",
        bullets: [
          "hozz létre egy felhasználói fiókot;",
          "töltsd ki az adatokat;",
          "válaszd ki a partnerklinikát;",
          "töltsd le a rendszer által generált nyomtatványokat;",
          "írd alá kézzel vagy minősített elektronikus aláírással;",
          "tölts fel minden dokumentumot;",
          "kapsz egy iktatószámot, és a fiókodban követheted a jelentkezés állapotát.",
        ],
      },
    ],
    note: "A kérelmeket érkezési sorrendben bírálják el, a rendelkezésre álló keret erejéig, évente legfeljebb 10 000 kedvezményezett számára. A jelentkezési határidő november 15., de érdemes a platform megnyitásának napján beadni a pályázatot.",
  },
  {
    title: "Egészítsd ki a hiányzó dokumentumokat",
    icon: "ph:warning-circle-duotone",
    groups: [
      {
        intro: "Ha hiányzik vagy hibás valamelyik dokumentum:",
        bullets: [
          "egyetlen értesítést kapsz az online felületen;",
          "10 naptári napod van a javításra vagy pótlásra.",
        ],
      },
    ],
    note: "Ha ezt elmulasztod, a kérelmet elutasítják. A teljes dokumentáció elbírálása legfeljebb 60 naptári nap, de legkésőbb december 15-ig megtörténik.",
  },
  {
    title: "Írd alá a támogatási szerződést",
    icon: "ph:signature-duotone",
    intro: "A jóváhagyás után a támogatási szerződés megjelenik a fiókodban.",
    groups: [
      {
        intro: "A szerződést:",
        bullets: ["alá kell írni;", "majd 5 naptári napon belül vissza kell tölteni."],
      },
    ],
    note: "Ha ez nem történik meg, a kérelmet elutasítják.",
  },
  {
    title: "Megkapod a két digitális utalványt",
    icon: "ph:ticket-duotone",
    groups: [
      {
        intro: "A támogatás összege összesen 15 000 lej:",
        bullets: ["5 000 lej gyógyszerekre;", "10 000 lej a lombikkezelésre."],
      },
      {
        intro: "Az utalványok:",
        bullets: ["digitálisak;", "egyszerre kerülnek kiadásra;", "12 hónapig érvényesek."],
      },
      {
        intro: "A program fedezheti többek között:",
        bullets: [
          "stimulációs és támogató gyógyszereket;",
          "petesejtleszívást;",
          "spermium-előkészítést;",
          "megtermékenyítést;",
          "embriótenyésztést;",
          "ICSI-kezelést;",
          "embrióbeültetést;",
          "egyes utókövetési vizsgálatokat.",
        ],
      },
    ],
  },
  {
    title: "Kezdd meg a kezelést",
    icon: "ph:heartbeat-duotone",
    intro:
      "A kezelést az utalványok érvényességének kezdetétől számított 6 hónapon belül el kell indítani. Ez legfeljebb 3 hónappal meghosszabbítható, ha azt orvosi ok indokolja és a Minisztérium jóváhagyja.",
    groups: [
      {
        intro: "Fontos tudnivalók:",
        bullets: [
          "az utalványok kizárólag a programban részt vevő gyógyszertárban és klinikán használhatók fel;",
          "az utalvány kiadása előtt felmerült költségeket nem térítik meg;",
          "ha a kezelés többe kerül, mint 15 000 lej, a különbözetet a páciens fizeti;",
          "ha kevesebbet költesz, a fennmaradó összeget nem fizetik ki készpénzben.",
        ],
      },
    ],
    note: "A 2026–2030 közötti időszakban ugyanaz a kedvezményezett legfeljebb három alkalommal jelentkezhet a programba. A korábbi évek lombikprogramjaiban való részvétel ebbe a három alkalomba nem számít bele.",
  },
];
