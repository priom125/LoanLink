
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";



export const AuthContext = createContext();

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password,confirmPassword) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password,confirmPassword);
  };



    const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

    const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  }

  const authInfo = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    googleLogin,
    updateUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;