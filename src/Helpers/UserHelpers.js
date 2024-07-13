import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/config";

export const createUser = async (email, password, username) => {
  const userData = { email, password, username };
  await addDoc(collection(db, "users"), userData);
};

export const createProject = async (data) => {
  await addDoc(collection(db, "projects"), data);
};

export const editProject = async (id, data) => {
  try {
    if (!id) {
      console.log("Project id not defined");
    }
    await updateDoc(doc(db, "projects", id), data);
  } catch (error) {}
};

export const getAllProjectsForUser = async (userId) => {
  const projectsRef = query(
    collection(db, "projects"),
    where("userId", "==", userId)
  );
  const projectData = await getDocs(projectsRef);
  let projectArray = [];
  projectData.forEach((doc) => {
    projectArray.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return projectArray;
};

export const getProjectById = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectRef);
    if (projectDoc.exists()) {
      const projectData = projectDoc.data();
      return projectData;
    } else {
      throw new Error(`No project found with ID: ${projectId}`);
    }
  } catch (error) {
    console.error("Error getting project by ID:", error.message);
    throw error;
  }
};

export const updateProjectTodos = async (projectId, updateData) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, updateData);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// export const deleteProject = async (projectId) => {
//   if (!projectId) {
//     throw new Error("Project ID is required");
//   }
//   const projectRef = doc(db, "projects", projectId);
//   try {
//     await deleteDoc(projectRef);
//   } catch (error) {
//     alert("Error deleting project:", error);
//     throw error;
//   }
// };

export const deleteTodo = async (projectId, todoIndex, todos) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const updatedTodos = [...todos];
    updatedTodos.splice(todoIndex, 1);

    await updateDoc(projectRef, { todos: updatedTodos });
  } catch (error) {
    alert(error);
    throw error;
  }
};
export const moveToRecyclebin = async (data, projectId) => {
  try {
    await addDoc(collection(db, "recyclebin"), data);
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
  } catch (err) {
    console.log(err);
  }
};
export const recyclebinItems = async (userId) => {
    const projectRef = query(
      collection(db, "recyclebin"),
      where("userId", "==", userId)
    );
    const binData = await getDocs(projectRef);
    let binArraya = [];
    binData.forEach((doc) => {
      binArraya.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return binArraya
};

export const getRecycleBinItemById = async(projectId)=>{
  try {
    const projectRef = doc(db, "recyclebin", projectId);
    const projectDoc = await getDoc(projectRef);
    if (projectDoc.exists()) {
      const projectData = projectDoc.data();
      return projectData;
    } else {
      throw new Error(`No project found with ID: ${projectId}`);
    }
  } catch (error) {
    console.error("Error getting project by ID:", error.message);
    throw error;
  }
}

export const restoreBinItem = async(data, projectId)=>{
  try{
    await addDoc(collection(db,"projects"),data)
    const projectRef = doc(db,"recyclebin",projectId)
    await deleteDoc(projectRef)
  }catch(err){
    console.log(err);
  }
}

export const deleteProject = async (projectId) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  const projectRef = doc(db, "recyclebin", projectId);
  try {
    await deleteDoc(projectRef);
  } catch (error) {
    alert("Error deleting project:", error);
    throw error;
  }
};
