// app/emi-calculator/page.tsx
"use client";

import React, { useState } from "react";
import { calculateEmi } from "../../../lib/emi";
import { Card } from "../../../components/Card";
import { InputField } from "../../../components/InputField";
import { ResultRow } from "../../../components/ResultRow";
import { BackLink } from "../../../components/BackLink";

function formatCurrency(value: number) {
  if (!isFinite(value)) return "₹0";
  return `₹${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState("2000000");
  const [rate, setRate] = useState("8.5");
  const [tenureYears, setTenureYears] = useState("20");

  const p = Number(principal) || 0;
  const r = Number(rate) || 0;
  const y = Number(tenureYears) || 0;
  const tenureMonths = y * 12;

  const { emi, totalPayment, totalInterest } = calculateEmi(p, r, tenureMonths);

  return (
    <div className="space-y-6">
      <BackLink />
      <h2 className="text-2xl font-semibold tracking-tight">EMI Calculator</h2>
      <p className="text-sm text-gray-400">
        Estimate your monthly EMI, total interest and total payment for home,
        car or personal loans.
      </p>

      <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
        <Card title="Loan Details">
          <div className="space-y-4">
            <InputField
              label="Loan amount"
              value={principal}
              onChange={setPrincipal}
              suffix="₹"
              placeholder="e.g. 2500000"
            />
            <InputField
              label="Interest rate (per annum)"
              value={rate}
              onChange={setRate}
              suffix="%"
              placeholder="e.g. 8.5"
            />
            <InputField
              label="Tenure (years)"
              value={tenureYears}
              onChange={setTenureYears}
              suffix="years"
              placeholder="e.g. 20"
            />
            <p className="text-xs text-gray-500">
              This is an approximate EMI. Actual values may differ based on your
              bank&apos;s compounding and charges.
            </p>
          </div>
        </Card>

        <Card title="Result">
          <div className="space-y-3">
            <ResultRow label="Monthly EMI" value={formatCurrency(emi || 0)} />
            <ResultRow
              label="Total interest payable"
              value={formatCurrency(totalInterest || 0)}
            />
            <ResultRow
              label="Total amount payable"
              value={formatCurrency(totalPayment || 0)}
            />
            <ResultRow label="Tenure" value={`${tenureMonths || 0} months`} />
          </div>
        </Card>
      </div>
    </div>
  );
}
