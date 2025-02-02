import { auth } from "@/config/useFirebase";
import router from "@/router";
import { useAuthStorage } from "@/stores/authStorage";
import { browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, type AuthError, type User } from 'firebase/auth';



export const useAuthComposable = () => {

  const storageAuth = useAuthStorage()

  const register = (email: string, password: string) => {

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            if (userCredential.user) {
              storageAuth.authCurrentUser = userCredential.user;
              storageAuth.isLogin = true
              return router.push({ name: 'profile' })
            }
          })
          .catch((error: AuthError) => {
            const errorCode = error.code;
            console.log('errorCode :', errorCode);
            const errorMessage = error.message;
            console.log('errorMessage :', errorMessage);
            // ..
          });
      })
  }

  const login = async (email: string, password: string) => {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            if (userCredential.user) {
              storageAuth.authCurrentUser = userCredential.user;
              storageAuth.isLogin = true
              return router.push({ name: 'profile' })
            }
          })
          .catch((error: AuthError) => {
            const errorCode = error.code;
            console.log('errorCode :', errorCode);
            const errorMessage = error.message;
            console.log('errorMessage :', errorMessage);
          });
      })
  }

  const logout = async () => {
    signOut(auth).then(() => {
      storageAuth.authCurrentUser = null
      storageAuth.isLogin = false
      return
    }).catch((error) => {
      console.log('error :', error);
    });
  }


  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {

      onAuthStateChanged(auth, (user) => {
        storageAuth.authCurrentUser = user;
        storageAuth.isLogin = true
        resolve(user)
      },
        reject
      )

    })
  }


  return { register, login, logout, getCurrentUser }
}




