// src/Firebase/firebaseFunctions.js
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "../Redux/action/authAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { db } from "./firebase"; // Ensure you import your Firestore instance
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const signUpUser = async (email, password, dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Dispatch the login action with user info including UID
    dispatch(
      login({
        email: userCredential.user.email,
        uid: userCredential.user.uid, // Store the UID
      })
    );

    // Add user details to the Firestore Users collection using UID as document ID
    await setDoc(doc(db, "Users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      createdAt: new Date(),
      // Add any other user fields you want to store
    });

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
        dispatch(login({ email: user.email, uid: user.uid })); // Dispatch login action with email and UID
      } else {
        // User is signed out
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export const createTeam = async (teamName, userId) => {
  console.log(userId);
  try {
    const docRef = await addDoc(collection(db, "Teams"), {
      name: teamName,
      createdAt: new Date(),
      admin: userId, // Add userId as the admin field
    });
    return docRef.id; // Return the ID of the created document
  } catch (error) {
    throw new Error("Error creating team: " + error.message);
  }
};

export const joinTeam = async (teamId, userId) => {
  try {
    const teamDoc = doc(db, "Teams", teamId);
    const teamSnapshot = await getDoc(teamDoc);

    if (teamSnapshot.exists()) {
      // Update the team document to include the new member's UID
      await updateDoc(teamDoc, {
        members: arrayUnion(userId), // Add the new member's UID to the members array
      });
      return true; // Return true if successfully joined
    } else {
      throw new Error("Team not found.");
    }
  } catch (error) {
    throw new Error("Error joining team: " + error.message);
  }
};

export const fetchUserTeams = async (userId) => {
  try {
    // Query for teams where the user is a member
    const memberQuery = query(
      collection(db, "Teams"),
      where("members", "array-contains", userId)
    );

    // Query for teams where the user is an admin
    const adminQuery = query(
      collection(db, "Teams"),
      where("admin", "==", userId)
    );

    // Execute both queries concurrently
    const [memberSnapshot, adminSnapshot] = await Promise.all([
      getDocs(memberQuery),
      getDocs(adminQuery),
    ]);

    // Combine the results from both snapshots
    const teams = [
      ...memberSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ...adminSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ];

    // Remove duplicates based on team ID
    const uniqueTeams = Array.from(
      new Map(teams.map((team) => [team.id, team])).values()
    );

    return uniqueTeams; // Return the unique fetched teams
  } catch (error) {
    throw new Error("Error fetching teams: " + error.message);
  }
};

export const fetchTeamDetails = async (teamId) => {
  console.log(`Fetching details for team ID: ${teamId}`); // Log team ID
  const teamDoc = doc(db, "Teams", teamId); // Adjust collection name as necessary
  const teamData = await getDoc(teamDoc);

  if (!teamData.exists()) {
    console.log("Team document does not exist"); // Log if document does not exist
    throw new Error("Team not found");
  }

  console.log("Fetched team data:", teamData.data()); // Log fetched data
  return { id: teamData.id, ...teamData.data() }; // Return team data along with its ID
};

export const logoutUser = async () => {
  try {
    await signOut(auth); // Sign out the user
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Rethrow the error to handle it in the calling component if needed
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return user data on successful login
  } catch (error) {
    throw new Error(error.message); // Throw error to be handled in the component
  }
};

export const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "Users"); // Adjust collection name if necessary
    const usersSnapshot = await getDocs(usersCollection);

    // Map through the documents and return an array of user data
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return usersList; // Return the array of users
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const fetchUserById = async (userId) => {
  console.log(userId);
  // try {
  //   // Reference the specific user document by userId (uid)
  //   const userDoc = doc(db, "Users", userId);
  //   const userSnapshot = await getDoc(userDoc); // Get the user document

  //   if (userSnapshot.exists()) {
  //     return {
  //       id: userSnapshot.id,
  //       ...userSnapshot.data(),
  //     }; // Return user data if it exists
  //   } else {
  //     throw new Error("User not found");
  //   }
  // } catch (error) {
  //   throw new Error("Error fetching user: " + error.message);
  // }
};
