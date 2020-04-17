import { auth, db, storage } from "../index";

const collection = db.collection("users");

export const addUserInfo = (uid, info) => collection.doc(uid).set(info);

export const updateUserInfo = (uid, info) =>
  collection.doc(uid).set(info, { merge: true });

const getUserDoc = uid => collection.doc(uid);

export const getUserInfo = async uid => {
  const infoFunction = await getUserDoc(uid).get();
  return infoFunction.data();
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const addUserProfilPicture = async (
  file,
  onProgress = () => {},
  onErreur = () => {}
) => {
  const user = getCurrentUser();

  // Create a Storage Ref w/ username
  const storageRef = storage.ref(user.uid + "/profilePictures/" + file.name);

  const metadata = {
    contentType: "image/jpeg"
  };
  // Upload file
  const uploadTask = storageRef.put(file, metadata);
  return new Promise(function(resolve) {
    uploadTask.on("state_changed", onProgress, onErreur, function() {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        resolve(downloadURL);
      });
    });
  });
};

// essentials methods
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
