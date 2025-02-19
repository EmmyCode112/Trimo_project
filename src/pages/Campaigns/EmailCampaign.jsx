"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TemplateCard } from "@/components/campaigns/template-card"
import { TemplatePreviewModal } from "@/components/campaigns/template-preview-modal"
import { EmailOptionCard } from "@/components/campaigns/email-option-card"
import { NewsletterTemplate } from "@/components/campaigns/templates/newsletter-template"
import { testimonial } from "@/assets/templates" 

const emailOptions = [
  {
    title: "Drag & Drop",
    description: "A block builder for responsive email no coding required",
  },
  {
    title: "Rich Text Editor",
    description: "Create basic text emails and make changes to the code if needed",
  },
  {
    title: "Code",
    description: "Build emails from code with developer tools like syntax autocomplete",
  },
]

const templates = [
  {
    id: "1",
    title: "Newsletter Template",
    image: testimonial,
    template: NewsletterTemplate,
  },
  {
    id: "2",
    title: "Menu Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "3",
    title: "Call to Action Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "4",
    title: "Product Introduction Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "5",
    title: "Discount Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "6",
    title: "Service Introduction Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "7",
    title: "Announcement Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "8",
    title: "Program Promotion Template",
    image: "/placeholder.svg?height=226&width=338",
  },
  {
    id: "9",
    title: "Resources Template",
    image: "/placeholder.svg?height=226&width=338",
  },
]

export default function CampaignPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="font-general-sans text-[20px] leading-[30px] font-medium text-[#1A1A1A] mb-2">
          Choose your email's starting place
        </h1>
        <p className="font-general-sans font-[400] text-sm leading-5 text-[#767676]">
          We have several options for building your email with vary degrees of control
        </p>
      </div>

      <div className="mb-12">
        <h2 className="font-general-sans text-[18px] leading-[28px] font-medium text-[#484848] mb-4">
          Start with existing email templates
        </h2>
        <div className="flex flex-col lg:flex-row flex-nowrap gap-4 mb-12">
          {emailOptions.map((option) => (
            <EmailOptionCard key={option.title} title={option.title} description={option.description} />
          ))}
        </div>

        <div className="flex justify-between pb-4 items-center mb-8 border-b border-b-[#F1F1F1]">
          <h2 className="font-general-sans text-[18px] leading-[28px] font-medium text-[#484848]">
            Available Templates
          </h2>
          <div className="relative max-w-[308px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A3A3A3]" />
            <Input
              placeholder="Search by name or keyword..."
              className="pl-10 h-[44px] rounded-[8px] py-[10px] outline-none ring-0 border border-[#D0D5DD] text-[#A3A3A3] font-[400] text-[16px] placeholder-[#A3A3A3]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[17px]">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              {...template}
              onPreview={() => setSelectedTemplate(template)}
              onUse={() => {
                /* Handle template use */
              }}
            />
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <TemplatePreviewModal
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onUse={() => {
            /* Handle template use */
          }}
          template={{
            title: selectedTemplate.title,
            type: "Drag & Drop Template",
            content: selectedTemplate.template ? (
              <selectedTemplate.template />
            ) : (
              <div className="aspect-[4/5] bg-gray-100 rounded-lg" />
            ),
          }}
        />
      )}
    </div>
  )
}

