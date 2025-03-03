"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ColorPicker } from "../color-picker"

export default function SettingTab({ template, selectedElement, updateElement, updateSettings }) {
  const [selectedElementData, setSelectedElementData] = useState(null)

  useEffect(() => {
    if (selectedElement) {
      const element = template.elements.find((el) => el.id === selectedElement)
      if (element) {
        setSelectedElementData(element)
      }
    } else {
      setSelectedElementData(null)
    }
  }, [selectedElement, template.elements])

  if (!selectedElementData) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-[#484848] uppercase">General Options</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#484848] font-normal text-sm">Content Area Width</Label>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-1">
                        <Slider
                          defaultValue={[template.settings.contentWidth]}
                          min={300}
                          max={800}
                          step={10}
                          onValueChange={(value) => updateSettings({ contentWidth: value[0] })}
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-[#fff] mt-3"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      {template.settings.contentWidth}px
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="space-y-2 flex items-center justify-between">
              <Label className="text-[#484848] font-normal text-sm">Content Area Width</Label>
              <div className="flex items-center h-[40px] w-[204px] border border-[#F1F1F1] rounded-[8px]">
                {["left", "center", "right"].map((align) => (
                  <Button
                    key={align}
                    variant={template.settings.alignment === align ? "default" : "outline"}
                    size="sm"
                    className={`capitalize h-full rounded-none w-full ${
                      template.settings.alignment === align
                        ? "bg-[#383268] hover:bg-[#2a2550] text-white"
                        : "text-[#484848]"
                    }`}
                    onClick={() => updateSettings({ alignment: align })}
                  >
                    {align}
                  </Button>
                ))}
              </div>
            </div>

            <ColorPicker
              label="Background Color"
              value={template.settings.backgroundColor}
              onChange={(value) => updateSettings({ backgroundColor: value })}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[#484848] font-normal text-sm">Content Area Background Color</Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#484848]"
                  onClick={() => updateSettings({ backgroundColor: "transparent" })}
                >
                  Transparent
                </Button>
              </div>
              {/* <ColorPicker
                value={template.settings.contentBackgroundColor}
                onChange={(value) => updateSettings({ contentBackgroundColor: value })}
              /> */}
            </div>

            <div className="space-y-2 flex items-center justify-between">
              <Label className="text-[#484848] whitespace-nowrap font-normal text-sm">Background Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer w-[170px] text-[#484848]"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        const result = e.target?.result
                        updateSettings({ backgroundImage: result })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 flex items-center justify-between">
              <Label className="text-[#484848] whitespace-nowrap font-normal text-sm">Font Type</Label>
              <Select
                defaultValue={template.settings.fontType}
                onValueChange={(value) => updateSettings({ fontType: value })}
              >
                <SelectTrigger className="text-[#484848] w-[190px]">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ColorPicker
              label="Link Color"
              value={template.settings.linkColor}
              onChange={(value) => updateSettings({ linkColor: value })}
            />
          </div>
        </div>
      </div>
    )
  }

  // Element-specific settings
  switch (selectedElementData.type) {
    case "title":
    case "paragraph":
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Text Settings</h3>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              defaultValue={[Number.parseInt(selectedElementData.styles.fontSize) || 16]}
              min={8}
              max={72}
              step={1}
              onValueChange={(value) => {
                updateElement(selectedElementData.id, {
                  styles: { ...selectedElementData.styles, fontSize: `${value[0]}px` },
                });
              }}
            />
          </div>
          <ColorPicker
            label="Text Color"
            value={selectedElementData.styles.color || "#484848"}
            onChange={(value) => {
              updateElement(selectedElementData.id, {
                styles: { ...selectedElementData.styles, color: value },
              });
            }}
          />
          <div className="space-y-2">
            <Label>Font Weight</Label>
            <Select
              value={selectedElementData.styles.fontWeight || "normal"}
              onValueChange={(value) => {
                updateElement(selectedElementData.id, {
                  styles: { ...selectedElementData.styles, fontWeight: value },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="bolder">Bolder</SelectItem>
                <SelectItem value="lighter">Lighter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    case "button":
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Button Settings</h3>
          <ColorPicker
            label="Background Color"
            value={selectedElementData.styles.backgroundColor || "#383268"}
            onChange={(value) => {
              updateElement(selectedElementData.id, {
                styles: { ...selectedElementData.styles, backgroundColor: value },
              });
            }}
          />
          <ColorPicker
            label="Text Color"
            value={selectedElementData.styles.color || "#ffffff"}
            onChange={(value) => {
              updateElement(selectedElementData.id, {
                styles: { ...selectedElementData.styles, color: value },
              });
            }}
          />
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Slider
              defaultValue={[Number.parseInt(selectedElementData.styles.borderRadius) || 4]}
              min={0}
              max={20}
              step={1}
              onValueChange={(value) => {
                updateElement(selectedElementData.id, {
                  styles: { ...selectedElementData.styles, borderRadius: `${value[0]}px` },
                });
              }}
            />
          </div>
        </div>
      );
    case "image":
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Image Settings</h3>
          <div className="space-y-2">
            <Label>Alt Text</Label>
            <Input
              value={selectedElementData.styles.alt || ""}
              onChange={(e) => {
                updateElement(selectedElementData.id, {
                  styles: { ...selectedElementData.styles, alt: e.target.value },
                });
              }}
              placeholder="Enter alt text"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}