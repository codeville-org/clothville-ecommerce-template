/**
 * Policy documents, keyed by URL slug. This is SAMPLE template copy — replace
 * it with your own legally-reviewed policies before going live.
 */

export interface PolicySection {
  heading?: string;
  body: string;
}

export interface PolicyDoc {
  slug: string;
  title: string;
  updated: string;
  intro?: string;
  sections: PolicySection[];
}

export const policies: Record<string, PolicyDoc> = {
  shipping: {
    slug: "shipping",
    title: "Shipping",
    updated: "2026-01-15",
    intro: "Everything you need to know about how and when your order arrives.",
    sections: [
      {
        heading: "Processing times",
        body: "Orders are processed within 1–2 business days. You will receive a confirmation email with tracking once your order ships.",
      },
      {
        heading: "Delivery",
        body: "Standard delivery is complimentary on all orders and typically arrives within 5–7 business days. Express options are available at checkout.",
      },
      {
        heading: "International",
        body: "We ship worldwide. Duties and taxes may be collected at delivery depending on your destination and are the responsibility of the recipient.",
      },
    ],
  },
  returns: {
    slug: "returns",
    title: "Returns & Exchanges",
    updated: "2026-01-15",
    intro: "We want you to love your pieces. If something isn't right, returns are simple.",
    sections: [
      {
        heading: "30-day returns",
        body: "Return unworn items with original tags within 30 days of delivery for a full refund to your original payment method.",
      },
      {
        heading: "How to return",
        body: "Start a return from your account or contact our team. We'll send a prepaid label and process your refund within 5 business days of receipt.",
      },
      {
        heading: "Exchanges",
        body: "For a different size or colour, place a new order and return the original — this is the fastest way to secure your preferred piece.",
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-01-15",
    intro: "How we collect, use and protect your personal information.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you provide at checkout and account creation, and data about how you use our site, to fulfil orders and improve your experience.",
      },
      {
        heading: "How we use it",
        body: "Your information is used to process orders, provide support, and — with your consent — send marketing communications you can opt out of at any time.",
      },
      {
        heading: "Your rights",
        body: "You may request access to, correction of, or deletion of your personal data by contacting us. We never sell your personal information.",
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    updated: "2026-01-15",
    intro: "The terms governing your use of this website and purchases made through it.",
    sections: [
      {
        heading: "Use of the site",
        body: "By accessing this site you agree to use it lawfully and not to interfere with its operation or security.",
      },
      {
        heading: "Orders",
        body: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel an order at our discretion.",
      },
      {
        heading: "Pricing",
        body: "Prices and availability are subject to change without notice. We make every effort to ensure accuracy but errors may occur.",
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "2026-01-15",
    intro: "How we use cookies and similar technologies on this website.",
    sections: [
      {
        heading: "What cookies are",
        body: "Cookies are small text files stored on your device that help the site function and remember your preferences, such as your cart and theme.",
      },
      {
        heading: "Managing cookies",
        body: "You can control cookies through your browser settings. Disabling some cookies may affect site functionality such as the shopping bag.",
      },
    ],
  },
};

export const policyList = Object.values(policies);
