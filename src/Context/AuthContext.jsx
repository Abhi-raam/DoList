import {createContext, useContext,useEffect,useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Firebase/config";


const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const[user,setUser] = useState({})
    const[gotoSignin,setGotoSignip] = useState()

    const register = async(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };
    const logout = () => {
        return signOut(auth)
      }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return (
        <UserContext.Provider value={{ user,signIn,register,logout,setGotoSignip,gotoSignin}}>
          {children}
        </UserContext.Provider>
      );
}

export const UserAuth = () => {
    return useContext(UserContext);
  };