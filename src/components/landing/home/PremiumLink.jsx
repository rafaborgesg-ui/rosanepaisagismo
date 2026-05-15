import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PremiumLink({
  to = "",
  href = "",
  children,
  variant = "dark",
  className = "",
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition duration-300 hover:-translate-y-0.5";
  const variants = {
    dark: "bg-[#111913] text-white hover:bg-[#203126]",
    light: "bg-white text-[#111913] hover:bg-[#e7dcc9]",
    outline: "border border-white/34 text-white hover:bg-white/10",
  };

  const content = (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <Link to={to}>{content}</Link>;
}
