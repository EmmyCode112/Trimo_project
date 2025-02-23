import { Dialog, DialogContent } from "@/components/ui/dialog"

export function PreviewModal({ open, onOpenChange, content, deviceView }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <div className={deviceView === "mobile" ? "max-w-sm mx-auto" : ""}>
          {/* Render preview content */}
          <div className="prose max-w-none">
            {content.blocks.map((block) => (
              <div key={block.id}>
                {block.type === "heading" && <h1 className="text-4xl font-bold text-center">{block.content}</h1>}
                {block.type === "navigation" && (
                  <nav className="flex justify-center gap-8">
                    {block.content.map((item, i) => (
                      <a key={i} href="#" className="hover:text-primary">
                        {item}
                      </a>
                    ))}
                  </nav>
                )}
                {/* Add more preview renderers */}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

