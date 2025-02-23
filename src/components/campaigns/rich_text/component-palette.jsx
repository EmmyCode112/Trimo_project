// import { useDraggable } from "@dnd-kit/core"
// import { AlignCenter, Code, ImageIcon, LayoutList, MessageSquare, Plus, Star, Type } from "lucide-react"

// const components = [
//   { id: "title", icon: Type, label: "Title" },
//   { id: "paragraph", icon: LayoutList, label: "Paragraph" },
//   { id: "image", icon: ImageIcon, label: "Image" },
//   { id: "button", icon: MessageSquare, label: "Button" },
//   { id: "divider", icon: AlignCenter, label: "Divider" },
//   { id: "html", icon: Code, label: "HTML" },
//   { id: "social", icon: Plus, label: "Social" },
//   { id: "icon", icon: Star, label: "Icon" },
// ]

// function DraggableComponent({ id, icon: Icon, label }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: id,
//   })

//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className="flex flex-col items-center gap-1 rounded-lg border p-3 hover:bg-accent cursor-move"
//     >
//       <div className="rounded-md border p-2">
//         <Icon className="h-4 w-4" />
//       </div>
//       <span className="text-xs">{label}</span>
//     </div>
//   )
// }

// export function ComponentPalette() {
//   return (
//     <div className="grid grid-cols-2 gap-2">
//       {components.map((component) => (
//         <DraggableComponent key={component.id} {...component} />
//       ))}
//     </div>
//   )
// }

