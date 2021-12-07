
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYpdRu6aie31VHta8EeD1f5pL3mMIFCoo",
  authDomain: "hrboostin-pro.firebaseapp.com",
  projectId: "hrboostin-pro",
  storageBucket: "hrboostin-pro.appspot.com",
  messagingSenderId: "784042279518",
  appId: "1:784042279518:web:7d75ace7b2c02e53e02acf"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const appSignUp = firebase.initializeApp(firebaseConfig,'temp');

//Make auth and firestore references
const auth = firebase.auth();
// const db = firebase.firestore();

// //update firestore settings
// db.settings({timestampsInSnapshots: true})