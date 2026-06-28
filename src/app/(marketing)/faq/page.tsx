import type { Metadata } from "next";
import Link from "next/link";
import { faqGroups } from "@/lib/content/faq";
import { Container } from "@/components/common/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about orders, shipping, returns and care.",
};

export default function FaqPage() {
  return (
    <Container className="max-w-3xl py-12">
      <header>
        <h1 className="font-serif text-4xl sm:text-5xl">Frequently Asked</h1>
        <p className="mt-3 text-muted-foreground">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact" className="text-foreground underline-offset-4 hover:underline">
            Contact us
          </Link>
          .
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {faqGroups.map((group) => (
          <section key={group.heading}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {group.heading}
            </h2>
            <Accordion type="single" collapsible className="mt-3">
              {group.items.map((item, i) => (
                <AccordionItem key={item.question} value={`${group.heading}-${i}`}>
                  <AccordionTrigger className="text-sm normal-case tracking-normal">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </Container>
  );
}
