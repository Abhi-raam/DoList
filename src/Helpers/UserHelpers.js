import { addDoc, collection } from 'firebase/firestore';
import {db} from '../Firebase/config'

export const createUser = async(email,password,username)=>{
    const userData = {
        email,
        password,
        username
    }
    await addDoc(collection(db,'users'),userData)
}