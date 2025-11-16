// components/Card.tsx
import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-gray-800 bg-gray-900/80 p-4 shadow-sm ${className}`}
    >
      {title && (
        <h2 className="mb-3 text-lg font-semibold text-gray-100">{title}</h2>
      )}
      {children}
    </div>
  );
}
