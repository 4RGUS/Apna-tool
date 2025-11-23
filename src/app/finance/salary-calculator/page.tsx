// app/finance/salary-calculator/page.tsx
"use client";

import React, { useState } from "react";
import {
  calculateSalaryComparison,
  SalaryInput,
} from "../../../../lib/salary";
import { newRegimeConfig, oldRegimeConfig } from "../../../../lib/taxRules";
import { Card } from "../../../../components/Card";
import { InputField } from "../../../../components/InputField";
import { ResultRow } from "../../../../components/ResultRow";
import { BackLink } from "../../../../components/BackLink";

function formatCurrency(value: number) {
  if (!isFinite(value)) return "₹0";
  return `₹${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function SalaryCalculatorPage() {
  const [annualCtc, setAnnualCtc] = useState("1200000");
  const [standardDeduction, setStandardDeduction] = useState("50000");
  const [otherDeductions, setOtherDeductions] = useState("150000");

  const input: SalaryInput = {
    annualCtc: Number(annualCtc) || 0,
    standardDeduction: Number(standardDeduction) || 0,
    otherDeductions: Number(otherDeductions) || 0,
  };

  const result = calculateSalaryComparison(
    input,
    oldRegimeConfig,
    newRegimeConfig
  );

  const betterRegime =
    result.taxOld < result.taxNew ? "Old Regime" : "New Regime";

  return (
    <div className="space-y-6">
      <BackLink href="/finance" label="Back to finance tools" />
      <h2 className="text-2xl font-semibold tracking-tight">
        Salary &amp; Tax Calculator (India)
      </h2>
      <p className="text-sm text-gray-400">
        Rough estimation of your income tax under the old vs new regime and an
        approximate in-hand monthly amount. Values are simplified and may not
        match exact IT rules.
      </p>

      <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
        <Card title="Salary Details">
          <div className="space-y-4">
            <InputField
              label="Annual CTC"
              value={annualCtc}
              onChange={setAnnualCtc}
              suffix="₹"
            />
            <InputField
              label="Standard deduction"
              value={standardDeduction}
              onChange={setStandardDeduction}
              suffix="₹"
            />
            <InputField
              label="Other deductions (80C etc.)"
              value={otherDeductions}
              onChange={setOtherDeductions}
              suffix="₹"
            />
            <p className="text-xs text-gray-500">
              This is a simplified calculation. HRA, exemptions, cess and
              surcharge etc. are not fully modelled.
            </p>
          </div>
        </Card>

        <Card title="Comparison">
          <div className="space-y-3">
            <ResultRow
              label="Tax (Old regime)"
              value={formatCurrency(result.taxOld)}
            />
            <ResultRow
              label="Tax (New regime)"
              value={formatCurrency(result.taxNew)}
            />
            <ResultRow
              label="Net annual (Old)"
              value={formatCurrency(result.netAnnualOld)}
            />
            <ResultRow
              label="Net annual (New)"
              value={formatCurrency(result.netAnnualNew)}
            />
            <ResultRow
              label="Net monthly (Old)"
              value={formatCurrency(result.netMonthlyOld)}
            />
            <ResultRow
              label="Net monthly (New)"
              value={formatCurrency(result.netMonthlyNew)}
            />
            <div className="mt-2 rounded-lg bg-gray-800/60 px-3 py-2 text-xs text-gray-200">
              Based on this rough estimate,{" "}
              <span className="font-semibold">{betterRegime}</span> looks
              slightly better for you. Please verify with a CA or up-to-date tax
              calculator before deciding your regime.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
