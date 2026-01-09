import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authService } from '@data/services/authService'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(email, password)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return { success: true }
        } catch (error) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          })
          return { success: false, error: error.message }
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(userData)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          return { success: true }
        } catch (error) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
        authService.logout()
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export { useAuthStore }
