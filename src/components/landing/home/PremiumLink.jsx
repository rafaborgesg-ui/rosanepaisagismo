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
    "group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-all duration-500 hover:-translate-y-0.5";
  const variants = {
    dark: "bg-[#111913] text-white hover:bg-[#1e2d22] hover:shadow-[0_8px_32px_rgba(17,25,19,0.28)]",
    light: "bg-white text-[#111913] hover:bg-[#f5e6c8] hover:shadow-[0_8px_32px_rgba(211,180,115,0.18)]",
    outline: "border border-white/28 text-white hover:border-[#d3b473]/52 hover:bg-[#d3b473]/8",
    ghost: "text-[#8a6e42] hover:text-[#d3b473] hover:bg-[#d3b473]/6",
  };

  const content = (
    <span className={`${base} ${variants[variant] || variants.dark} ${className}`}>
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-1" aria-hidden="true" />
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
