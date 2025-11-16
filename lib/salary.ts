// lib/salary.ts
import { TaxConfig } from "./taxRules";

export function calculateTaxFromSlabs(
  taxableIncome: number,
  config: TaxConfig
) {
  let remaining = taxableIncome;
  let lastLimit = 0;
  let tax = 0;

  for (const slab of config.slabs) {
    const upper = slab.upTo ?? Infinity;
    if (taxableIncome <= lastLimit || remaining <= 0) break;

    const taxableAtThisRate = Math.min(upper - lastLimit, remaining);
    if (taxableAtThisRate > 0) {
      tax += taxableAtThisRate * (slab.rate / 100);
      remaining -= taxableAtThisRate;
    }
    lastLimit = upper;
  }

  return Math.max(0, tax);
}

export interface SalaryInput {
  annualCtc: number;
  standardDeduction: number;
  otherDeductions: number; // 80C etc lump sum
}

export interface SalaryResult {
  taxableIncomeOld: number;
  taxableIncomeNew: number;
  taxOld: number;
  taxNew: number;
  netAnnualOld: number;
  netAnnualNew: number;
  netMonthlyOld: number;
  netMonthlyNew: number;
}

export function calculateSalaryComparison(
  input: SalaryInput,
  oldConfig: TaxConfig,
  newConfig: TaxConfig
): SalaryResult {
  const { annualCtc, standardDeduction, otherDeductions } = input;

  const totalDeductions = Math.max(0, standardDeduction + otherDeductions);

  // Super simplified assumption for v1:
  // Same deductions allowed in both. You can refine later.
  const taxableIncomeOld = Math.max(0, annualCtc - totalDeductions);
  const taxableIncomeNew = Math.max(0, annualCtc - standardDeduction); // new regime usually has fewer deductions

  const taxOld = calculateTaxFromSlabs(taxableIncomeOld, oldConfig);
  const taxNew = calculateTaxFromSlabs(taxableIncomeNew, newConfig);

  const netAnnualOld = annualCtc - taxOld;
  const netAnnualNew = annualCtc - taxNew;

  const netMonthlyOld = netAnnualOld / 12;
  const netMonthlyNew = netAnnualNew / 12;

  return {
    taxableIncomeOld,
    taxableIncomeNew,
    taxOld,
    taxNew,
    netAnnualOld,
    netAnnualNew,
    netMonthlyOld,
    netMonthlyNew,
  };
}
