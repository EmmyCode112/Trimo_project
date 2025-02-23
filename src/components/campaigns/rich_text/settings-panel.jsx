import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export function SettingsPanel() {
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label>Content Area Width</Label>
        <Slider defaultValue={[10]} max={100} step={1} />
        <div className="text-right text-sm text-muted-foreground">10px</div>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <RadioGroup defaultValue="left" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="left" id="left" />
            <Label htmlFor="left">Left</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="center" />
            <Label htmlFor="center">Center</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="right" id="right" />
            <Label htmlFor="right">Right</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <Input value="#ffffff" />
          <div className="h-10 w-10 rounded-md border bg-white" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Content Area Background Color</Label>
        <div className="flex gap-2">
          <Input value="transparent" />
          <div className="h-10 w-10 rounded-md border bg-transparent" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Font Type</Label>
        <Input value="Inter" />
      </div>

      <div className="space-y-2">
        <Label>Link Color</Label>
        <div className="flex gap-2">
          <Input value="#0068a5" />
          <div className="h-10 w-10 rounded-md border bg-[#0068a5]" />
        </div>
      </div>
    </div>
  )
}