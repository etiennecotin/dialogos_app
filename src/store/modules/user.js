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
      .collection("user/")
      .doc(response.user.uid)
      .get();
    let userData = user.data();
    userData.email = state.loginForm.email;
    commit(SET_USER_DATA, userData);
  },
  registerUser() {
    // eslint-disable-next-line no-undef
    // auth
    //   .createUserWithEmailAndPassword(this.email, this.password)
    //   .then(response => {
    //     alert("success");
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     alert("failure");
    //     console.log(error);
    //   });
  },
  signOutAction({ commit }) {
    const response = firebase.auth().signOut();
    if (response) commit(LOGOUT);
  },
  // set constants to store from api
  checkUserLogged({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        async user => {
          if (user) {
            const userInfo = await firebase
              .firestore()
              .collection("user/")
              .doc(user.uid)
              .get();
            let userData = userInfo.data();
            userData.email = state.loginForm.email;
            commit(SET_USER_DATA, userData);
            resolve(true);
          }
          resolve(false);
        },
        () => {
          reject();
        }
      );
    });
  }
};

// mutations
const mutations = {
  [SET_FORM_EMAIL](state, params) {
    state.loginForm.email = params.email;
  },
  [SET_USER_DATA](state, params) {
    state.logged = true;
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
