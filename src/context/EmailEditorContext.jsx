"use client"

import { createContext, useContext, useReducer, useCallback } from 'react'
import emailjs from '@emailjs/browser'

const EmailEditorContext = createContext()

const initialState = {
  metadata: {
    from: 'test@example.com',
    to: '',
    subject: '',
    lastSaved: new Date().toISOString()
  },
  settings: {
    contentWidth: '600px',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    linkColor: '#0068a5'
  },
  content: {
    blocks: [
      {
        id: '1',
        type: 'heading',
        content: 'Embrace the festive spirit!',
        settings: { align: 'center', color: '#ff4444' }
      },
      {
        id: '2',
        type: 'navigation',
        content: ['Specials', 'Holiday Edition', 'Get In Touch'],
        settings: { align: 'center' }
      },
      {
        id: '3',
        type: 'image',
        content: '/placeholder.svg',
        settings: { width: '100%', alt: 'Festive decorations' }
      },
      {
        id: '4',
        type: 'heading',
        content: 'Festive Origins and Traditions',
        settings: { align: 'center', level: 2 }
      },
      {
        id: '5',
        type: 'text',
        content: 'Discover the roots of our cherished festive customs and the significance behind them...',
        settings: { align: 'center' }
      },
      {
        id: '6',
        type: 'blog-section',
        content: [
          {
            title: 'Festive Treats',
            image: '/placeholder.svg',
            description: 'Explore the rich variety of holiday treats...'
          },
          {
            title: 'Warm Beverages',
            image: '/placeholder.svg',
            description: 'Dive into the warm and cozy world of festive drinks...'
          },
          {
            title: 'Sparkling Adornments',
            image: '/placeholder.svg',
            description: 'Unveil the history of festive jewelry...'
          }
        ],
        settings: { columns: 3 }
      }
    ]
  },
  history: {
    past: [],
    future: [],
    current: null
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return {
        ...state,
        metadata: { ...state.metadata, ...action.payload }
      }
      
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      }
      
    case 'ADD_BLOCK':
      return {
        ...state,
        content: {
          ...state.content,
          blocks: [...state.content.blocks, action.payload]
        }
      }
    
      case 'LOAD_TEMPLATE':
      return {
        ...state,
        ...action.payload
      }
      
    case 'UPDATE_BLOCK':
      return {
        ...state,
        content: {
          ...state.content,
          blocks: state.content.blocks.map(block =>
            block.id === action.payload.id
              ? { ...block, ...action.payload.updates }
              : block
          )
        }
      }
      
    case 'MOVE_BLOCK':
      const blocks = [...state.content.blocks]
      const [movedBlock] = blocks.splice(action.payload.fromIndex, 1)
      blocks.splice(action.payload.toIndex, 0, movedBlock)
      return {
        ...state,
        content: { ...state.content, blocks }
      }
      
    case 'DELETE_BLOCK':
      return {
        ...state,
        content: {
          ...state.content,
          blocks: state.content.blocks.filter(block => block.id !== action.payload)
        }
      }
      
    case 'SAVE_TO_HISTORY':
      return {
        ...state,
        history: {
          past: [...state.history.past, state.content],
          future: [],
          current: state.content
        }
      }
      
    case 'UNDO':
      if (state.history.past.length === 0) return state
      const previous = state.history.past[state.history.past.length - 1]
      return {
        ...state,
        content: previous,
        history: {
          past: state.history.past.slice(0, -1),
          future: [state.content, ...state.history.future],
          current: previous
        }
      }
      
    case 'REDO':
      if (state.history.future.length === 0) return state
      const next = state.history.future[0]
      return {
        ...state,
        content: next,
        history: {
          past: [...state.history.past, state.content],
          future: state.history.future.slice(1),
          current: next
        }
      }
      
    default:
      return state
  }
}

export function EmailEditorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const saveTemplate = useCallback(async () => {
    // Implement your save logic here
    // For example, save to localStorage or make an API call
    localStorage.setItem('emailTemplate', JSON.stringify(state))
    dispatch({
      type: 'UPDATE_METADATA',
      payload: { lastSaved: new Date().toISOString() }
    })
  }, [state])

  const sendTestEmail = useCallback(async () => {
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: state.metadata.to,
          from_name: state.metadata.from,
          subject: state.metadata.subject,
          html_content: document.getElementById('email-preview').innerHTML
        },
        'YOUR_PUBLIC_KEY'
      )
      return true
    } catch (error) {
      console.error('Error sending test email:', error)
      return false
    }
  }, [state.metadata])
  

  

  const value = {
    state,
    dispatch,
    saveTemplate,
    sendTestEmail,
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0
  }

  return (
    <EmailEditorContext.Provider value={value}>
      {children}
    </EmailEditorContext.Provider>
  )
}

export function useEmailEditor() {
  const context = useContext(EmailEditorContext)
  if (!context) {
    throw new Error('useEmailEditor must be used within an EmailEditorProvider')
  }
  return context
}