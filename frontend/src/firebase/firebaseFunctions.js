// src/Firebase/firebaseFunctions.js
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "../Redux/action/authAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const signUpUser = async (email, password, dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Dispatch the login action with user info
    dispatch(login({ email: userCredential.user.email }));

    return userCredential; // Return user credential on success
  } catch (error) {
    throw new Error(error.message); // Throw an error to be handled in the component
  }
};

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user);
        dispatch(login({ email: user.email })); // Dispatch login action with user data
      } else {
        // User is signed out
        dispatch(logout()); // Dispatch logout action
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
};
