import { db } from "../index";

export const debateCollection = db.collection("debates");

export const addDebateInfo = (uid, info) => debateCollection.doc(uid).set(info);

export const getDebateDoc = uid => debateCollection.doc(uid);

export const getDebateInfos = async uid => {
  const infoFunction = await getDebateDoc(uid).get();
  return infoFunction.data();
};

export const subscribeToChange = (uid, snapshotFunction) => {
  return getDebateDoc(uid).onSnapshot(snapshotFunction);
};
export const unsubscribeToChange = unsubscribeSnapshot => {
  unsubscribeSnapshot();
};

export const getDebateSections = async debateUid => {
  const infoFunction = await getDebateDoc(debateUid);
  const snapshot = await infoFunction.collection("sections").get();
  return await Promise.all(
    snapshot.docs.map(async doc => {
      const questions = await getDebateSectionQuestions(debateUid, doc.id);
      let data = doc.data();
      data.uid = doc.id;
      data.questions = questions;
      return data;
    })
  );
};

const getDebateSectionQuestions = async (debateUid, sectionUid) => {
  const infoFunction = await getDebateDoc(debateUid);
  const snapshot = await infoFunction
    .collection("sections")
    .doc(sectionUid)
    .collection("questions")
    .get();
  return snapshot.docs.map(doc => {
    let data = doc.data();
    data.uid = doc.id;
    return data;
  });
};

export const getDebatersProfil = async debatersIdArray => {
  return await Promise.all(
    debatersIdArray.map(async debaterId => {
      const user = await db
        .collection("users/")
        .doc(debaterId)
        .get();
      const userData = user.data();
      userData.uid = debaterId;
      return userData;
    })
  );
};

export default { addDebateInfo };
