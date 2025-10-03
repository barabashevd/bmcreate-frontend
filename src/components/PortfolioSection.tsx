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
import { portfolioItems, portfolioCategories, type PortfolioItem } from "../content/portfolioContent";
import { portfolio } from "../content/siteContent";

// PortfolioItem interface is now imported from portfolioContent.ts

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string>("exterior");

  // Portfolio data is now imported from portfolioContent.ts

  return (
    <section id="portfolio" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {portfolio.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {portfolio.subtitle}
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all">{portfolioCategories.all}</TabsTrigger>
            <TabsTrigger value="residential">{portfolioCategories.residential}</TabsTrigger>
            {/* <TabsTrigger value="commercial">{portfolioCategories.commercial}</TabsTrigger> */}
            {/* <TabsTrigger value="renovation">{portfolioCategories.renovation}</TabsTrigger> */}
            {/* <TabsTrigger value="public">{portfolioCategories.public}</TabsTrigger> */}
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

        {/* Only show "More projects" button if there are more than 6 projects */}
        {portfolioItems.length > 4 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
            >
              Zobrazit více projektů
            </Button>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedProject(null);
                setSelectedImage("exterior");
              }
            }}
          >
            <DialogContent 
              className="w-[min(92vw,1040px)] max-h-[95vh] overflow-y-auto p-0"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSelectedProject(null);
                  setSelectedImage("exterior");
                }
              }}
            >
              <div className="space-y-6 p-6">
                {/* Header */}
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl font-bold leading-tight">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-base leading-relaxed">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Hero Image Gallery */}
                <div className="space-y-4">
                  {/* Hero Image */}
                  <figure className="w-full">
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={selectedProject.images[selectedImage as keyof typeof selectedProject.images]}
                        alt={selectedImage === "exterior" ? "Exteriér" : 
                             selectedImage === "interior" ? "Interiér" :
                             selectedImage === "livingRoom" ? "Obývací pokoj" : "Kuchyň"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="sr-only">
                      {selectedImage === "exterior" && "Exteriér domu"}
                      {selectedImage === "interior" && "Interiér domu"}
                      {selectedImage === "livingRoom" && "Obývací pokoj"}
                      {selectedImage === "kitchen" && "Kuchyň"}
                    </figcaption>
                  </figure>

                  {/* Thumbnail Navigation */}
                  <nav className="flex gap-2 justify-center" role="tablist" aria-label="Galerie obrázků">
                    {Object.entries({
                      exterior: "Exteriér",
                      interior: "Interiér", 
                      livingRoom: "Obývací pokoj",
                      kitchen: "Kuchyň"
                    }).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedImage(key)}
                        role="tab"
                        aria-selected={selectedImage === key}
                        aria-label={`Zobrazit ${label.toLowerCase()}`}
                        className={`
                          relative flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-[4/3] 
                          overflow-hidden rounded-lg transition-all duration-200 
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                          ${selectedImage === key 
                            ? 'ring-2 ring-green-500 ring-offset-2 opacity-100' 
                            : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-gray-300'
                          }
                        `}
                      >
                        <img
                          src={selectedProject.images[key as keyof typeof selectedProject.images]}
                          alt={label}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-1">
                          <span className="text-xs font-medium">
                            {label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Project Details */}
                <div className="space-y-6 border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>Lokalita:</strong> {selectedProject.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Rok:</strong> {selectedProject.year}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Velikost:</strong> {selectedProject.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Energetická třída:</strong> {selectedProject.energyClass}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-base">Klíčové vlastnosti:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-1"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedProject.technicalParams && (
                        <div>
                          <h4 className="font-semibold mb-3 text-base">Technické parametry:</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            {selectedProject.technicalParams.airTightness && (
                              <p><strong>Vzduchotěsnost:</strong> {selectedProject.technicalParams.airTightness}</p>
                            )}
                            {selectedProject.technicalParams.energyDemand && (
                              <p><strong>Energetická náročnost:</strong> {selectedProject.technicalParams.energyDemand}</p>
                            )}
                            {selectedProject.technicalParams.heatLoss && (
                              <p><strong>Tepelná ztráta:</strong> {selectedProject.technicalParams.heatLoss}</p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-base">Popis:</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {selectedProject.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DialogClose asChild>
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-base py-3">
                    Zavřít
                  </Button>
                </DialogClose>
              </div>
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
        <div className="text-xs text-gray-500 mt-2">
          {project.location} • {project.year} • {project.size}
        </div>
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
