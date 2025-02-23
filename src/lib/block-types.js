export const blockTypes = {
    // Text blocks
    heading: {
      label: 'Heading',
      defaultContent: 'New Heading',
      defaultSettings: { level: 1, align: 'left' }
    },
    text: {
      label: 'Paragraph',
      defaultContent: 'Enter your text here',
      defaultSettings: { align: 'left' }
    },
    list: {
      label: 'List',
      defaultContent: ['Item 1', 'Item 2', 'Item 3'],
      defaultSettings: { type: 'bullet', align: 'left' }
    },
    
    // Media blocks
    image: {
      label: 'Image',
      defaultContent: '',
      defaultSettings: { width: '100%', alt: '', rounded: false }
    },
    video: {
      label: 'Video',
      defaultContent: '',
      defaultSettings: { width: '100%', autoplay: false, controls: true }
    },
    button: {
      label: 'Button',
      defaultContent: 'Click Me',
      defaultSettings: {
        align: 'center',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        rounded: true
      }
    },
    
    // Layout blocks
    divider: {
      label: 'Divider',
      defaultContent: null,
      defaultSettings: { style: 'solid', color: '#000000', spacing: 'medium' }
    },
    spacer: {
      label: 'Spacer',
      defaultContent: null,
      defaultSettings: { height: '20px' }
    },
    columns: {
      label: 'Columns',
      defaultContent: [[], []],
      defaultSettings: { count: 2, gap: '20px' }
    },
    
    // Interactive blocks
    social: {
      label: 'Social Links',
      defaultContent: [
        { platform: 'twitter', url: '' },
        { platform: 'facebook', url: '' },
        { platform: 'instagram', url: '' }
      ],
      defaultSettings: { size: 'medium', color: '#000000' }
    },
    html: {
      label: 'Custom HTML',
      defaultContent: '',
      defaultSettings: {}
    }
  }
  
  export function createBlock(type) {
    const blockType = blockTypes[type]
    if (!blockType) throw new Error(`Unknown block type: ${type}`)
  
    return {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: blockType.defaultContent,
      settings: { ...blockType.defaultSettings }
    }
  }