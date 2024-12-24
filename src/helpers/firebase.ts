import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiikCZjO2BS1D0Ykvg-y1lfbIte5IazIw",
  authDomain: "lxii-48b5c.firebaseapp.com",
  projectId: "lxii-48b5c",
  storageBucket: "lxii-48b5c.firebasestorage.app",
  messagingSenderId: "941600252554",
  appId: "1:941600252554:web:c055963d89edc61bf98373",
  measurementId: "G-P8QHKCLGLH",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export const addCandygram = async (data: any) => {
  console.log("adding candygram");
  console.log(data);
  //anon login to comply w/ database rules
  if (!auth.currentUser) {
    await signInAnonymously(auth).catch((e) => {
      console.error(e);
    });
  }
  try {
    const candygramCollection = collection(db, "candygrams");
    const result = await addDoc(candygramCollection, data);
    console.log("Document written with ID: ", result.id);
    return result;
  } catch (e) {
    console.error(e);
  }
};
