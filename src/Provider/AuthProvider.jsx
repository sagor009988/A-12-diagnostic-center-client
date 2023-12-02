import { createContext, useEffect, useState} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const axiosPublic=useAxiosPublic()
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login=(email,password)=>{
        console.log();
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile=(name,photo)=>{
      setLoading(true)
      return  updateProfile(auth.currentUser,{
        displayName:name , photoURL:photo
      })
    }

    const logout=()=>{
        setLoading(true)
        return signOut(auth)
    }


    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            if(currentUser){
                // create token
                const userInfo={email:currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                   
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            }
            else{
                // remove token
                localStorage.removeItem('access-token')

            }
            setLoading(false);
        })
        return ()=>{
          return  unSubscribe()
        }
    },[axiosPublic])

    const authInfo={
        user,loading,createUser,login,logout,updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;