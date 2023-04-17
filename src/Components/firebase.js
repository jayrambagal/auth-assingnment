import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,
    getAuth,signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"
    
// ************ Firebase Configuration *********************************
const firebaseConfig = {
    apiKey: "AIzaSyDBwdGTi5XW63P6g5h4SpXhj-myh40l518",
    authDomain: "auth-effa7.firebaseapp.com",
    projectId: "auth-effa7",
    storageBucket: "auth-effa7.appspot.com",
    messagingSenderId: "1075153286731",
    appId: "1:1075153286731:web:d41771ce436fc39382ffce",
    measurementId: "G-156VXMM1HY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//**************** Register with name,email and password *****************************

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// *************** SignIn With eamil and password *************************
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// *************** Autentication with google *********************************
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



// **************  Password reset link ************************
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

// *************** Logout functionality  ********************
  const logout = () => {
    signOut(auth);
  };

  

//   ********** Exporting all the functions of authentication *********************888
  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };
