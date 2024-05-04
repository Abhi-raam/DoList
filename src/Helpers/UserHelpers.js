import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {db} from '../Firebase/config'

export const createUser = async(email,password,username)=>{
    const userData = {
        email,
        password,
        username
    }
    await addDoc(collection(db,'users'),userData)
}

export const createProject = async(data)=>{
    await addDoc(collection(db,'projects'),data).then((data)=>{
        console.log(data);
    })
}

export const getAllProjectsForUser = async (userId) => {
    const projectsRef = query(
      collection(db, 'projects'),
      where('userId', '==', userId) 
    );
    const projectData = await getDocs(projectsRef);
    let projectArray =[]
    projectData.forEach((doc)=>{
        projectArray.push({
            id: doc.id,
            ...doc.data(),
        })
    })
  
    console.log("Projects for user:", projectArray);
  
    return projectArray; 
  };