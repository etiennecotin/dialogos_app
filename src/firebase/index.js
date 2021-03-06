import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

// Get a Firestore instance
firebase.initializeApp(firebaseConfig).firestore();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const db = firebase.firestore();
export const storage = firebase.storage();

export default {
  auth,
  firebase,
  db,
  storage
};
