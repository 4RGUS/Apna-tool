// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apna Tools – Salary & EMI Calculators",
  description:
    "Simple Indian salary, tax and EMI calculators to estimate in-hand income and loan EMIs quickly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Apna Tools</h1>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-8 border-t border-gray-800 pt-4 text-xs text-gray-500">
            <p>
              Disclaimer: This is an approximate calculator for educational use
              only. Please consult a professional for tax or financial advice.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
