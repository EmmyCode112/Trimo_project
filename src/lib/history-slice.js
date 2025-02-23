export const createHistorySlice = (set, get) => ({
    past: [],
    future: [],
    canUndo: false,
    canRedo: false,
  
    recordChange: (action) => {
      const currentState = get().emailContent
      set((state) => {
        state.past.push(currentState)
        state.future = []
        state.canUndo = true
        state.canRedo = false
      })
      action()
    },
  
    undo: () => {
      const { past, emailContent } = get()
      if (past.length === 0) return
  
      set((state) => {
        const previous = state.past[state.past.length - 1]
        state.past = state.past.slice(0, -1)
        state.future = [emailContent, ...state.future]
        state.emailContent = previous
        state.canUndo = state.past.length > 0
        state.canRedo = true
      })
    },
  
    redo: () => {
      const { future } = get()
      if (future.length === 0) return
  
      set((state) => {
        const next = state.future[0]
        state.future = state.future.slice(1)
        state.past = [...state.past, state.emailContent]
        state.emailContent = next
        state.canUndo = true
        state.canRedo = state.future.length > 0
      })
    },
  })
  
  