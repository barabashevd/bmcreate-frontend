import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { company } from "../content/siteContent";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id = "contact" }: ContactSectionProps) => {
  // used for the anti-abuse minimum-fill-time
  const [startedAt] = useState(() => Date.now());

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        type: "error",
        message: "Prosím vyplňte všechna povinná pole.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormStatus({
        type: "error",
        message: "Prosím zadejte platnou e-mailovou adresu.",
      });
      return;
    }

    // Check minimum time requirement (anti-spam)
    const elapsedTime = Date.now() - startedAt;
    if (elapsedTime < 3000) {
      setFormStatus({
        type: "error",
        message: "Prosím počkejte chvilku před odesláním zprávy.",
      });
      return;
    }

    // Contact form ready for submission

    // Show loading state
    setFormStatus({
      type: null,
      message: "Odesílám zprávu...",
    });

    try {
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch("https://bmcreate.cz/contact-handler.php", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          // REQUIRED by your PHP handler:
          elapsedMs: elapsedTime,
          website: "", // honeypot must be empty
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          type: "success",
          message: result.message ?? "Děkujeme! Vaše zpráva byla odeslána.",
        });
        setFormState({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message:
            result.message ||
            "Chyba při odesílání zprávy. Zkuste to prosím později.",
        });
      }
    } catch (error) {
      let errorMessage = "Chyba při odesílání zprávy. Zkuste to prosím později.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Odesílání trvalo příliš dlouho. Zkontrolujte připojení k internetu.";
        } else if (error.message.includes('Failed to fetch')) {
          if (!navigator.onLine) {
            errorMessage = "Nejste připojeni k internetu. Zkontrolujte připojení a zkuste znovu.";
          } else {
            errorMessage = "Nelze se připojit k serveru. Zkontrolujte připojení k internetu a zkuste znovu.";
          }
        } else if (error.message.includes('NetworkError')) {
          errorMessage = "Chyba sítě. Zkontrolujte připojení k internetu.";
        } else if (error.message.includes('CORS')) {
          errorMessage = "Problém s bezpečnostním nastavením. Zkuste znovu.";
        }
      }
      
      setFormStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <section id={id} className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-800">
            Kontaktujte nás
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Máte zájem o konzultaci nebo chcete vědět více o našich službách?
            Neváhejte nás kontaktovat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Napište nám</h3>

              {formStatus.message && (
                <Alert
                  className={`mb-4 ${
                    formStatus.type === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : formStatus.type === "error"
                      ? "bg-red-50 text-red-800 border-red-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate autoComplete="on">
                {/* Honeypot (hidden; bots fill it) */}
                <input
                  type="text"
                  name="website"
                  value=""
                  onChange={() => {}}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Jméno a příjmení *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Vaše jméno"
                    required
                    className="min-h-[44px] text-base"
                    autoComplete="name"
                    autoCapitalize="words"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="vas@email.cz"
                    required
                    className="min-h-[44px] text-base"
                    autoComplete="email"
                    autoCapitalize="none"
                    inputMode="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+420 XXX XXX XXX"
                    className="min-h-[44px] text-base"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base">Zpráva *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Vaše zpráva..."
                    rows={4}
                    required
                    className="min-h-[120px] text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2c5f2d] hover:bg-[#234a24] text-white min-h-[48px] touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formStatus.type === null && formStatus.message === "Odesílám zprávu..."}
                >
                  {formStatus.type === null && formStatus.message === "Odesílám zprávu..." 
                    ? "Odesílám..." 
                    : "Odeslat zprávu"
                  }
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Kontaktní informace
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Adresa</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{company.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Telefon</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <a
                          href={`tel:${company.phone}`}
                          className="hover:text-[#2c5f2d] touch-manipulation"
                        >
                          {company.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">E-mail</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <a
                          href={`mailto:${company.email}`}
                          className="hover:text-[#2c5f2d] touch-manipulation"
                        >
                          {company.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6b35] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">WhatsApp</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <a
                          href={`https://wa.me/${company.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2c5f2d] touch-manipulation"
                        >
                          Napište nám na WhatsApp
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="shadow-lg overflow-hidden">
              <div className="h-[250px] sm:h-[300px] w-full bg-gray-200">
                <iframe
                  src="https://maps.google.com/maps?q=Zlat%C3%A1+62%2C+Zlat%C3%A1+250+83&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BM Create - Zlatá 62, 250 83"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
