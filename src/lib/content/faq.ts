/** FAQ entries shown on /faq. Sample copy — edit freely. */
export interface FaqGroup {
  heading: string;
  items: { question: string; answer: string }[];
}

export const faqGroups: FaqGroup[] = [
  {
    heading: "Orders & Shipping",
    items: [
      {
        question: "When will my order ship?",
        answer:
          "Orders are processed within 1–2 business days. You'll receive tracking by email as soon as your order leaves our atelier.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes — we ship worldwide. Any applicable duties and taxes are calculated at your destination and paid on delivery.",
      },
      {
        question: "Is shipping really complimentary?",
        answer:
          "Standard shipping is complimentary on every order, with no minimum. Express options are available at checkout.",
      },
    ],
  },
  {
    heading: "Returns & Sizing",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Return unworn pieces with tags within 30 days for a full refund. Start a return from your account and we'll send a prepaid label.",
      },
      {
        question: "How do I find my size?",
        answer:
          "Each product page includes a detailed size guide. If you're between sizes, we generally recommend sizing up for a relaxed fit.",
      },
      {
        question: "Can I exchange an item?",
        answer:
          "The fastest way to exchange is to place a new order for your preferred size or colour and return the original.",
      },
    ],
  },
  {
    heading: "Products & Care",
    items: [
      {
        question: "How should I care for my pieces?",
        answer:
          "Care instructions are listed on every product page. In general, we recommend gentle cleaning and storing knitwear folded.",
      },
      {
        question: "Are your materials responsibly sourced?",
        answer:
          "We work with mills and ateliers that share our commitment to quality and responsible production. Details are noted per product.",
      },
    ],
  },
];
