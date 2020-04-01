import { SET_APP_READY, SET_HEADER_NAME } from "../mutation-types";

const state = {
  appReady: false,
  retry: false,
  header: {
    default: true,
    name: "Dialogos"
  }
};

// getters
const getters = {
  isAppReady: state => state.appReady,
  header: state => state.header
};
// actions
const actions = {
  // set constants to store from api
  setAppReady({ commit }) {
    commit(SET_APP_READY);
  },
  setHeader({ commit }, headerParams) {
    commit(SET_HEADER_NAME, headerParams);
  }
  // init({ commit }) {
  // fetch('http://192.168.1.14:8181/const/consts.json')
  // fetch("https://route.gls-france.com:3040/WSNavigo_ChargePARAM/param")
  //   // HTTP.get(`const/consts.json`)
  //   .then(r => r.json())
  //   .then(response => {
  //     if (response["MAPPING-ERRORS"]) {
  //       response.MAPPING_ERRORS = response["MAPPING-ERRORS"];
  //       delete response["MAPPING-ERRORS"];
  //     }
  //     if (response["MESSAGE-SMS"]) {
  //       response.MESSAGE_SMS = response["MESSAGE-SMS"];
  //       delete response["MESSAGE-SMS"];
  //     }
  //     commit(types.INITIALIZE_STORE, response);
  //   })
  //   .catch(e => {
  //     state.retry = true;
  //   });
  // },
};

// mutations
const mutations = {
  [SET_APP_READY](state) {
    state.appReady = true;
  },
  [SET_HEADER_NAME](state, headerParams) {
    state.header.default = headerParams.default;
    state.header.name = headerParams.name;
  }
  // [types.INITIALIZE_STORE](state, params) {
  //   /** @namespace params.NVHISTDATA */
  //   state.params.dataValidityDuration = params.NVHISTDATA;
  //   /** @namespace params.NVSCOREGEO */
  //   state.params.geolocationThresholdScore = params.NVSCOREGEO;
  //   /** @namespace params.NVNIVGEO */
  //   state.params.geolocationThresholdLevel = params.NVNIVGEO;
  //   /** @namespace params.MAPPING_ERRORS */
  //   state.params.mappingErrors = params.MAPPING_ERRORS;
  //   /** @namespace params.MESSAGE_SMS */
  //   state.params.messageSms = params.MESSAGE_SMS;
  //
  //   state.isLoaded = true;
  // },
};

export default {
  state,
  getters,
  actions,
  mutations
};
