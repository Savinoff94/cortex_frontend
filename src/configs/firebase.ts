import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

let firebaseConfig = null;

if(import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
    firebaseConfig = {
        apiKey: "fake-api-key",
        authDomain: "localhost",
        projectId: "cortex-e091e",
        storageBucket: "cortex-e091e.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abc123",
    };
}
else {
    firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
    connectAuthEmulator(auth, "http://localhost:9099");
}

export default auth;