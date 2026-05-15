import { ArrowRight } from "lucide-react";

export default function MobileConciergeBar({
  href = "#contato-concierge",
  label = "Iniciar avaliação",
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9d1bf] bg-[#f4f0e8]/96 p-3 backdrop-blur md:hidden">
      <a
        href={href}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#171914] px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#2a332a]"
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
