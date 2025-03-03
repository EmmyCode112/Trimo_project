import React from "react";
import { useDrag } from "react-dnd";
import { Type, AlignLeft, List, ImageIcon, Square, SeparatorHorizontal, Code, Share2, Star } from "lucide-react";
import {  addCircle,
  documentCode,
  icon2,
  icon3,
  imageIcon,
  icon4,
  paragraph,
  star,
  textCreation } from "@/assets/assets";

export default function ContentTab({ addElement }) {
  const elements = [
    { type: "title", icon: <img src={addCircle} alt="alt" className="w-[48px] h-[48px]" />, label: "Title" },
    { type: "paragraph", icon: <img src={paragraph} alt="alt" className="w-[48px] h-[48px]" />, label: "Paragraph" },
    { type: "list", icon: <img src={icon4} alt="alt" className="w-[48px] h-[48px]" />, label: "List" },
    { type: "image", icon: <img src={imageIcon} alt="alt" className="w-[48px] h-[48px]" />, label: "Image" },
    { type: "button", icon: <img src={icon2} alt="alt" className="w-[48px] h-[48px]" />, label: "Button" },
    { type: "divider", icon: <img src={icon3} alt="alt" className="w-[48px] h-[48px]" />, label: "Divider" },
    { type: "html", icon: <img src={documentCode} alt="alt" className="w-[48px] h-[48px]" />, label: "HTML" },
    { type: "social", icon: <img src={textCreation} alt="alt" className="w-[48px] h-[48px]" />, label: "Social" },
    { type: "icon", icon: <img src={star} alt="alt" className="w-[48px] h-[48px]" />, label: "Icon" },
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
    <div className="w-[131px] h-[146px] flex items-center flex-col gap-[13px]">
      <div
        ref={drag}
        className="w-full h-[190px] rounded-[20px] flex flex-col items-center justify-center p-4 border border-[#F1F1F1] cursor-move hover:border-[#383268] transition-colors"
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={() => addElement(type)}
      >
        {icon}
      </div>

      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
}