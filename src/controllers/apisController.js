import { collection, doc, getDoc } from "firebase/firestore"
import { firestore } from "../utils/firebase"

export const checkIfExists = async({uuid})=>{
    try {
      const response = await getDoc(doc(collection(firestore,"apis"),uuid))
      if(response.exists){
        return true;
      }
      return false;
    } catch (error) {
        console.log(error)
        throw error
    }
}