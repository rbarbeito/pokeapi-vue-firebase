import { defineStore } from "pinia";
import { reactive } from "vue";
import { type User } from "firebase/auth";


export const useAuthStorage = defineStore('auth', () => {

  const state = reactive({
    authCurrentUser: {} as User | null,
    isLogin: false,
  })


  return state
})
