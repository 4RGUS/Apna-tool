// components/InputField.tsx
import React from "react";

type Props = {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
};

export function InputField({
  label,
  type = "number",
  value,
  onChange,
  placeholder,
  suffix,
}: Props) {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-200">
      <span>{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-3 py-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base text-gray-100 outline-none"
        />
        {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
      </div>
    </label>
  );
}
