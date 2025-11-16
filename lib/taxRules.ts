// lib/taxRules.ts

export type TaxSlab = { upTo: number | null; rate: number }; // rate in %

export interface TaxConfig {
  name: "old" | "new";
  slabs: TaxSlab[];
}

export const oldRegimeConfig: TaxConfig = {
  name: "old",
  slabs: [
    { upTo: 250_000, rate: 0 },
    { upTo: 500_000, rate: 5 },
    { upTo: 1_000_000, rate: 20 },
    { upTo: null, rate: 30 },
  ],
};

// NOTE: This is a simplified new-regime example. Update with exact FY rules as needed.
export const newRegimeConfig: TaxConfig = {
  name: "new",
  slabs: [
    { upTo: 300_000, rate: 0 },
    { upTo: 700_000, rate: 5 },
    { upTo: 1_000_000, rate: 10 },
    { upTo: 1_200_000, rate: 15 },
    { upTo: 1_500_000, rate: 20 },
    { upTo: null, rate: 30 },
  ],
};
