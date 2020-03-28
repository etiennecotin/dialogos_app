const state = {
  params: {
  },
  isLoaded: false,
  retry: false,
  selectedPoint: null,
  indexToScroll: null,
  arianeLine: {
    show: false,
    name: "Ma tournée",
    infos: null,
    textColor: null
  }
};

// getters
const getters = {
  // dataValidityDuration: state => state.params.dataValidityDuration,
};
// actions
const actions = {
  // set constants to store from api
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
