"use client";

type Props = {
  message?: string;
  className?: string;
};

export function Footer({ message, className = "" }: Props) {
  if (!message) {
    return null;
  }

  return (
    <footer
      className={`mt-8 border-t border-gray-800 pt-4 text-xs text-gray-500 ${className}`}
    >
      <p>{message}</p>
    </footer>
  );
}
