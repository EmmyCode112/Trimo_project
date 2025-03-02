"use client";

import { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Monitor, Smartphone, Undo, Redo, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import CanvasElement from "./canvas-element";
import RowLayout from "./row-layout";

export default function Canvas({
  template,
  selectedElement,
  setSelectedElement,
  updateElement,
  removeElement,
  handleUndo,
  handleRedo,
  history,
  historyIndex,
  addElement,
  isPreviewMode,
  addElementToRow,
}) {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState("desktop");
  const [zoom, setZoom] = useState(100);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["ELEMENT", "ROW"],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        addElement(item.type, { x, y });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 50));
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.offsetWidth;
        if (viewMode === "mobile" && width > 375) {
          canvasRef.current.style.width = "375px";
        } else {
          canvasRef.current.style.width = "100%";
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);

  return (
    <div className="flex-1 flex flex-col border-r border-gray-200">
      {!isPreviewMode && (
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="icon"
              className={viewMode === "desktop" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="icon"
              className={viewMode === "mobile" ? "bg-[#383268] hover:bg-[#2a2550]" : ""}
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleUndo} disabled={historyIndex === 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRedo} disabled={historyIndex === history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{zoom}%</span>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div className={`flex-1 overflow-auto ${isPreviewMode ? "p-0" : "p-4"} bg-gray-100`} ref={drop}>
        <div
          ref={canvasRef}
          className={`mx-auto bg-white shadow-md transition-all relative ${
            viewMode === "mobile" ? "max-w-[375px]" : ""
          }`}
          style={{
            width: viewMode === "mobile" ? "375px" : `${template.settings.contentWidth}px`,
            maxWidth: "100%",
            minHeight: isPreviewMode ? "100%" : "500px",
            backgroundColor: template.settings.backgroundColor,
            backgroundImage: template.settings.backgroundImage ? `url(${template.settings.backgroundImage})` : "none",
            fontFamily: template.settings.fontType,
            textAlign: template.settings.alignment,
            transform: isPreviewMode ? "none" : `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          {template.elements.length === 0 && template.rows.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Drag and drop elements here to build your email</p>
            </div>
          )}

          {template.rows.map((row) => (
            <RowLayout
              key={row.id}
              row={row}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              updateElement={updateElement}
              removeElement={removeElement}
              linkColor={template.settings.linkColor}
              addElementToRow={addElementToRow}
            />
          ))}

          {template.elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElement === element.id}
              onClick={() => setSelectedElement(element.id)}
              updateElement={updateElement}
              removeElement={removeElement}
              linkColor={template.settings.linkColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}