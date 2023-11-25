

import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyA7_OIVsP6uo5T7qyCLui5m2Z-cW1a0Kbs",
  authDomain: "qlapp-e3f6d.firebaseapp.com",
  projectId: "qlapp-e3f6d",
  storageBucket: "qlapp-e3f6d.appspot.com",
  messagingSenderId: "270976742630",
  appId: "1:270976742630:web:5c088302c2077a41cf3727"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default db;

 