import { MapPin, Ruler, Sparkles } from "lucide-react";

export const labelClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f7b55]";

export function getProjectFacts(project) {
  return [
    { icon: MapPin, label: "Local", value: project.location },
    { icon: Ruler, label: "Área", value: project.area },
    { icon: Sparkles, label: "Escopo", value: project.scope },
  ];
}
