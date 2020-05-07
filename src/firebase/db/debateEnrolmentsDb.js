import { db } from "../index";
import { getDebateInfos } from "./debatesDb";

export const debateCollection = db.collection("debate_enrolments");

export const addDebateInfo = (uid, info) => debateCollection.doc(uid).set(info);

export const getDebateDoc = uid => debateCollection.doc(uid);

export const getUserDebates = async userUid => {
  const actualDate = new Date();
  debateCollection.where(userUid, "==", true);
  const userDebates = debateCollection.where("date", ">=", actualDate);
  const snapshot = await userDebates.get();
  return await Promise.all(
    snapshot.docs.map(async doc => {
      let data = doc.data();
      data.debateUid = doc.id;
      data.debate = await getDebateInfos(doc.id);
      return data;
    })
  );
};
