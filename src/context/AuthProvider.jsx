import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import {auth} from "../firebase-init"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailText, setEmailText] = useState('')


  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleSignInUser = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  }

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  const forgetPassword = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('User Info in useEffect', currentUser);
      setUser(currentUser)
      setLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignInUser,
    signOutUser,
    forgetPassword,
    emailText,
    setEmailText
  }

  return (
    <AuthContext value={userInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;