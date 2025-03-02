import React from "react";
import { useDrag } from "react-dnd";
import { Type, AlignLeft, List, ImageIcon, Square, SeparatorHorizontal, Code, Share2, Star } from "lucide-react";

export default function ContentTab({ addElement }) {
  const elements = [
    { type: "title", icon: <Type className="h-6 w-6" />, label: "Title" },
    { type: "paragraph", icon: <AlignLeft className="h-6 w-6" />, label: "Paragraph" },
    { type: "list", icon: <List className="h-6 w-6" />, label: "List" },
    { type: "image", icon: <ImageIcon className="h-6 w-6" />, label: "Image" },
    { type: "button", icon: <Square className="h-6 w-6" />, label: "Button" },
    { type: "divider", icon: <SeparatorHorizontal className="h-6 w-6" />, label: "Divider" },
    { type: "html", icon: <Code className="h-6 w-6" />, label: "HTML" },
    { type: "social", icon: <Share2 className="h-6 w-6" />, label: "Social" },
    { type: "icon", icon: <Star className="h-6 w-6" />, label: "Icon" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {elements.map((element) => (
        <DraggableElement
          key={element.type}
          type={element.type}
          icon={element.icon}
          label={element.label}
          addElement={addElement}
        />
      ))}
    </div>
  );
}

function DraggableElement({ type, icon, label, addElement }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && dropResult.name === "Canvas") {
        addElement(type);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md cursor-move hover:border-[#383268] transition-colors"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => addElement(type)}
    >
      {icon}
      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
}