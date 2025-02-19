"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TemplateCard({ title, image, onPreview, onUse }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Card
        className="relative overflow-hidden w-[338px] h-[226px] bg-[#F9F9F9] group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4 h-full flex items-center justify-center">
          <div className="relative w-[90%] h-[90%]">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
            {isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-200">
                <Button
                  variant="secondary"
                  onClick={onPreview}
                  className="text-sm font-medium bg-white hover:bg-white/90"
                >
                  Preview
                </Button>
                <Button onClick={onUse} className="bg-[#383268] hover:bg-[#383268]/90 text-sm font-medium">
                  Use Template
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="px-1">
        <h3 className="font-general-sans text-[20px] leading-[30px] font-medium text-[#1A1A1A]">{title}</h3>
      </div>
    </div>
  )
}

