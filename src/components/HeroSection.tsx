import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <section className="relative h-[700px] w-full bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-medium"
              onClick={() => setIsDialogOpen(true)}
            >
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Phone className="mr-2 h-4 w-4" /> {company.phone}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="mr-2 h-4 w-4" /> {company.email}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nezávazná konzultace</DialogTitle>
            <DialogDescription>
              Vyplňte formulář níže a my vás budeme kontaktovat pro domluvení
              termínu konzultace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Jméno</Label>
                <Input id="first-name" placeholder="Jan" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Příjmení</Label>
                <Input id="last-name" placeholder="Novák" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jan.novak@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" type="tel" placeholder="+420 123 456 789" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Zpráva</Label>
              <Textarea
                id="message"
                placeholder="Popište nám prosím váš projekt nebo dotaz..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#2c5f2d] hover:bg-[#2c5f2d]/90 text-white"
            >
              Odeslat žádost
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
