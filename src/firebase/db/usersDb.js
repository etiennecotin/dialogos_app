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

export const addUserProfilPicture = async (file) => {
  const user = getCurrentUser();

  // Create a Storage Ref w/ username
  const storageRef = storage.ref(user.uid + "/profilePictures/" + file.name);

  const metadata = {
    contentType: "image/jpeg"
  };
  // Upload file
  // TODO ajouter la modification du profil utilisateur
  const uploadTask = storageRef.put(file, metadata);
  uploadTask.on(
    "state_changed",
    function(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused": // or 'paused'
          // console.log("Upload is paused");
          break;
        case "running": // or 'running'
          // console.log("Upload is running");
          break;
      }
      return progress;
    },
    function(error) {
      // Handle unsuccessful uploads
      // console.log(error);
      return error;
    },
    function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log("File available at", downloadURL);
        return downloadURL;
      });
    }
  );
  return uploadTask;
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
