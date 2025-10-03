import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import PortfolioSection from "./PortfolioSection";
import ContactSection from "./ContactSection";
import { company } from "../content/siteContent";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/images/logo/logo.png" 
              alt={company.name}
              className="h-10 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#services"
              className="text-gray-700 hover:text-[#ff6b35] transition-colors"
            >
              Služby
            </a>
            <a
              href="#portfolio"
              className="text-gray-700 hover:text-[#ff6b35] transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-[#ff6b35] transition-colors"
            >
              O nás
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-[#ff6b35] transition-colors"
            >
              Kontakt
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${company.phone}`}
              className="text-sm text-gray-700 hover:text-[#2c5f2d]"
            >
              {company.phone}
            </a>
            <a
              href="#contact"
              className="bg-[#ff6b35] text-white px-4 py-2 rounded-md hover:bg-[#e55a2b] transition-colors"
            >
              Nezávazná konzultace
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="services" className="py-16">
          <ServicesSection />
        </section>

        <AboutSection />

        <section id="portfolio" className="py-16">
          <PortfolioSection />
        </section>

        <section id="contact" className="py-16 bg-gray-50">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1e4a21] to-[#2c5f2d] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info with Logo */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src="/images/logo/logo.png" 
                  alt={company.name}
                  className="h-12 w-auto mb-4 filter brightness-0 invert"
                />
                <p className="text-white/80 text-lg mb-4 max-w-md">
                  {company.tagline}
                </p>
                <p className="text-white/70 text-sm max-w-md">
                  Stavíme energeticky úsporné domy s garantovanou kvalitou. Kompletní realizace od návrhu po kolaudaci včetně čerpání dotací.
                </p>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-[#ff6b35] rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 hover:bg-[#ff6b35] rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a 
                  href={`https://wa.me/${company.whatsapp}`}
                  className="w-10 h-10 bg-white/10 hover:bg-[#ff6b35] rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Kontakt</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5">
                    <svg className="w-5 h-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/90 font-medium">{company.name}</p>
                    <p className="text-white/70 text-sm">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${company.phone}`} className="text-white/90 hover:text-[#ff6b35] transition-colors">
                    {company.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href={`mailto:${company.email}`} className="text-white/90 hover:text-[#ff6b35] transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Rychlé odkazy</h3>
              <nav className="space-y-3">
                <a
                  href="#services"
                  className="block text-white/80 hover:text-[#ff6b35] transition-colors hover:translate-x-1 transform duration-200"
                >
                  Služby
                </a>
                <a
                  href="#portfolio"
                  className="block text-white/80 hover:text-[#ff6b35] transition-colors hover:translate-x-1 transform duration-200"
                >
                  Portfolio
                </a>
                <a
                  href="#about"
                  className="block text-white/80 hover:text-[#ff6b35] transition-colors hover:translate-x-1 transform duration-200"
                >
                  O nás
                </a>
                <a
                  href="#contact"
                  className="block text-white/80 hover:text-[#ff6b35] transition-colors hover:translate-x-1 transform duration-200"
                >
                  Kontakt
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/60 text-sm">
                &copy; {new Date().getFullYear()} {company.name}. Všechna práva vyhrazena.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-white/60 hover:text-[#ff6b35] transition-colors">
                  Ochrana údajů
                </a>
                <a href="#" className="text-white/60 hover:text-[#ff6b35] transition-colors">
                  Obchodní podmínky
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
