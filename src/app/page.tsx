// app/page.tsx
import Link from "next/link";
import { Card } from "../../components/Card";

const tools = [
  {
    href: "/salary-calculator",
    title: "Salary & Tax Calculator",
    description:
      "Estimate your in-hand salary and compare old vs new tax regimes.",
  },
  {
    href: "/emi-calculator",
    title: "EMI Calculator",
    description:
      "Calculate monthly EMI, total interest and total payment for your loan.",
  },
  {
    href: "/sip-calculator",
    title: "SIP Calculator",
    description: "Project the future value of your monthly SIP investments.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Calculate your money in seconds.
        </h2>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card title={tool.title} className="h-full cursor-pointer">
              <p className="text-sm text-gray-400">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
