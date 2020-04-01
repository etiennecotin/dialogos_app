import { SET_DEBATE } from "../mutation-types";
import { getDebateInfos, getDebatersProfil } from "@/firebase/db/debatesDb";

const state = {
  inDebate: false,
  debateInformations: {
    uid: null,
    sections: null,
    description: null
  }
};

// getters
const getters = {
  // debate: state => state.debateInformations,
  debate: state => state
};
// actions
const actions = {
  async getDebate({ commit }, debateUid) {
    const debate = await getDebateInfos(debateUid);
    debate.uid = debateUid;
    debate.debaters = await getDebatersProfil(debate.debaters);
    commit(SET_DEBATE, debate);
    return debate.name;
  }
};

// mutations
const mutations = {
  [SET_DEBATE](state, debate) {
    state.debateInformations.uid = debate.uid;
    state.debateInformations.name = debate.name;
    state.debateInformations.description = debate.description;
    state.debateInformations.debaters = debate.debaters;
    state.inDebate = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
