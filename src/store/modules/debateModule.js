import {
  SET_DEBATE,
  UPDATE_DEBATE,
  SET_DEBATE_SECTIONS,
  UPDATE_SECTIONS_QUESTIONS
} from "../mutation-types";
import {
  getDebateInfos,
  getDebatersProfil,
  getDebateSections,
  subscribeToChange,
  unsubscribeToChange
} from "@/firebase/db/debatesDb";
import { subscribeQuestionsChange } from "@/firebase/db/debateSectionsQuestionsDb";

const state = {
  debateInformations: {
    uid: null,
    description: null
  },
  debaters: null,
  sections: null,
  actualSection: null,
  startedAt: null,
  subscriber: null,
  sectionsQuestionsSubscriber: null
};

// getters
const getters = {
  // debate: state => state.debateInformations,
  debate: state => state,
  actualSection: state =>
    state.sections.find(element => element.order === state.actualSection)
};
// actions
const actions = {
  async getDebate({ commit, dispatch }, debateUid) {
    const debate = await getDebateInfos(debateUid);
    const subscriber = subscribeToChange(debateUid, function(doc) {
      commit(UPDATE_DEBATE, doc.data());
    });

    debate.uid = debateUid;
    debate.subscriber = subscriber;
    debate.debaters = await getDebatersProfil(debate.debaters);
    commit(SET_DEBATE, debate);
    await dispatch("getDebateSections", debate);
    return debate.name;
  },
  async unsubscribeDebate({ state }) {
    // console.log("unsubscribe");
    unsubscribeToChange(state.subscriber);
  },
  async getDebateSections({ commit }, debate) {
    const sections = await getDebateSections(debate.uid);
    commit(SET_DEBATE_SECTIONS, sections);
  },
  async listenQuestions({ commit, state }, sectionId) {
    if (state.sectionsQuestionsSubscriber === null) {
      const actualSectionIndex = state.sections.findIndex(
        item => item.uid === sectionId
      );
      // const actualSection = state.sections[actualSectionIndex];
      state.sectionsQuestionsSubscriber = subscribeQuestionsChange(
        state.debateInformations.uid,
        sectionId,
        function(doc) {
          // console.log("change => ", actualSectionIndex)
          //get change array
          const newQuestions = doc.docs.map(doc => {
            let data = doc.data();
            data.uid = doc.id;
            return data;
          });

          //TODO ajouter le remove d'un element
          // var onlyOnActual = actualSection.questions.filter(compare(newQuestions));
          // const onlyOnNew = newQuestions.filter(
          //   compare(actualSection.questions)
          // );
          //
          // const result = actualSection.questions.concat(onlyOnNew);

          commit(UPDATE_SECTIONS_QUESTIONS, {
            actualSectionIndex: actualSectionIndex,
            newArray: newQuestions
          });
        }
      );
    }
  }
};

// mutations
const mutations = {
  [SET_DEBATE](state, debate) {
    state.debateInformations.uid = debate.uid;
    state.debateInformations.name = debate.name;
    state.debateInformations.description = debate.description;
    state.debateInformations.duration = debate.duration;
    state.actualSection = debate.actualSection;
    state.debaters = debate.debaters;
    state.subscriber = debate.subscriber;
    state.startedAt = debate.startedAt;
  },
  [UPDATE_DEBATE](state, debate) {
    state.actualSection = debate.actualSection;
    state.startedAt = debate.startedAt;
  },
  [SET_DEBATE_SECTIONS](state, sections) {
    state.sections = sections;
  },
  [UPDATE_SECTIONS_QUESTIONS](state, data) {
    state.sections[data.actualSectionIndex].questions = data.newArray;
  }
};

// const compare = otherArray => {
//   return function(current) {
//     return (
//       otherArray.filter(function(other) {
//         return other.uid === current.uid;
//       }).length === 0
//     );
//   };
// };

export default {
  state,
  getters,
  actions,
  mutations
};
