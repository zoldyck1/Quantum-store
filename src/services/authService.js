import insforgeClient from './insforgeClient'

export const authService = {
  signUp: async (email, password, userData) => {
    const { data, error } = await insforgeClient.auth.signUp({
      email,
      password
    })
    
    if (data?.user && userData) {
      // Update profile with additional user data
      await insforgeClient.auth.setProfile({
        nickname: userData.full_name || userData.nickname,
        bio: userData.bio || '',
        avatar_url: userData.avatar_url || ''
      })
    }
    
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await insforgeClient.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await insforgeClient.auth.signOut()
    return { error }
  },

  resetPassword: async (email) => {
    // Insforge doesn't have direct password reset, we'll need to implement this differently
    // For now, return a placeholder
    return { data: { message: 'Password reset functionality needs to be implemented' }, error: null }
  },

  getUser: async () => {
    const { data, error } = await insforgeClient.auth.getCurrentUser()
    return { user: data?.user, error }
  },

  getCurrentUser: async () => {
    const { data, error } = await insforgeClient.auth.getCurrentUser()
    return { data, error }
  },

  setProfile: async (profileData) => {
    const { data, error } = await insforgeClient.auth.setProfile(profileData)
    return { data, error }
  },

  getProfile: async (userId) => {
    const { data, error } = await insforgeClient.auth.getProfile(userId)
    return { data, error }
  },

  onAuthStateChange: (callback) => {
    // Insforge doesn't have the same auth state change listener
    // We'll need to implement this differently using polling or manual checks
    return {
      data: { subscription: { unsubscribe: () => {} } },
      unsubscribe: () => {}
    }
  }
}