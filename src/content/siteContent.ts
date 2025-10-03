// Site Content Configuration
// Edit this file to easily update all content across your website

export const siteContent = {
  // Company Information
  company: {
    name: "BM Create s.r.o.",
    tagline: "Pasivní bydlení bez kompromisů",
    phone: "+420 777 811 508",
    email: "barabashev@bmcreate.cz",
    address: "Zlatá 62, 250 83",
    whatsapp: "420777811508"
  },

  // Hero Section
  hero: {
    title: "Pasivní domy s 25letou zkušeností",
    subtitle: "Stavíme energeticky úsporné domy s garantovanou kvalitou. Kompletní realizace od návrhu po kolaudaci včetně čerpání dotací. Platba až po dokončení každé etapy.",
    ctaText: "Nezávazná konzultace zdarma",
    // OPTION 1: Use your local image (recommended)
    // backgroundImage: "/images/hero/your-hero-image.jpg"
    // OPTION 2: Or keep using online image
    backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
  },

  // About Section
  about: {
    title: "O nás",
    paragraphs: [
      "BM Create s.r.o. se specializuje na výstavbu energeticky úsporných domů s důrazem na kvalitu a moderní technologie. Naším cílem je poskytovat komplexní služby v oblasti pasivního stavebnictví - od návrhu až po finální realizaci.",
      "Náš tým tvoří zkušení odborníci, kteří se zaměřují na detailní přípravu projektů a precizní provedení každé etapy výstavby. Klademe důraz na použití kvalitních materiálů a osvědčených technologií pro dosažení nejlepších výsledků.",
      "Věříme v osobní přístup ke každému klientovi a transparentní komunikaci během celého procesu výstavby. Naším posláním je vytvářet domy, které splňují nejen technické požadavky, ale také individuální představy našich zákazníků o komfortním bydlení."
    ]
  },

  // Services Section
  services: {
    title: "Naše služby",
    subtitle: "Nabízíme komplexní řešení v oblasti pasivního stavebnictví - od návrhu až po kolaudaci.",
    items: [
      {
        title: "Projektování pasivních domů",
        description: "Konzultace zdarma, návrh na míru. Díky našim zkušenostem zajistíme efektivní realizaci fáze návrhu vašeho domu. Získáte podrobné poradenství ohledně všech nuancí výstavby včetně výběru nejlepších specialistů a osvědčených materiálů."
      },
      {
        title: "Kompletní výstavba", 
        description: "Provádíme celkovou realizaci stavebních prací od přípravných fází až po dokončení stavby, včetně všech hrubých i dokončovacích prací potřebných pro kolaudaci a čerpání dotací. Garance 60 měsíců na práce, 240 měsíců na konstrukci."
      },
      {
        title: "Instalace technických systémů",
        description: "Realizujeme instalaci všech systémů pro fungování vašeho domu: rekuperační systém, tepelné čerpadlo, solární elektrárna a systém Chytrý dům. Nabízíme léty prověřené systémy s optimálním poměrem cena/kvalita."
      },
      {
        title: "Certifikace pasivního domu",
        description: "Během stavebního procesu provádíme dva nebo více testů vzduchotěsnosti objektu, což nám umožňuje identifikovat, opravit nebo vylepšit ukazatele nezbytné pro úspěšné získání certifikátu a dotace."
      },
      {
        title: "Konzultace a poradenství",
        description: "Bezplatné poradenství ve všech aspektech výstavby. Pomůžeme s výběrem projektové kanceláře, dodavatelů materiálu, stavebních materiálů, zateplovacích systémů, oken, pergol a dodavatelů pro oddělné profese."
      },
      {
        title: "Pozáruční servis",
        description: "Poskytujeme komplexní pozáruční servis s garancí 24 měsíců, 60 měsíců a 240 měsíců podle typu prací. Jsme k dispozici 24 hodin denně, 7 dní v týdnu pro rychlé řešení jakýchkoliv problémů."
      }
    ]
  },

  // Portfolio Section
  portfolio: {
    title: "Naše realizace",
    subtitle: "Zde se podívejte na naše dokončené projekty a reference.",
    // Portfolio items will be configured separately for easier management
  },

  // Contact Section
  contact: {
    title: "Kontaktujte nás",
    subtitle: "Máte dotaz nebo chcete konzultaci? Neváhejte nás kontaktovat."
  }
};

// Export individual sections for easier imports
export const { company, hero, about, services, portfolio, contact } = siteContent;
