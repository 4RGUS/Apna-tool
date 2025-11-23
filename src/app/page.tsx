// app/page.tsx
import Link from "next/link";
import { Card } from "../../components/Card";
import { toolCategories } from "@/data/tools";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Calculate your money in seconds.
        </h2>
      </section>

      {toolCategories.map((category) => (
        <section key={category.slug} className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
                {category.title}
              </p>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
            <Link
              href={`/${category.slug}`}
              className="text-sm font-semibold text-gray-300 transition hover:text-white"
            >
              View all {category.title.toLowerCase()} tools &rarr;
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {category.tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card title={tool.title} className="h-full cursor-pointer">
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
