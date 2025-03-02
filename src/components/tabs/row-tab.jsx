import { useDrag } from "react-dnd";

export default function RowTab({ addRow }) {
  const rowTypes = [
    { id: "1col", label: "1 Column", image: "/placeholder.svg?height=60&width=150" },
    { id: "2col", label: "2 Columns", image: "/placeholder.svg?height=60&width=150" },
    { id: "3col", label: "3 Columns", image: "/placeholder.svg?height=60&width=150" },
    { id: "4col", label: "4 Columns", image: "/placeholder.svg?height=60&width=150" },
    { id: "leftSidebar", label: "Left Sidebar", image: "/placeholder.svg?height=60&width=150" },
    { id: "rightSidebar", label: "Right Sidebar", image: "/placeholder.svg?height=60&width=150" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Row Layouts</h3>
      <div className="grid grid-cols-2 gap-4">
        {rowTypes.map((row) => (
          <DraggableRow
            key={row.id}
            id={row.id}
            label={row.label}
            image={row.image}
            addRow={addRow}
          />
        ))}
      </div>
    </div>
  );
}

function DraggableRow({ id, label, image, addRow }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROW",
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && dropResult.name === "Canvas") {
        addRow && addRow(id);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="flex flex-col items-center border border-gray-200 rounded-md p-2 cursor-move hover:border-[#383268] transition-colors"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => addRow && addRow(id)}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={label}
        className="w-full h-16 object-contain mb-2"
      />
      <span className="text-xs">{label}</span>
    </div>
  );
}