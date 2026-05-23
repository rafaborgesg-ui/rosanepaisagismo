import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";

const defaultBeforeAfter = {
  before: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg",
  after: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p4_i2.jpg",
  labelBefore: "Antes",
  labelAfter: "Depois",
};

const labelClass = "text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#8f7b55]";

export default function TransformationSection({ project = null }) {
  const beforeAfter =
    project === null
      ? defaultBeforeAfter
      : project?.beforeAfter?.enabled !== false && project?.beforeAfter?.before && project?.beforeAfter?.after
        ? project.beforeAfter
        : null;

  if (!beforeAfter) return null;

  return (
    <section className="bg-[#101812] px-4 py-16 md:py-24">
      <div className="mx-auto w-[min(100%,1180px)]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-3 md:mb-12">
          <p className={labelClass}>Antes e depois</p>
          <h2 className="font-heading text-2xl font-medium leading-tight text-white md:text-3xl">
            Transformação com naturalidade.
          </h2>
        </div>

        {/* Slider */}
        <div className="rounded-[16px] bg-[#101812] shadow-[0_34px_100px_rgba(0,0,0,0.18)] md:rounded-[20px]">
          <BeforeAfterSlider
            before={beforeAfter.before}
            after={beforeAfter.after}
            labelBefore={beforeAfter.labelBefore || "Antes"}
            labelAfter={beforeAfter.labelAfter || "Depois"}
            className="rounded-[16px] md:rounded-[20px] md:aspect-[16/7]"
          />
        </div>
      </div>
    </section>
  );
}
