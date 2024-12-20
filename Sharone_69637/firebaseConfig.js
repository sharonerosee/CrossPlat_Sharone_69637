import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDuDxWxlpdER2BaMhlFOv7g5khXInUQbSg",
    authDomain: "tugas-crossplat.firebaseapp.com",
    projectId: "tugas-crossplat",
    storageBucket: "tugas-crossplat.firebasestorage.app",
    messagingSenderId: "582718430768",
    appId: "1:582718430768:android:5343ca7bb373c38e2857f5",
    // measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };