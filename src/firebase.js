// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// = configs of recipesProduction on johnmorris00000@gmail.com
// const firebaseConfig = {
// apiKey: `${process.env.REACT_APP_API_KEY_FIREBASE}`,
// authDomain: "recipesproduction-89306.firebaseapp.com",
// 	projectId: "recipesproduction-89306",
// 	storageBucket: "recipesproduction-89306.appspot.com",
// 	messagingSenderId: "758702867751",
// 	appId: "1:758702867751:web:61e0b9096062aa30d15502",
// };

// = configs of recipesProduction on johnkayrous@gmail.com
const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_API_KEY_FIREBASE}`,
	authDomain: "recipe-production-3.firebaseapp.com",
	projectId: "recipe-production-3",
	storageBucket: "recipe-production-3.appspot.com",
	messagingSenderId: "134753163580",
	appId: "1:134753163580:web:ac737a1358aab009da2639",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
