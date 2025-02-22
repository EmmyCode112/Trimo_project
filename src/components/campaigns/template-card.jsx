"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TemplateCard({ title, image, onPreview, onUse }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Card
        className="relative overflow-hidden w-[338px] border-none outline-none shadow-none  h-[181px] bg-[#FAFAFA] group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
            {isHovered && (
              <div className="absolute inset-0 bg-[#C7C7C74D] backdrop-blur-[70px] flex items-center justify-center gap-3 transition-all duration-200">
                <Button
                  onClick={onPreview}
                  className="bg-white text-[#383268] font-medium text-[16px] hover:scale-105 hover:bg-white transition-all duration-200 border border-[#C1BFD0] w-[95px] h-[44px]"
                >
                  Preview
                </Button>
                <Button onClick={onUse} className="bg-[#383268] hover:bg-[#383268]/90 text-[16px] text-white w-[138px] h-[44px] font-medium transition-all duration-200">
                  Use Template
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="px-1">
        <h3 className="font-general-sans text-[18px] leading-[30px] font-semibold text-[#484848]">{title}</h3>
      </div>
    </div>
  )
}