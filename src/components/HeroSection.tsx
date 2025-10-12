import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { hero, company } from "../content/siteContent";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title = hero.title,
  subtitle = hero.subtitle,
  ctaText = hero.ctaText,
  backgroundImage = hero.backgroundImage,
}: HeroSectionProps) => {

  return (
    <section className="relative h-[600px] sm:h-[700px] w-full bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title.includes("25letou") ? (
              <>
                {title.split("25letou")[0]}
                <span className="text-[#ff6b35]">25</span>letou
                {title.split("25letou")[1]}
              </>
            ) : title.includes("25 let") ? (
              <>
                {title.split("25 let")[0]}
                <span className="text-[#ff6b35]">25 let</span>
                {title.split("25 let")[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-medium w-full sm:w-auto min-h-[48px] touch-manipulation"
              asChild
            >
              <a href="#contact">
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-full sm:w-auto min-h-[48px] touch-manipulation"
                asChild
              >
                <a href={`tel:${company.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> 
                  <span className="hidden lg:inline">{company.phone}</span>
                  <span className="lg:hidden">Zavolejte nám</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-full sm:w-auto min-h-[48px] touch-manipulation"
                asChild
              >
                <a href={`mailto:${company.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> 
                  <span className="hidden lg:inline">{company.email}</span>
                  <span className="lg:hidden">Napište nám</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
