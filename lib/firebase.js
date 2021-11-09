import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process);
const firebaseConfig = {
	apiKey: "AIzaSyBgjU0ZSZ_Ux9b6E9SMliyJllz-YO8SwFg",

	authDomain: "spotify-clone-virid.vercel.app",

	projectId: "spotify-clone-c1957",

	storageBucket: "spotify-clone-c1957.appspot.com",

	messagingSenderId: "957331344821",

	appId: "1:957331344821:web:52de9613b016d73248ddfc",

	measurementId: "G-JBCK3Z6QEP",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
