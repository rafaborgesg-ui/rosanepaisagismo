import { Filter } from "lucide-react";

export default function PortfolioFilterBar({
  filter,
  setFilter,
  categories = [],
}) {
  return (
    <section className="sticky top-[72px] z-30 border-b border-[#dfd9cc] bg-[#f8f6f2]/92 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(100%,1180px)] items-center gap-3 overflow-x-auto">
        <Filter className="h-4 w-4 shrink-0 text-[#8f7b55]" aria-hidden="true" />
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`whitespace-nowrap rounded-full px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition ${
              filter === category
                ? "bg-[#171914] text-white"
                : "bg-white text-[#5f665c] hover:bg-[#e8e2d5] hover:text-[#171914]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
