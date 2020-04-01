import { auth, db } from "../index";
import { debateCollection } from "@/firebase/db/debatesDb";

const collection = db.collection("users");

export const addUserInfo = (uid, info) => collection.doc(uid).set(info);

const getUserDoc = uid => debateCollection.doc(uid);

export const getUserInfo = async uid => {
  const infoFunction = await getUserDoc(uid).get();
  return infoFunction.data();
};

export const loginUser = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const registerUser = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const checkExistingUser = async email => {
  return await auth.fetchSignInMethodsForEmail(email);
};

export const onAuthStateChanged = func => {
  auth.onAuthStateChanged(func);
};

export const logout = () => {
  return auth.signOut();
};

export default { addUserInfo };
