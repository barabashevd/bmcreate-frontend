import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id = "contact" }: ContactSectionProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Děkujeme za Vaši zprávu! Budeme Vás kontaktovat co nejdříve.",
      });
      setFormState({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <section id={id} className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Kontaktujte nás
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Máte zájem o konzultaci nebo chcete vědět více o našich službách?
            Neváhejte nás kontaktovat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Napište nám</h3>

              {formStatus.type && (
                <Alert
                  className={`mb-4 ${formStatus.type === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
                >
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Jméno a příjmení *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Vaše jméno"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="vas@email.cz"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+420 XXX XXX XXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Zpráva *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Vaše zpráva..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2c5f2d] hover:bg-[#234a24] text-white"
                >
                  Odeslat zprávu
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Kontaktní informace
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Adresa</h4>
                      <p className="text-gray-600">
                        Ukázková 123, 123 45 Praha
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">Telefon</h4>
                      <p className="text-gray-600">
                        <a
                          href="tel:+420123456789"
                          className="hover:text-[#2c5f2d]"
                        >
                          +420 123 456 789
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">E-mail</h4>
                      <p className="text-gray-600">
                        <a
                          href="mailto:info@bmcreate.cz"
                          className="hover:text-[#2c5f2d]"
                        >
                          info@bmcreate.cz
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium">WhatsApp</h4>
                      <p className="text-gray-600">
                        <a
                          href="https://wa.me/420123456789"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2c5f2d]"
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
              <div className="h-[300px] w-full bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82387.25756473689!2d14.3826!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2sPrague%2C%20Czechia!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
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
