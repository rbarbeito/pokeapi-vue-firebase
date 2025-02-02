import { doc, getDoc, setDoc, type DocumentData } from "firebase/firestore";
import { db } from "@/config/useFirebase";
import type { UserDataPokemons } from "@/interfaces/userData.interfaces";




export const databaseComposable = () => {



  const getUser = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    try {
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : undefined
    } catch (error) {
      console.error(error)
    }



  }

  const addUser = async (uid: string, userData: UserDataPokemons) => {
    const cityRef = doc(db, 'users', uid);
    try {
      return await setDoc(cityRef, userData);

    } catch (e) {
      console.log('Error create user in database :', e);

    }

  }


  return { getUser, addUser }
}
