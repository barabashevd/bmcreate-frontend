import React, { useState, useEffect } from "react";
import { about } from "../content/siteContent";

interface AboutSectionProps {
  title?: string;
  paragraphs?: string[];
}

const AboutSection = ({ 
  title = about.title,
  paragraphs = about.paragraphs
}: AboutSectionProps) => {
  // Background images configuration
  const backgroundImages = [
    "/images/company/about-images/about-1.jpg",
    "/images/company/about-images/about-2.jpg", 
    "/images/company/about-images/about-3.jpg",
    "/images/company/about-images/about-4.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section id="about" className="relative py-20 min-h-[600px] overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content with Semi-Transparent Background */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="w-full">
          <div className="max-w-4xl mx-auto">
            {/* Semi-transparent content box */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#2c5f2d]">
                {title}
              </h2>
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl leading-relaxed text-[#212221] text-center">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Decorative element */}
              <div className="flex justify-center mt-8">
                <div className="w-24 h-1 bg-gradient-to-r from-[#2c5f2d] to-[#ff6b35] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
