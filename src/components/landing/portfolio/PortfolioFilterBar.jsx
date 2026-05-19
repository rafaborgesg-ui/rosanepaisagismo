export default function PortfolioFilterBar({
  filter,
  setFilter,
  categories = [],
}) {
  return (
    <section className="sticky top-[76px] z-30 border-b border-[#d8cdbb] bg-[#f3eee4]/92 px-5 py-4 backdrop-blur-xl md:top-[88px] md:px-10">
      <div className="mx-auto flex w-[min(100%,1320px)] items-center gap-5 overflow-x-auto">
        <p className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#8a6e42]">
          Filtrar acervo
        </p>
        <div className="flex min-w-max items-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap border px-5 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.14em] transition duration-300 ${
                filter === category
                  ? "border-[#111913] bg-[#111913] text-white"
                  : "border-[#d8cdbb] bg-transparent text-[#4b5248] hover:border-[#8a6e42] hover:text-[#111913]"
              }`}
            >
              <span className="mr-3 text-[#8a6e42]">{String(index).padStart(2, "0")}</span>
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
