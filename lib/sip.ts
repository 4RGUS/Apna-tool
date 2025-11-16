// lib/sip.ts
export function calculateSipFutureValue(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number
) {
  if (monthlyInvestment <= 0 || annualReturnPercent < 0 || years <= 0) {
    return { totalInvested: 0, futureValue: 0 };
  }

  const r = annualReturnPercent / 12 / 100; // monthly rate
  const n = years * 12;

  // Zero return edge case
  if (r === 0) {
    const totalInvested = monthlyInvestment * n;
    return { totalInvested, futureValue: totalInvested };
  }

  const futureValue =
    monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  const totalInvested = monthlyInvestment * n;
  return { totalInvested, futureValue };
}
