import BeforeAfterSlider from "@/components/landing/BeforeAfterSlider";

const defaultBeforeAfter = {
  before: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg",
  after: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p4_i2.jpg",
  labelBefore: "Antes",
  labelAfter: "Depois",
};

export default function TransformationSection({ project = null }) {
  const beforeAfter = project?.beforeAfter || defaultBeforeAfter;

  return (
    <section className="bg-[#101812] px-4 py-16 md:py-24">
      <div className="mx-auto w-[min(100%,1180px)]">
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
