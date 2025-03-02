import { useDrop } from "react-dnd";
import CanvasElement from "./canvas-element";

export default function RowLayout({
  row,
  selectedElement,
  setSelectedElement,
  updateElement,
  removeElement,
  linkColor,
  addElementToRow,
}) {
  const gridTemplateColumns = `repeat(${row.columns}, 1fr)`;

  return (
    <div className="my-4 border border-gray-200 p-2 rounded" style={{ position: "relative" }}>
      <div className="grid gap-4" style={{ gridTemplateColumns }}>
        {Array.from({ length: row.columns }).map((_, colIndex) => (
          <ColumnDropArea
            key={`${row.id}-col-${colIndex}`}
            rowId={row.id}
            columnIndex={colIndex}
            elements={row.elements[colIndex] || []}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            updateElement={updateElement}
            removeElement={removeElement}
            linkColor={linkColor}
            addElementToRow={addElementToRow}
          />
        ))}
      </div>
    </div>
  );
}

function ColumnDropArea({
  rowId,
  columnIndex,
  elements,
  selectedElement,
  setSelectedElement,
  updateElement,
  removeElement,
  linkColor,
  addElementToRow,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item) => {
      const newElement = {
        id: `element-${Date.now()}`,
        type: item.type,
        content: "New element",
        styles: {},
      };

      addElementToRow(rowId, columnIndex, newElement);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`min-h-[100px] p-2 rounded ${isOver ? "bg-gray-100" : ""}`}>
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          <p>Drop elements here</p>
        </div>
      ) : (
        elements.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            isSelected={selectedElement === element.id}
            onClick={() => setSelectedElement(element.id)}
            updateElement={updateElement}
            removeElement={removeElement}
            linkColor={linkColor}
          />
        ))
      )}
    </div>
  );
}