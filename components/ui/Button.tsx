import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "dark";
};

const variants = {
  primary: "bg-alma-blue text-white hover:bg-alma-dark focus-visible:outline-alma-blue",
  secondary:
    "border border-alma-line bg-white text-alma-ink hover:border-alma-blue hover:text-alma-blue focus-visible:outline-alma-blue",
  dark: "bg-white text-alma-ink hover:bg-alma-light focus-visible:outline-white",
};

export function Button({ children, href, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-px ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
