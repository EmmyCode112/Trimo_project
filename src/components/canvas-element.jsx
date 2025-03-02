"use client";

import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { X, Move, Edit, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Resizable } from "re-resizable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CanvasElement({
  element,
  isSelected,
  onClick,
  updateElement,
  removeElement,
  linkColor,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(element.content);
  const elementRef = useRef(null);
  const fileInputRef = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "CANVAS_ELEMENT",
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    updateElement(element.id, { content });
    setIsEditing(false);
  };

  const handleResize = (e, direction, ref, d) => {
    updateElement(element.id, {
      size: {
        width: ref.style.width,
        height: ref.style.height,
      },
    });
  };

  const handleDrag = (e) => {
    if (elementRef.current) {
      const { clientX, clientY } = e;
      const { left, top } = elementRef.current.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      updateElement(element.id, { position: { x, y } });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (element.type === "image") {
          setImageUrl(result);
        }
        updateElement(element.id, { content: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = () => {
    updateElement(element.id, { content: imageUrl });
    setIsImageDialogOpen(false);
  };

  const renderContent = () => {
    switch (element.type) {
      case "title":
        return <h2 style={element.styles}>{element.content}</h2>;
      case "paragraph":
        return <p style={element.styles}>{element.content}</p>;
      case "list":
        return (
          <ul style={element.styles} className="list-disc pl-5">
            {element.content.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case "image":
        return (
          <div className="relative group">
            <img
              src={element.content || "/placeholder.svg?height=200&width=400"}
              alt="Email content"
              style={element.styles}
              className="max-w-full"
            />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm" onClick={() => setIsImageDialogOpen(true)}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            )}
          </div>
        );
      case "button":
        return (
          <button
            style={{
              ...element.styles,
              color: "#ffffff",
              backgroundColor: "#383268",
            }}
            className="px-4 py-2 rounded"
          >
            {element.content}
          </button>
        );
      case "divider":
        return <hr style={element.styles} />;
      case "html":
        return <div dangerouslySetInnerHTML={{ __html: element.content }} />;
      case "social":
        return (
          <div className="flex gap-2 justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        );
      case "icon":
        return <div className="w-8 h-8 bg-gray-300"></div>;
      case "video":
        return <video src={element.content} controls style={element.styles} className="max-w-full" />;
      case "text":
        return <p style={element.styles}>{element.content}</p>;
      default:
        return <div>{element.content}</div>;
    }
  };

  if (isEditing) {
    return (
      <div className="relative border-2 border-[#383268] p-2 my-2" onClick={onClick}>
        {element.type === "text" ? (
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[100px] w-full" />
        ) : (
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[100px] w-full" />
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="default" size="sm" className="bg-[#383268] hover:bg-[#2a2550]" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Resizable
        size={element.size || { width: "auto", height: "auto" }}
        onResizeStop={handleResize}
        enable={{
          top: isSelected,
          right: isSelected,
          bottom: isSelected,
          left: isSelected,
          topRight: isSelected,
          bottomRight: isSelected,
          bottomLeft: isSelected,
          topLeft: isSelected,
        }}
      >
        <div
          ref={(node) => {
            preview(node);
            elementRef.current = node;
          }}
          className={`absolute cursor-move ${isSelected ? "outline outline-2 outline-[#383268]" : ""}`}
          onClick={onClick}
          style={{
            opacity: isDragging ? 0.5 : 1,
            left: element.position?.x || 0,
            top: element.position?.y || 0,
          }}
          onDragEnd={handleDrag}
        >
          {isSelected && (
            <div className="absolute top-0 right-0 flex bg-white border border-gray-200 rounded-bl shadow-sm">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(element.id);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <div ref={drag} className="h-8 w-8 flex items-center justify-center cursor-move">
                <Move className="h-4 w-4" />
              </div>
            </div>
          )}
          {renderContent()}
        </div>
      </Resizable>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Or upload an image or video</Label>
              <Input
                id="file-upload"
                type="file"
                accept={element.type === "image" ? "image/*" : "video/*"}
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImageUrlChange} className="bg-[#383268] hover:bg-[#2a2550]">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}