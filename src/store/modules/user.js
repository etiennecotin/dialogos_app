import firebase from "firebase";
import { SET_FORM_EMAIL, SET_USER_DATA, LOGOUT } from "../mutation-types";

const state = {
  loginForm: {
    email: ""
  },
  logged: false,
  userInfo: {}
};

// getters
const getters = {
  // dataValidityDuration: state => state.params.dataValidityDuration,
  isEmailExist: state => state.loginForm.email.length > 1,
  isLogged: state => state.logged
};
// actions
const actions = {
  async checkUserExist({ commit }, emailAddress) {
    // console.log(commit, emailAddress)
    const response = await firebase
      .auth()
      .fetchSignInMethodsForEmail(emailAddress);
    commit(SET_FORM_EMAIL, { email: emailAddress });
    return response.length > 0;
  },
  async login({ commit, state }, paswword) {
    // console.log(state, commit, paswword);
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(state.loginForm.email, paswword);
    const user = await firebase
      .firestore()
      .collection("users/")
      .doc(response.user.uid)
      .get();
    let userData = user.data();
    userData.email = state.loginForm.email;
    commit(SET_USER_DATA, userData);
  },
  async registerUser({ commit, state }, userData) {
    const userInfos = {
      ...{ firstName: "etienne", lastName: "cotin" },
      ...userData
    };
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        state.loginForm.email,
        userInfos.password
      );
    await firebase
      .firestore()
      .collection("users/")
      .doc(response.user.uid)
      .set(userInfos);
    commit(SET_USER_DATA, userInfos);
  },
  signOutAction({ commit }) {
    const response = firebase.auth().signOut();
    if (response) commit(LOGOUT);
  },
  // set constants to store from api
  checkUserLogged({ commit }) {
    firebase.auth().onAuthStateChanged(
      async user => {
        if (user) {
          await commit("SET_LOGGED");
          const userInfo = await firebase
            .firestore()
            .collection("users/")
            .doc(user.uid)
            .get();
          let userData = userInfo.data();
          userData.email = user.email;
          commit(SET_USER_DATA, userData);
        }
      },
      () => {
      //  TOTO ajouter un retour erreur
      }
    );
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
