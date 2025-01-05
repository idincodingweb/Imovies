import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCYmMWLLOiYHeZqI6TW4DFoaI7-W09rQCo",
  authDomain: "idincode-movies.firebaseapp.com",
  projectId: "idincode-movies",
  storageBucket: "idincode-movies.appspot.com", // Perbaiki storage bucket URL
  messagingSenderId: "749717936022",
  appId: "1:749717936022:web:5548e5475d717501cdefb7",
  measurementId: "G-RXP14VZ8R2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Inisialisasi Firebase Storage

// Fungsi untuk pendaftaran pengguna
const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Fungsi untuk login pengguna
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fungsi untuk logout pengguna
const logOutUser = () => {
  return signOut(auth);
};

// Pastikan semua fungsi dan objek di-export
export { 
  auth, 
  db, 
  storage, // Export Firebase Storage
  registerUser, 
  loginUser, 
  logOutUser, 
  onAuthStateChanged 
};
