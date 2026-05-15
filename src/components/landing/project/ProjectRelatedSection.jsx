import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { labelClass } from "@/components/landing/project/projectShared";

export default function ProjectRelatedSection({ relatedProjects = [] }) {
  return (
    <section className="bg-white px-4 py-20 md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className={labelClass}>Outros projetos</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
              Continue explorando a curadoria.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#171914] transition hover:text-[#6f7b5f]"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link
              key={item.slug}
              to={`/portfolio/${item.slug}`}
              className="group overflow-hidden rounded-[8px] border border-[#dfd9cc] bg-[#f8f6f2] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(36,35,28,0.12)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#171914]">
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className={labelClass}>{item.category}</p>
                <h3 className="mt-2 font-heading text-2xl font-medium tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f665c]">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
