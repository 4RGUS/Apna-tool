// lib/emi.ts
export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
) {
  if (principal <= 0 || annualRatePercent < 0 || tenureMonths <= 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  const r = annualRatePercent / 12 / 100; // monthly rate

  // Zero interest edge case
  if (r === 0) {
    const emi = principal / tenureMonths;
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - principal;

    return { emi, totalPayment, totalInterest };
  }

  const numerator = principal * r * Math.pow(1 + r, tenureMonths);
  const denominator = Math.pow(1 + r, tenureMonths) - 1;

  const emi = numerator / denominator;
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}
