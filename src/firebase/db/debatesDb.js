import { db } from "../index";

export const debateCollection = db.collection("debates");

export const addDebateInfo = (uid, info) => debateCollection.doc(uid).set(info);

const getDebateDoc = uid => debateCollection.doc(uid);

export const getDebateInfos = async uid => {
  const infoFunction = await getDebateDoc(uid).get();
  return infoFunction.data();
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
