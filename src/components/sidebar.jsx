import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./tabs/content-tab";
import RowTab from "./tabs/row-tab";
import SettingTab from "./tabs/setting-tab";
import { Video, Type } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  addElement,
  addRow,
  template,
  selectedElement,
  updateElement,
  updateSettings,
}) {
  const elementTypes = [
    // ... existing elements
    { type: "video", icon: Video, label: "Video" },
    { type: "text", icon: Type, label: "Text" },
  ];

  return (
    <div className="w-[450px] overflow-x-hidden border-l border-[#F1F1F1] bg-white flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="flex-1 w-full flex flex-col"
      >
        <TabsList className="grid grid-cols-3 bg-white h-12">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="row">Row</TabsTrigger>
          <TabsTrigger value="setting">Setting</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="flex-1 p-4 overflow-auto">
          <ContentTab addElement={addElement} elementTypes={elementTypes} />
        </TabsContent>

        <TabsContent value="row" className="flex-1 p-4 overflow-auto">
          <RowTab addRow={addRow} />
        </TabsContent>

        <TabsContent value="setting" className="flex-1 p-4 overflow-auto">
          <SettingTab
            template={template}
            selectedElement={selectedElement}
            updateElement={updateElement}
            updateSettings={updateSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}