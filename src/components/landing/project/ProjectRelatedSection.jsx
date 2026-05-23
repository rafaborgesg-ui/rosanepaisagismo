import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { labelClass } from "@/components/landing/project/projectShared";

export default function ProjectRelatedSection({ relatedProjects = [] }) {
  return (
    <section className="bg-[#f3eee4] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_0.3fr] lg:items-end">
          <div className="max-w-4xl">
            <p className={labelClass}>Outros projetos</p>
            <h2 className="mt-5 font-heading text-[clamp(3rem,6.4vw,6.6rem)] font-medium leading-[0.9] text-[#111913]">
              Continue explorando a curadoria.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="rb-premium-focus inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#111913] transition hover:text-[#8a6e42] lg:justify-self-end"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid border-t border-[#d8cdbb] lg:grid-cols-3">
          {relatedProjects.map((item, index) => (
            <Link
              key={item.slug}
              to={`/portfolio/${item.slug}`}
              className="rb-premium-focus group border-b border-[#d8cdbb] py-7 transition duration-300 hover:bg-[#ebe2d3]/60 lg:border-r lg:px-7 lg:last:border-r-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111913]">
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-90 grayscale-[8%] transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <div className="pt-5">
                <p className={labelClass}>{item.category}</p>
                <h3 className="mt-3 font-heading text-4xl font-medium leading-none text-[#111913]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4b5248]">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
