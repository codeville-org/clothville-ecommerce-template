import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { policies, policyList } from "@/lib/content/policies";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function generateStaticParams() {
  return policyList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = policies[slug];
  if (!doc) return {};
  return { title: doc.title, description: doc.intro };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = policies[slug];
  if (!doc) notFound();

  return (
    <Container className="max-w-3xl py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.title }]} />

      <header className="mt-6">
        <h1 className="font-serif text-4xl sm:text-5xl">{doc.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Last updated {dateFormatter.format(new Date(doc.updated))}
        </p>
        {doc.intro && <p className="mt-5 text-muted-foreground">{doc.intro}</p>}
      </header>

      <div className="mt-10 space-y-8">
        {doc.sections.map((section, i) => (
          <section key={i}>
            {section.heading && <h2 className="font-serif text-xl">{section.heading}</h2>}
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
