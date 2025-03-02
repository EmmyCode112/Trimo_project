"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "../color-picker";

export default function SettingTab({ template, selectedElement, updateElement, updateSettings }) {
  const [selectedElementData, setSelectedElementData] = useState(null);

  useEffect(() => {
    if (selectedElement) {
      const element = template.elements.find((el) => el.id === selectedElement);
      if (element) {
        setSelectedElementData(element);
      }
    } else {
      setSelectedElementData(null);
    }
  }, [selectedElement, template.elements]);

  const handleContentWidthChange = (value) => {
    updateSettings({ contentWidth: value[0] });
  };

  const handleAlignmentChange = (value) => {
    updateSettings({ alignment: value });
  };

  const handleBackgroundColorChange = (value) => {
    updateSettings({ backgroundColor: value });
  };

  const handleFontTypeChange = (value) => {
    updateSettings({ fontType: value });
  };

  const handleLinkColorChange = (value) => {
    updateSettings({ linkColor: value });
  };

  if (!selectedElementData) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase">General Options</h3>

          <div className="space-y-2">
            <Label>Content Area Width</Label>
            <div className="flex items-center gap-2">
              <Slider
                defaultValue={[template.settings.contentWidth]}
                min={300}
                max={800}
                step={10}
                onValueChange={handleContentWidthChange}
                className="flex-1"
              />
              <span className="text-sm w-12">{template.settings.contentWidth}px</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Content Alignment</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={template.settings.alignment === "left" ? "default" : "outline"}
                size="sm"
                className={template.settings.alignment === "left" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
                onClick={() => handleAlignmentChange("left")}
              >
                Left
              </Button>
              <Button
                variant={template.settings.alignment === "center" ? "default" : "outline"}
                size="sm"
                className={template.settings.alignment === "center" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
                onClick={() => handleAlignmentChange("center")}
              >
                Center
              </Button>
              <Button
                variant={template.settings.alignment === "right" ? "default" : "outline"}
                size="sm"
                className={template.settings.alignment === "right" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
                onClick={() => handleAlignmentChange("right")}
              >
                Right
              </Button>
            </div>
          </div>

          <ColorPicker
            label="Background Color"
            value={template.settings.backgroundColor}
            onChange={handleBackgroundColorChange}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Content Area Background Color</Label>
              <Button variant="outline" size="sm" onClick={() => updateSettings({ backgroundColor: "transparent" })}>
                Transparent
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Background Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result;
                    updateSettings({ backgroundImage: result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Font Type</Label>
            <Select defaultValue={template.settings.fontType} onValueChange={handleFontTypeChange}>
              <SelectTrigger>
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

          <ColorPicker label="Link Color" value={template.settings.linkColor} onChange={handleLinkColorChange} />
        </div>
      </div>
    );
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