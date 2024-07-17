import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBIHyLk0CZ5OAeEPEJvp5YkCZdebcGRAXw",
  authDomain: "netflixclone-65878.firebaseapp.com",
  projectId: "netflixclone-65878",
  storageBucket: "netflixclone-65878.appspot.com",
  messagingSenderId: "238179374557",
  appId: "1:238179374557:web:0eaadd1ff5b987d9311234",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};


const logout = ()=>{
  signOut(auth);
}

export {auth, db, login,signup,logout};