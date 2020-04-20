import {
  SET_FORM_EMAIL,
  SET_USER_DATA,
  LOGOUT,
  SET_PROFIL_PICTURE,
  SET_UPLOAD_PICTURE
} from "../mutation-types";
import {
  addUserInfo,
  onAuthStateChanged,
  checkExistingUser,
  getUserInfo,
  loginUser,
  registerUser,
  logout,
  addUserProfilPicture,
  updateUserInfo
} from "@/firebase/db/usersDb";

const state = {
  loginForm: {
    email: ""
  },
  logged: false,
  userInfo: {},
  uploadFile: null,
  inDebate: false // TODO map to local storage for retriveaw debate on open app
};

// getters
const getters = {
  // dataValidityDuration: state => state.params.dataValidityDuration,
  isEmailExist: state => state.loginForm.email.length > 1,
  isLogged: state => state.logged,
  uploadAdvancement: state => Math.trunc(state.uploadFile),
  profilePicture: state => state.userInfo.profilePicture,
  userInfos: state => state.userInfo
};
// actions
const actions = {
  async checkUserExist({ commit }, emailAddress) {
    const response = await checkExistingUser(emailAddress);
    commit(SET_FORM_EMAIL, { email: emailAddress });
    return response.length > 0;
  },
  async login({ commit, state }, password) {
    const response = await loginUser(state.loginForm.email, password);
    const user = await getUserInfo(response.user.uid);
    user.uid = response.user.uid;
    user.email = state.loginForm.email;
    commit(SET_USER_DATA, user);
  },
  // register new user
  async registerUser({ commit, state }, userData) {
    const userInfos = {
      ...{ firstName: "", lastName: "" }
      // ...userData
    };
    const response = await registerUser(
      state.loginForm.email,
      userData.password
    );
    await addUserInfo(response.user.uid, userInfos);
    commit(SET_USER_DATA, userInfos);
  },
  // logout user
  signOutAction({ commit }) {
    const response = logout();
    if (response) commit(LOGOUT);
  },
  // set constants to store from api
  checkUserLogged({ commit }) {
    onAuthStateChanged(
      async user => {
        if (user) {
          await commit("SET_LOGGED");
          const userInfo = await getUserInfo(user.uid);
          userInfo.uid = user.uid;
          userInfo.email = user.email;
          commit(SET_USER_DATA, userInfo);
        }
      },
      () => {
        //  TOTO ajouter un retour erreur
      }
    );
  },
  async changeUserProfilPicture({ commit, state }, file) {
    const imageUrl = await addUserProfilPicture(file, function(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      commit(SET_UPLOAD_PICTURE, progress);
    });
    await updateUserInfo(state.userInfo.uid, {
      profilePicture: imageUrl
    });
    commit(SET_PROFIL_PICTURE, imageUrl);
    return true;
  }
};

// mutations
const mutations = {
  [SET_FORM_EMAIL](state, params) {
    state.loginForm.email = params.email;
  },
  SET_LOGGED(state) {
    state.logged = true;
  },
  [SET_USER_DATA](state, params) {
    // state.logged = true;
    state.userInfo = params;
  },
  [SET_PROFIL_PICTURE](state, url) {
    state.userInfo.profilePicture = url;
  },
  [SET_UPLOAD_PICTURE](state, percentage) {
    state.uploadFile = percentage;
  },
  [LOGOUT](state) {
    state.logged = false;
    state.userInfo = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
