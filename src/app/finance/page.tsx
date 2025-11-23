import Link from "next/link";
import { Card } from "../../../components/Card";
import { BackLink } from "../../../components/BackLink";
import { getCategory } from "@/data/tools";

const financeCategory = getCategory("finance");

if (!financeCategory) {
  throw new Error("Finance tools metadata is missing.");
}

export default function FinanceToolsPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/" label="Back to all tools" />
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Finance tools</h2>
        <p className="text-sm text-gray-400">{financeCategory.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {financeCategory.tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card title={tool.title} className="h-full cursor-pointer">
              <p className="text-sm text-gray-400">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
