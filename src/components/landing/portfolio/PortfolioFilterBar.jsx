export default function PortfolioFilterBar({
  filter,
  setFilter,
  categories = [],
}) {
  return (
    <section className="sticky top-[76px] z-30 border-b border-[#d8cdbb]/70 bg-[#f3eee4]/86 px-5 py-3 backdrop-blur-xl md:top-[88px] md:px-10 md:py-4">
      <div className="mx-auto flex w-[min(100%,1320px)] items-center gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5">
        <p className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8a6e42] md:text-[0.62rem]">
          Acervo
        </p>
        <div className="flex min-w-max items-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] transition duration-300 md:px-5 md:py-3 md:text-[0.64rem] ${
                filter === category
                  ? "border-[#111913] bg-[#111913] text-white"
                  : "border-[#d8cdbb]/80 bg-white/24 text-[#4b5248] hover:border-[#8a6e42] hover:bg-white/44 hover:text-[#111913]"
              }`}
            >
              <span className={`mr-2 ${filter === category ? "text-[#d3b473]" : "text-[#8a6e42]"}`}>
                {String(index).padStart(2, "0")}
              </span>
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
