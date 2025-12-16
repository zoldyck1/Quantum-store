import { createClient } from '@insforge/sdk'

// Create Insforge client
const insforgeClient = createClient({ 
  baseUrl: 'https://2fu7h5sf.us-east.insforge.app',
  // Add error handling and logging
  onError: (error) => {
    console.error('Insforge client error:', error)
  }
})

export default insforgeClient
