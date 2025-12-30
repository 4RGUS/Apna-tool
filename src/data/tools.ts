export type Tool = {
  href: string;
  title: string;
  description: string;
};

export type ToolCategory = {
  slug: string;
  title: string;
  description: string;
  footerMessage?: string;
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    slug: "developer-tools",
    title: "Developer Tools",
    description:
      "Format JSON and other developer utilities to speed up your workflow.",
    tools: [
      {
        href: "/developer-tools/json-editor",
        title: "JSON Editor & Formatter",
        description:
          "Edit, validate, pretty print, and minify JSON objects effortlessly.",
      },
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    description:
      "Plan your income, taxes, investments and loan repayments in minutes.",
    footerMessage:
      "This is an approximate calculator for educational use only. Please consult a professional for tax or financial advice.",
    tools: [
      {
        href: "/finance/salary-calculator",
        title: "Salary & Tax Calculator",
        description:
          "Estimate your in-hand salary and compare old vs new tax regimes.",
      },
      {
        href: "/finance/emi-calculator",
        title: "EMI Calculator",
        description:
          "Calculate monthly EMI, total interest and total payment for your loan.",
      },
      {
        href: "/finance/sip-calculator",
        title: "SIP Calculator",
        description:
          "Project the future value of your monthly SIP investments.",
      },
    ],
  },
];

export const getCategory = (slug: string) =>
  toolCategories.find((category) => category.slug === slug);
