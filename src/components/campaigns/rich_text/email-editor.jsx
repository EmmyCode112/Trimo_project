// import { useDroppable } from "@dnd-kit/core"
// import { useSortable } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
// import { useEmailStore } from "@/lib/store"

// function Block({ block, index }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: block.id,
//   })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group cursor-move">
//       {/* Render different block types */}
//       {block.type === "heading" && <h1 className="text-4xl font-bold text-center mb-4">{block.content}</h1>}
//       {block.type === "navigation" && (
//         <nav className="flex justify-center gap-8 mb-8">
//           {block.content.map((item, i) => (
//             <a key={i} href="#" className="hover:text-primary">
//               {item}
//             </a>
//           ))}
//         </nav>
//       )}
//       {/* Add more block type renderers */}

//       <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex gap-2">
//         <button className="p-1 hover:bg-accent rounded">Edit</button>
//         <button className="p-1 hover:bg-accent rounded">Delete</button>
//       </div>
//     </div>
//   )
// }

// export function EmailEditor({ deviceView }) {
//   const { emailContent } = useEmailStore()
//   const { setNodeRef } = useDroppable({
//     id: "email-editor",
//   })

//   return (
//     <div
//       ref={setNodeRef}
//       className={`mx-auto h-full overflow-auto p-4 ${deviceView === "mobile" ? "max-w-sm" : "max-w-4xl"}`}
//     >
//       {emailContent.blocks.map((block, index) => (
//         <Block key={block.id} block={block} index={index} />
//       ))}
//     </div>
//   )
// }

