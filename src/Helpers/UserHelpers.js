import {addDoc,collection,deleteDoc,doc,getDoc,getDocs, query, updateDoc,where,} from "firebase/firestore";
import { db } from "../Firebase/config";

export const createUser = async (email, password, username) => {
  const userData = {
    email,
    password,
    username,
  };
  await addDoc(collection(db, "users"), userData);
};

export const createProject = async (data) => {
  await addDoc(collection(db, "projects"), data);
};

export const editProject = async (id, data) => {
//   console.log(data);
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
  console.log(projectId);
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

    console.log(`Updated project ${projectId} with new data:`, updateData);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
  
    const projectRef = doc(db, "projects", projectId); // Reference the project document
  
    try {
      await deleteDoc(projectRef); // Delete the project from Firestore
      console.log(`Deleted project with ID: ${projectId}`);
    } catch (error) {
      console.error("Error deleting project:", error); // Handle errors
      throw error; // Rethrow error if needed
    }
  };


export const deleteTodo = async (projectId, todoIndex, todos) => {
  try {
    const projectRef = doc(db, "projects", projectId); // Reference the project document

    const updatedTodos = [...todos];
    updatedTodos.splice(todoIndex, 1); // Remove the specified todo from the list

    // Persist the updated todos to Firestore
    await updateDoc(projectRef, { todos: updatedTodos });

    console.log(
      `Deleted todo at index ${todoIndex} from project ID: ${projectId}`
    );
  } catch (error) {
    console.error("Error deleting todo:", error.message); // Handle errors
    throw error; // Rethrow the error to handle it in the calling function
  }
};
