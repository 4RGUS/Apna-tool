// components/ResultRow.tsx
import React from "react";

type Props = {
  label: string;
  value: string;
};

export function ResultRow({ label, value }: Props) {
  return (
    <div className="flex justify-between text-sm text-gray-200">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
