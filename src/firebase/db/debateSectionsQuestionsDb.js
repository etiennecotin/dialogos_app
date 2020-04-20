// import { db } from "../index";
import { getDebateDoc } from "./debatesDb";

export const questionsCollection = (debateUid, sectionUid) =>
  getDebateDoc(debateUid)
    .collection("sections")
    .doc(sectionUid)
    .collection("questions");

export const subscribeQuestionsChange = (
  debateUid,
  sectionUid,
  snapshotFunction
) => {
  return questionsCollection(debateUid, sectionUid).onSnapshot(
    snapshotFunction
  );
};
export const unsubscribeToChange = unsubscribeSnapshot => {
  unsubscribeSnapshot();
};
