import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
};

export default function ContactPage() {
  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl">Contact</h1>
        <p className="mt-3 text-muted-foreground">
          Questions about an order, sizing or a piece? Our client care team is here to help.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-3">
            <Mail size={18} strokeWidth={1.5} className="mt-0.5 text-accent" />
            <div>
              <p className="font-medium">Email</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-foreground">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} strokeWidth={1.5} className="mt-0.5 text-accent" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">{siteConfig.contact.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 text-accent" />
            <div>
              <p className="font-medium">Atelier</p>
              <p className="text-muted-foreground">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
