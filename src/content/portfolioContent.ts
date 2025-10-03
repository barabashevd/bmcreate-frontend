// Portfolio Content Configuration
// Real projects based on BM Create portfolio

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string; // Main exterior image for the card
  images: {
    exterior: string;
    interior: string;
    livingRoom: string;
    kitchen: string;
  };
  category: "residential" | "commercial" | "renovation" | "public";
  features: string[];
  details: string;
  location: string;
  year: number;
  size: string;
  energyClass: string;
  technicalParams?: {
    airTightness?: string;
    energyDemand?: string;
    heatLoss?: string;
    materials?: string[];
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Dům pro hosty - Nebušice",
    description: "Pasivní bungalov s výjimečným designem a zelnou střechou napojenu na okolní louku.",
    // Use your local images here
    image: "/images/portfolio/nebusice/exterior.jpg",
    images: {
      exterior: "/images/portfolio/nebusice/exterior.jpg",
      interior: "/images/portfolio/nebusice/interior.jpg",
      livingRoom: "/images/portfolio/nebusice/living-room.jpg",
      kitchen: "/images/portfolio/nebusice/kitchen.jpg"
    },
    category: "residential",
    location: "Nebušice - Praha",
    year: 2021,
    size: "72 m²",
    energyClass: "A",
    features: [
      "Hliníková okna",
      "Tepelné čerpadlo", 
      "Klimatizace",
      "Podlahové topení",
      "Zelená střecha",
      "Ocelová lávka"
    ],
    details: "Výstavba pasivního domu pro hosty představovala jedinečnou výzvu kvůli úplně nepřístupnému pozemku pro stavební techniku a výstavbě ve svahu. Bylo nutné budovat opěrné zdi pro zajištění svahu a použít sladěné materiály pro návaznost na hlavní budovu. Projekt zahrnuje hliníková okna, tepelné čerpadlo, klimatizaci, podlahové topení a zelenou střechu napojenou na louku. Spojovací ocelová lávka ke hlavní budově a pohledový betonový strop dodávají objektu moderní vzhled. Klient je zcela spokojen s výsledkem.",
    technicalParams: {
      energyDemand: "35,7 GJ/rok",
      heatLoss: "2,67 W/m²",
      airTightness: "0,49 1/h",
      materials: ["POROTHERM", "Minerální vlna", "Hliníková okna"]
    }
  },
  {
    id: "2", 
    title: "Rodinný dům Mnichovice",
    description: "Moderní rodinný dům s výjimečnými parametry vzduchotěsnosti a energetické úspornosti.",
    image: "/images/portfolio/mnichovice/exterior.jpg",
    images: {
      exterior: "/images/portfolio/mnichovice/exterior.jpg",
      interior: "/images/portfolio/mnichovice/interior.jpg",
      livingRoom: "/images/portfolio/mnichovice/living-room.jpg",
      kitchen: "/images/portfolio/mnichovice/kitchen.jpg"
    },
    category: "residential",
    location: "Mnichovice",
    year: 2021,
    size: "151 m²",
    energyClass: "A",
    features: [
      "Vápenopískové cihly",
      "Skládaný strop",
      "Plochá střecha",
      "Internorm okna",
      "Rekuperace Nilan",
      "Ocelové schodiště"
    ],
    details: "Výstavba rodinného domu byla přizpůsobena rozpočtu klienta s dosažením parametrů pro čerpání dotace. Hlavní výzvou byl pozemek ve svahu s výškovým přepadem do dvou metrů. Použité technologie zahrnují vápenopískové cihly, skládaný strop v 1NP, plochou střechu z vazníkové konstrukce, plastová okna od Internorm, rekuperační systém od Nilan, ocelové schodiště a sádrové omítky. Zateplovací systém tvoří šedý polystyren 300 mm. Blower door test dosáhl výjimečné hodnoty 0,24. Klient je zcela spokojen s výsledkem.",
    technicalParams: {
      airTightness: "0,24 1/h",
      materials: ["Vápenopískové cihly", "Šedý polystyren 300mm", "Internorm okna", "Rekuperace Nilan"]
    }
  },
  {
    id: "3",
    title: "Rodinný dům Sluštice", 
    description: "Rychle realizovaný rodinný dům s kombinací ploché střechy a pálené tašky.",
    image: "/images/portfolio/slustice/exterior.jpg",
    images: {
      exterior: "/images/portfolio/slustice/exterior.jpg",
      interior: "/images/portfolio/slustice/interior.jpg",
      livingRoom: "/images/portfolio/slustice/living-room.jpg",
      kitchen: "/images/portfolio/slustice/kitchen.jpg"
    },
    category: "residential",
    location: "Sluštice",
    year: 2023,
    size: "170 m²",
    energyClass: "A",
    features: [
      "Vápenopískové cihly",
      "Kombinovaná střecha",
      "Hliníko-plastová okna",
      "Elektrické podlahové topení",
      "Rekuperace Nilan",
      "Rychlá realizace"
    ],
    details: "Výstavba rodinného domu byla přizpůsobena rozpočtu klienta s dosažením parametrů pro čerpání dotace. Hlavní výzvou byla rychlost realizace. Projekt využívá vápenopískové cihly, skládaný strop v 1NP, kombinaci ploché střechy z vazníkové konstrukce a pálené tašky. Instalována byla hliníko-plastová okna od Internorm, rekuperační systém od Nilan, ocelové schodiště, sádrové omítky a elektrické podlahové topení. Zateplovací systém tvoří šedý polystyren 300 mm. Blower door test dosáhl výborné hodnoty 0,24. Klient je zcela spokojen s výsledkem.",
    technicalParams: {
      airTightness: "0,24 1/h",
      materials: ["Vápenopískové cihly", "Šedý polystyren 300mm", "Hliníko-plastová okna Internorm"]
    }
  }
];

// Portfolio categories for filtering
export const portfolioCategories = {
  all: "Všechny projekty",
  residential: "Rodinné domy"
  // commercial: "Komerční",
  // renovation: "Rekonstrukce",
  // public: "Veřejné stavby"
};