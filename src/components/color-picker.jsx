import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2 flex items-center justify-between">
      <Label className="whitespace-nowrap font-normal text-sm text-[#484848]">{label}</Label>
      <div className="flex items-center gap-1 bg-black w-[184px] h-[48px] rounded-[10px] border border-[#F1F1F1] bg-white p-[5px]">
        <Input
          type="color"
          value={value}
          className="w-[38px] h-[38px] rounded-[10px] border border-[#F1F1F1] p-1"
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={value}
          className="flex-1 text-[#3F3E3E] font-medium text-sm"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}