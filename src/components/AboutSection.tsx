import React from "react";

interface AboutSectionProps {
  title?: string;
  paragraphs?: string[];
}

const AboutSection = ({ 
  title = "O nás",
  paragraphs = [
    "Zde napište první odstavec o vaší společnosti...",
    "Zde napište druhý odstavec o vaší historii a zkušenostech...",
    "Zde napište třetí odstavec o vašich cílech a hodnotách..."
  ]
}: AboutSectionProps) => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#2c5f2d]">
          {title}
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
