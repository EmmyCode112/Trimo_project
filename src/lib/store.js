import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet } from "immer"
import { createHistorySlice } from "./history-slice"

enableMapSet()

const initialContent = {
  blocks: [
    {
      id: "1",
      type: "heading",
      content: "Embrace the festive spirit!",
      settings: { align: "center" },
    },
    {
      id: "2",
      type: "navigation",
      content: ["Specials", "Holiday Edition", "Get In Touch"],
      settings: { align: "center" },
    },
    // Add more initial blocks as needed
  ],
}

export const useEmailStore = create(
  immer((set, get) => ({
    ...createHistorySlice(set, get),

    emailContent: initialContent,
    metadata: {
      from: "test@example.com",
      subject: "Holiday Newsletter",
      lastSaved: new Date().toISOString(),
    },
    settings: {
      contentWidth: "600px",
      backgroundColor: "#ffffff",
      fontFamily: "Inter",
      linkColor: "#0068a5",
    },

    updateMetadata: (newMetadata) =>
      set((state) => {
        state.metadata = { ...state.metadata, ...newMetadata }
      }),

    updateSettings: (newSettings) =>
      set((state) => {
        state.settings = { ...state.settings, ...newSettings }
      }),

    addBlock: (block) =>
      set((state) => {
        state.emailContent.blocks.push(block)
      }),

    updateBlock: (id, updates) =>
      set((state) => {
        const block = state.emailContent.blocks.find((b) => b.id === id)
        if (block) {
          Object.assign(block, updates)
        }
      }),

    moveBlock: (fromIndex, toIndex) =>
      set((state) => {
        const blocks = state.emailContent.blocks
        const [movedBlock] = blocks.splice(fromIndex, 1)
        blocks.splice(toIndex, 0, movedBlock)
      }),

    deleteBlock: (id) =>
      set((state) => {
        state.emailContent.blocks = state.emailContent.blocks.filter((block) => block.id !== id)
      }),

    saveTemplate: async () => {
      const state = get()
      // Implement actual save logic here
      // For now, just update lastSaved
      set((state) => {
        state.metadata.lastSaved = new Date().toISOString()
      })
    },
  })),
)

