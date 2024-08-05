
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB6ZVLOnn0HmTqRacFnyGaqXZkouXkW8NU",
    authDomain: "react-lesson2-ecc94.firebaseapp.com",
    databaseURL: "https://react-lesson2-ecc94-default-rtdb.firebaseio.com",
    projectId: "react-lesson2-ecc94",
    storageBucket: "react-lesson2-ecc94.appspot.com",
    messagingSenderId: "707751845065",
    appId: "1:707751845065:web:efb62282f15e2000ad8118",
    measurementId: "G-0RGWFJX45V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export { storage }
