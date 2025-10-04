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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

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
              {portfolioItems
                .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                .slice(0, showAllProjects ? portfolioItems.length : 3)
                .map((item) => (
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
                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                    .slice(0, showAllProjects ? portfolioItems.length : 3)
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

        {/* Show "More/Less projects" button if there are more than 3 projects */}
        {portfolioItems.length > 3 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? "Zobrazit méně projektů" : "Zobrazit více projektů"}
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
                setSelectedImageIndex(0);
              }
            }}
          >
            <DialogContent 
              className="!w-[min(95vw,1400px)] !max-w-[1400px] h-[95vh] flex flex-col p-0"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSelectedProject(null);
                  setSelectedImageIndex(0);
                }
              }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Header - Fixed */}
                <DialogHeader className="flex-shrink-0 mb-4">
                  <DialogTitle className="text-xl md:text-2xl font-bold leading-tight">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-base leading-relaxed">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Main Content - Flexible */}
                <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
                  {/* Left Side: Image Gallery */}
                  <div className="flex-1 lg:max-w-2xl flex flex-col">
                    {/* Hero Image - Flexible */}
                    <figure className="flex-1 flex flex-col min-h-0">
                      <div className="flex-1 relative overflow-hidden rounded-lg">
                        <img
                          src={selectedProject.images[selectedImageIndex]?.src}
                          alt={selectedProject.images[selectedImageIndex]?.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="sr-only">
                        {selectedProject.images[selectedImageIndex]?.alt}
                      </figcaption>
                    </figure>

                    {/* Thumbnail Navigation - Fixed */}
                    <nav className="flex-shrink-0 flex gap-2 justify-center mt-3" role="tablist" aria-label="Galerie obrázků">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          role="tab"
                          aria-selected={selectedImageIndex === index}
                          aria-label={`Zobrazit ${image.label.toLowerCase()}`}
                          className={`
                            relative flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-[4/3] 
                            overflow-hidden rounded-lg transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                            ${selectedImageIndex === index 
                              ? 'ring-2 ring-green-500 ring-offset-2 opacity-100' 
                              : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-gray-300'
                            }
                          `}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-1">
                            <span className="text-xs font-medium">
                              {image.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Right Side: Project Details - Scrollable if needed */}
                  <div className="flex-1 lg:max-w-lg flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-1">
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
                          <h4 className="font-semibold mb-2 text-sm">Klíčové vlastnosti:</h4>
                          <div className="flex flex-wrap gap-1">
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
                      
                      <div className="space-y-3">
                        {selectedProject.technicalParams && (
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Technické parametry:</h4>
                            <div className="space-y-1 text-xs text-gray-600">
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
                          <h4 className="font-semibold mb-2 text-sm">Popis:</h4>
                          <p className="text-gray-700 text-xs leading-relaxed">
                            {selectedProject.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Close Button - Fixed */}
                <DialogClose asChild>
                  <Button className="flex-shrink-0 w-full bg-green-700 hover:bg-green-800 text-sm py-2 mt-4">
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
          <div className="text-xs text-gray-500 mt-2">
            {project.location} • {project.year} • {project.size}
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
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
        <CardFooter className="mt-auto">
          <Button
            onClick={onSelect}
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Zobrazit detail
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PortfolioSection;
