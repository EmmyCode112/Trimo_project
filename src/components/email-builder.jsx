"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./header";
import EmailInfo from "./email-info";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import { useToast } from "@/components/ui/use-toast";
import { sendTestEmail } from "@/lib/email-service";
import PreviewModal from "./preview-modal";
import FileSaver from "file-saver";

const defaultTemplate = {
  elements: [],
  rows: [],
  settings: {
    contentWidth: 600,
    alignment: "center",
    backgroundColor: "#ffffff",
    backgroundImage: null,
    fontType: "Inter",
    linkColor: "#0068a5",
  },
};

export default function EmailBuilder() {
  const [activeTab, setActiveTab] = useState("content");
  const [template, setTemplate] = useState(defaultTemplate);
  const [selectedElement, setSelectedElement] = useState(null);
  const [emailInfo, setEmailInfo] = useState({
    from: "test@triimotest.com",
    to: "{{customer.email}}",
    subject: "",
    headerType: "none",
  })

  const [lastSaved, setLastSaved] = useState(new Date());
  const { toast } = useToast();
  const [history, setHistory] = useState([defaultTemplate]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSave = () => {
    setLastSaved(new Date());
    toast({
      title: "Email template saved",
      description: "Your email template has been saved successfully.",
    });
  };

  const handleSendTest = async () => {
    try {
      await sendTestEmail(template);
      toast({
        title: "Test email sent",
        description: "A test email has been sent to your inbox.",
      });
    } catch (error) {
      toast({
        title: "Error sending test email",
        description: "There was an error sending the test email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addElement = (type, position) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      position,
    };

    setTemplate((prevTemplate) => {
      const newTemplate = {
        ...prevTemplate,
        elements: [...prevTemplate.elements, newElement],
      };

      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newTemplate);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      return newTemplate;
    });

    setSelectedElement(newElement.id);
  };

  const addElementToRow = (rowId, columnIndex, element) => {
    setTemplate((prevTemplate) => {
      const updatedRows = prevTemplate.rows.map((row) => {
        if (row.id === rowId) {
          const updatedElements = [...row.elements];
          updatedElements[columnIndex] = [...(updatedElements[columnIndex] || []), element];
          return { ...row, elements: updatedElements };
        }
        return row;
      });
      return { ...prevTemplate, rows: updatedRows };
    });
  };

  const updateElement = (id, updates) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    }));
  };

  const removeElement = (id) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== id),
    }));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const updateSettings = (updates) => {
    const newTemplate = {
      ...template,
      settings: {
        ...template.settings,
        ...updates,
      },
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTemplate);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setTemplate(newTemplate);
  };

  const addRow = (type) => {
    const columnsCount = getColumnsCount(type);
    const newRow = {
      id: `row-${Date.now()}`,
      type,
      columns: columnsCount,
      elements: Array(columnsCount).fill([]),
    };

    const newTemplate = {
      ...template,
      rows: [...template.rows, newRow],
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTemplate);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setTemplate(newTemplate);
  };

  const getColumnsCount = (type) => {
    switch (type) {
      case "1col":
        return 1;
      case "2col":
        return 2;
      case "3col":
        return 3;
      case "4col":
        return 4;
      case "leftSidebar":
      case "rightSidebar":
        return 2;
      default:
        return 1;
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTemplate(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTemplate(history[historyIndex + 1]);
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case "title":
        return "Add Your Title Here";
      case "paragraph":
        return "Add your paragraph text here. Edit this text to make it your own.";
      case "list":
        return "Item 1\nItem 2\nItem 3";
      case "button":
        return "Click Here";
      case "html":
        return "<div>Custom HTML</div>";
      case "video":
        return "https://www.example.com/video.mp4";
      case "text":
        return "Add your text here";
      default:
        return "";
    }
  };

  const getDefaultStyles = (type) => {
    const baseStyles = {
      padding: "10px",
      margin: "5px 0",
      color: "#484848",
    };

    switch (type) {
      case "title":
        return {
          ...baseStyles,
          fontSize: "24px",
          fontWeight: "bold",
        };
      case "paragraph":
        return {
          ...baseStyles,
          fontSize: "16px",
          lineHeight: "1.5",
        };
      case "button":
        return {
          ...baseStyles,
          backgroundColor: "#383268",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "4px",
          textAlign: "center",
          cursor: "pointer",
        };
      case "divider":
        return {
          ...baseStyles,
          borderTop: "1px solid #e0e0e0",
          margin: "15px 0",
        };
      case "video":
        return {
          ...baseStyles,
          width: "100%",
          maxWidth: "560px",
        };
      case "text":
        return {
          ...baseStyles,
          fontSize: "16px",
          lineHeight: "1.5",
        };
      default:
        return baseStyles;
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDownload = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailInfo.subject}</title>
        <style>
          body {
            font-family: ${template.settings.fontType}, sans-serif;
            background-color: ${template.settings.backgroundColor};
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: ${template.settings.contentWidth}px;
            margin: 0 auto;
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${template.elements
            .map(
              (element) => `
            <div style="${Object.entries(element.styles)
              .map(([key, value]) => `${key}: ${value}`)
              .join("; ")}">
              ${element.content}
            </div>
          `
            )
            .join("")}
          ${template.rows
            .map(
              (row) => `
            <div style="display: grid; grid-template-columns: repeat(${row.columns}, 1fr); gap: 16px;">
              ${Array.from({ length: row.columns })
                .map(
                  (_, colIndex) => `
                <div>
                  ${
                    row.elements[colIndex]
                      ?.map(
                        (element) => `
                    <div style="${Object.entries(element.styles)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join("; ")}">
                      ${element.content}
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          `
            )
            .join("")}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    FileSaver.saveAs(blob, "email_template.html");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-white">
        <Header
          lastSaved={lastSaved}
          onSave={handleSave}
          onSendTest={handleSendTest}
          isPreviewMode={isPreviewMode}
          togglePreviewMode={togglePreviewMode}
          emailInfo={emailInfo}
        />
        <EmailInfo emailInfo={emailInfo} setEmailInfo={setEmailInfo} />
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <PreviewModal template={template} onDownload={handleDownload} />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <Canvas
            template={template}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            updateElement={updateElement}
            removeElement={removeElement}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            history={history}
            historyIndex={historyIndex}
            addElement={addElement}
            isPreviewMode={isPreviewMode}
            addElementToRow={addElementToRow}
          />
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            addElement={addElement}
            addRow={addRow}
            template={template}
            selectedElement={selectedElement}
            updateElement={updateElement}
            updateSettings={updateSettings}
          />
        </div>
      </div>
    </DndProvider>
  );
}