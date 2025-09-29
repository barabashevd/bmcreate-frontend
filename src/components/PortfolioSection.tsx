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
            <TabsTrigger value="commercial">{portfolioCategories.commercial}</TabsTrigger>
            <TabsTrigger value="renovation">{portfolioCategories.renovation}</TabsTrigger>
            <TabsTrigger value="public">{portfolioCategories.public}</TabsTrigger>
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
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Lokalita:</strong> {selectedProject.location} | <strong>Rok:</strong> {selectedProject.year}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Velikost:</strong> {selectedProject.size} | <strong>Energetická třída:</strong> {selectedProject.energyClass}
                    </p>
                  </div>
                  
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
                  
                  {selectedProject.technicalParams && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Technické parametry:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
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
