import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB7G93dxG2ZmkzYTIjNZlZZ41c1QbqUG_g",
  authDomain: "blogninh-10c8d.firebaseapp.com",
  projectId: "blogninh-10c8d",
  storageBucket: "blogninh-10c8d.appspot.com",
  messagingSenderId: "303580279574",
  appId: "1:303580279574:web:fe9ba8c0e226a9e593d637"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)