import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  details: string;
}

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );

  // Sample portfolio data
  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "Moderní pasivní dům Praha",
      description:
        "Energeticky úsporný rodinný dům s minimální ekologickou stopou.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      category: "residential",
      features: [
        "Energetická třída A+",
        "Tepelné čerpadlo",
        "Fotovoltaika",
        "Rekuperace",
      ],
      details:
        "Tento moderní pasivní dům v Praze byl navržen s důrazem na energetickou účinnost a udržitelnost. Využívá nejnovější technologie pro minimalizaci spotřeby energie a maximalizaci komfortu bydlení.",
    },
    {
      id: "2",
      title: "Ekologická dřevostavba Brno",
      description: "Dřevostavba s přírodními materiály a nulovými emisemi CO2.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      category: "residential",
      features: [
        "Dřevěná konstrukce",
        "Přírodní izolace",
        "Zelená střecha",
        "Dešťová voda",
      ],
      details:
        "Ekologická dřevostavba v Brně kombinuje tradiční řemeslo s moderními technologiemi. Použité přírodní materiály zajišťují zdravé vnitřní prostředí a minimální dopad na životní prostředí.",
    },
    {
      id: "3",
      title: "Kancelářská budova Ostrava",
      description:
        "Komerční budova s certifikací LEED Gold a chytrými technologiemi.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      category: "commercial",
      features: [
        "LEED Gold",
        "Smart building",
        "Zelené fasády",
        "Úsporné osvětlení",
      ],
      details:
        "Kancelářská budova v Ostravě představuje špičku v komerčních pasivních stavbách. Certifikace LEED Gold potvrzuje její výjimečné vlastnosti v oblasti energetické účinnosti a udržitelnosti.",
    },
    {
      id: "4",
      title: "Rekonstrukce historické vily",
      description:
        "Citlivá rekonstrukce historické budovy na pasivní standard.",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      category: "renovation",
      features: [
        "Zachování historických prvků",
        "Moderní izolace",
        "Podlahové vytápění",
        "Chytré řízení",
      ],
      details:
        "Rekonstrukce historické vily ukazuje, že i starší budovy mohou dosáhnout pasivního standardu. Projekt kombinuje respekt k historické hodnotě s moderními technologiemi pro úsporu energie.",
    },
    {
      id: "5",
      title: "Bytový komplex Plzeň",
      description: "Moderní bytový dům s 12 jednotkami v pasivním standardu.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      category: "residential",
      features: [
        "Komunitní zahrada",
        "Sdílená fotovoltaika",
        "Dobíjecí stanice",
        "Rekuperace",
      ],
      details:
        "Bytový komplex v Plzni nabízí moderní bydlení v pasivním standardu. Společné prvky jako komunitní zahrada a sdílená fotovoltaika podporují udržitelný životní styl obyvatel.",
    },
    {
      id: "6",
      title: "Školka Liberec",
      description:
        "Vzdělávací zařízení s důrazem na zdravé prostředí pro děti.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      category: "public",
      features: [
        "Přírodní materiály",
        "Kvalita vnitřního vzduchu",
        "Přírodní zahrada",
        "Nízká spotřeba",
      ],
      details:
        "Školka v Liberci byla navržena s ohledem na specifické potřeby dětí. Zdravé vnitřní prostředí, přírodní materiály a nízká energetická náročnost z ní dělají vzorový projekt pro vzdělávací zařízení.",
    },
  ];

  return (
    <section id="portfolio" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Naše realizace
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Prohlédněte si výběr z našich dokončených projektů pasivních domů a
            energeticky úsporných staveb.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all">Všechny projekty</TabsTrigger>
            <TabsTrigger value="residential">Rodinné domy</TabsTrigger>
            <TabsTrigger value="commercial">Komerční</TabsTrigger>
            <TabsTrigger value="renovation">Rekonstrukce</TabsTrigger>
            <TabsTrigger value="public">Veřejné stavby</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  project={item}
                  onSelect={() => setSelectedProject(item)}
                />
              ))}
            </div>
          </TabsContent>

          {["residential", "commercial", "renovation", "public"].map(
            (category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <PortfolioCard
                        key={item.id}
                        project={item}
                        onSelect={() => setSelectedProject(item)}
                      />
                    ))}
                </div>
              </TabsContent>
            ),
          )}
        </Tabs>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
          >
            Zobrazit více projektů
          </Button>
        </div>

        {/* Project Detail Dialog */}
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Klíčové vlastnosti:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-700">{selectedProject.details}</p>
                </div>
              </div>
              <DialogClose asChild>
                <Button className="mt-4 bg-green-700 hover:bg-green-800">
                  Zavřít
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

interface PortfolioCardProps {
  project: PortfolioItem;
  onSelect: () => void;
}

const PortfolioCard = ({ project, onSelect }: PortfolioCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {project.features.slice(0, 2).map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 text-xs"
            >
              {feature}
            </Badge>
          ))}
          {project.features.length > 2 && (
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-500 border-gray-200 text-xs"
            >
              +{project.features.length - 2} další
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelect}
          variant="outline"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Zobrazit detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioSection;
