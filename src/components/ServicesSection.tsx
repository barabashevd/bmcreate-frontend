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
import { services } from "../content/siteContent";

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
      <CardHeader className="p-4 sm:p-6">
        <div className="flex justify-center mb-3 sm:mb-4 text-[#2c5f2d]">{icon}</div>
        <CardTitle className="text-lg sm:text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 sm:p-6 pt-0">
        <CardDescription className="text-center text-sm sm:text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-4 sm:pb-6 px-4 sm:px-6">
        <Button
          variant="outline"
          className="border-[#2c5f2d] text-[#2c5f2d] hover:bg-[#2c5f2d] hover:text-white w-full sm:w-auto min-h-[44px] touch-manipulation"
        >
          Více informací
        </Button>
      </CardFooter>
    </Card>
  );
};

const ServicesSection = () => {
  const serviceItems = [
    {
      icon: <Home className="h-12 w-12" />,
      title: services.items[0].title,
      description: services.items[0].description,
    },
    {
      icon: <Ruler className="h-12 w-12" />,
      title: services.items[1].title,
      description: services.items[1].description,
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: services.items[2].title,
      description: services.items[2].description,
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#2c5f2d]">
            {services.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            {services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceItems.map((service, index) => (
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
