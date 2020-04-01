import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/appModule";
import user from "./modules/userModule";
import debate from "./modules/debateModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
    debate
  }
});
