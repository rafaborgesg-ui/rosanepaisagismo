import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";
import { labelClass } from "@/components/landing/project/projectShared";

export default function ProjectBeforeAfterSection({ project }) {
  if (project.beforeAfter?.enabled === false || !project.beforeAfter?.before || !project.beforeAfter?.after) return null;

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto grid w-[min(100%,1180px)] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className={labelClass}>Antes e depois</p>
          <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-5xl">
            Transformação com naturalidade.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#5f665c]">
            O objetivo é revelar o potencial do imóvel com uma composição que pareça
            inevitável: integrada à arquitetura, ao uso e ao clima.
          </p>
        </div>
        <div className="overflow-hidden rounded-[8px] shadow-[0_30px_80px_rgba(36,35,28,0.14)]">
          <BeforeAfterSlider
            before={project.beforeAfter.before}
            after={project.beforeAfter.after}
            labelBefore="Antes"
            labelAfter="Depois"
          />
        </div>
      </div>
    </section>
  );
}
