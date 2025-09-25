import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Ruler, Wrench } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({
  icon,
  title,
  description = "Service description",
}: ServiceCardProps) => {
  return (
    <Card className="flex flex-col h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-center mb-4 text-[#2c5f2d]">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button
          variant="outline"
          className="border-[#2c5f2d] text-[#2c5f2d] hover:bg-[#2c5f2d] hover:text-white"
        >
          Více informací
        </Button>
      </CardFooter>
    </Card>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12" />,
      title: "Návrh pasivních domů",
      description:
        "Specializujeme se na návrh energeticky úsporných pasivních domů, které splňují nejvyšší standardy kvality a komfortu bydlení.",
    },
    {
      icon: <Ruler className="h-12 w-12" />,
      title: "Realizace staveb",
      description:
        "Kompletní realizace staveb od základů až po klíč s důrazem na kvalitu provedení a použití moderních technologií a materiálů.",
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Rekonstrukce",
      description:
        "Přestavby a rekonstrukce stávajících objektů na energeticky úsporné budovy s využitím nejnovějších postupů a materiálů.",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2c5f2d]">
            Naše služby
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nabízíme komplexní řešení v oblasti pasivního stavebnictví - od
            návrhu až po realizaci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
