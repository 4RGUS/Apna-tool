import Link from "next/link";

type Props = {
  href?: string;
  label?: string;
  className?: string;
};

export function BackLink({
  href = "/",
  label = "Back to all tools",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition hover:text-white ${className}`}
    >
      <span aria-hidden="true" className="text-base leading-none">
        &larr;
      </span>
      {label}
    </Link>
  );
}
