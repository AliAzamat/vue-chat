import { ref } from 'vue'
import { auth } from '@/firebase/config'

export const user = ref(auth.currentUser)

auth.onAuthStateChanged((_user) => {
  user.value = _user
})