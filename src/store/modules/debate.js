import firebase from "firebase";
import { SET_DEBATE } from "../mutation-types";

const state = {
  inDebate: false,
  debateInformations: {
    uid: null,
    sections: null
  }
};

// getters
const getters = {
  // dataValidityDuration: state => state.params.dataValidityDuration,
  debate: state => state.debateInformations,
};
// actions
const actions = {
  async getDebate({ commit }, debateUid) {
    const response = await firebase
      .firestore()
      .collection('debates').doc(debateUid).get();

    let debate = response.data();
    debate.uid = debateUid;
    commit(SET_DEBATE, debate);
    return debate.name;
  },
};

// mutations
const mutations = {
  [SET_DEBATE](state, debate) {
    state.debateInformations.uid = debate.uid;
    state.debateInformations.name = debate.name;
    state.inDebate = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
