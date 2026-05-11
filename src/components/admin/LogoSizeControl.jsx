import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ZoomIn } from "lucide-react";

export default function LogoSizeControl({ label, value = 100, onChange }) {
  return (
    <div className="space-y-3 p-4 bg-stone-50 rounded-lg border border-stone-100">
      <div className="flex items-center gap-2 mb-2">
        <ZoomIn className="w-4 h-4 text-[#276a4d]" />
        <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">{label}</Label>
      </div>
      
      <Slider
        min={50}
        max={200}
        step={5}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        className="w-full"
      />
      
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-stone-400">50%</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#276a4d]">{value}%</span>
          <Input
            type="number"
            min={50}
            max={200}
            step={5}
            value={value}
            onChange={(e) => onChange(Math.min(200, Math.max(50, parseInt(e.target.value) || 50)))}
            className="w-16 text-xs h-8"
          />
        </div>
        <span className="text-xs text-stone-400">200%</span>
      </div>
    </div>
  );
}
