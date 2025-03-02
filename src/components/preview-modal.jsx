import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";

export default function PreviewModal({ template, onDownload }) {
  const [viewMode, setViewMode] = useState("desktop");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="sm"
              className={viewMode === "desktop" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="sm"
              className={viewMode === "mobile" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div
            className={`mx-auto bg-white shadow-md transition-all ${viewMode === "mobile" ? "max-w-[375px]" : ""}`}
            style={{
              width: viewMode === "mobile" ? "375px" : `${template.settings.contentWidth}px`,
              maxWidth: "100%",
              minHeight: "500px",
              backgroundColor: template.settings.backgroundColor,
              backgroundImage: template.settings.backgroundImage ? `url(${template.settings.backgroundImage})` : "none",
              fontFamily: template.settings.fontType,
              textAlign: template.settings.alignment,
            }}
          >
            {/* Render email content here */}
            {template.elements.map((element) => (
              <div key={element.id} style={element.styles}>
                {element.content}
              </div>
            ))}

            {template.rows.map((row) => (
              <div key={row.id} className="my-4">
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${row.columns}, 1fr)`,
                  }}
                >
                  {Array.from({ length: row.columns }).map((_, colIndex) => (
                    <div key={`${row.id}-col-${colIndex}`} className="p-2">
                      {row.elements[colIndex]?.map((element) => (
                        <div key={element.id} style={element.styles}>
                          {element.content}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onDownload}>Download HTML</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}