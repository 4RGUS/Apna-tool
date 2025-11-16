// app/sip-calculator/page.tsx
"use client";

import React, { useState } from "react";
import { calculateSipFutureValue } from "../../../lib/sip";
import { Card } from "../../../components/Card";
import { InputField } from "../../../components/InputField";
import { ResultRow } from "../../../components/ResultRow";
import { BackLink } from "../../../components/BackLink";

function formatCurrency(value: number) {
  if (!isFinite(value)) return "₹0";
  return `₹${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("15");

  const m = Number(monthlyInvestment) || 0;
  const r = Number(rate) || 0;
  const y = Number(years) || 0;

  const { totalInvested, futureValue } = calculateSipFutureValue(m, r, y);

  return (
    <div className="space-y-6">
      <BackLink />
      <h2 className="text-2xl font-semibold tracking-tight">SIP Calculator</h2>
      <p className="text-sm text-gray-400">
        Estimate the future value of your monthly SIP investments for Indian
        mutual funds.
      </p>

      <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
        <Card title="SIP Details">
          <div className="space-y-4">
            <InputField
              label="Monthly investment"
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              suffix="₹"
              placeholder="e.g. 5000"
            />
            <InputField
              label="Expected return (per annum)"
              value={rate}
              onChange={setRate}
              suffix="%"
              placeholder="e.g. 12"
            />
            <InputField
              label="Investment period"
              value={years}
              onChange={setYears}
              suffix="years"
              placeholder="e.g. 15"
            />
            <p className="text-xs text-gray-500">
              Actual returns will vary. This is only an illustrative projection.
            </p>
          </div>
        </Card>

        <Card title="Result">
          <div className="space-y-3">
            <ResultRow
              label="Total invested"
              value={formatCurrency(totalInvested || 0)}
            />
            <ResultRow
              label="Estimated future value"
              value={formatCurrency(futureValue || 0)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
