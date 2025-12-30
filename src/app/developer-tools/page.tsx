import Link from "next/link";
import { Card } from "../../../components/Card";
import { BackLink } from "../../../components/BackLink";
import { getCategory } from "@/data/tools";

const devToolsCategory = getCategory("developer-tools");

if (!devToolsCategory) {
  throw new Error("Developer tools metadata is missing.");
}

export default function DeveloperToolsPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/" label="Back to all tools" />
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Developer tools
        </h2>
        <p className="text-sm text-gray-400">{devToolsCategory.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {devToolsCategory.tools.map((tool) => (
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
