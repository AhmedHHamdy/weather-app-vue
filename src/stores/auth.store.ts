import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { account, ID } from '@/lib/appwrite';
import { type Models } from 'appwrite';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Models.User<Models.Preferences> | null>(null)
  const isLoading = ref(false)
  const errorValue = ref<Error | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  const login = async (credentials: { email: string, password: string }) => {
    isLoading.value = true
    errorValue.value = null

    try {
      await account.createEmailPasswordSession(credentials.email, credentials.password)
      const accountResponse = await account.get()
      user.value = accountResponse
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        errorValue.value = error
      }
    }  
  }

  const signup = async (credentials: {name: string, email: string, password: string }) => {
    isLoading.value = true
    errorValue.value = null

    try {
      await account.create(ID.unique(), credentials.email, credentials.password, credentials.name);
      await login({email: credentials.email, password: credentials.password})
      const accountResponse = await account.get()
      user.value = accountResponse
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        errorValue.value = error
      }
    }  
  }

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        errorValue.value = error
      }
    }
  };

  const checkSession = async () => {
    try {
      const response = await account.get()
      user.value = response
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        errorValue.value = error
      }
    }
  }

  return { user, login, signup, logout, checkSession, isAuthenticated, errorValue }
})
