import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          className="w-10 h-10 p-1"
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={value}
          className="flex-1"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}