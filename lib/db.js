import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export const createSite = (data) => {
  const site = firestore.collection("sites").doc();
  site.set(data);

  return site;
};

export const updateSite = (id, newValues) => {
  return firestore.collection("sites").doc(id).update(newValues);
};

export const deleteSite = async (id) => {
  // Delete site from db
  firestore.collection("sites").doc(id).delete();
  // Get feedback for site, so it can also be deleted
  const snapshot = await firestore
    .collection("feedback")
    .where("siteId", "==", id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
};


export const createFeedback = (data) => {
  return firestore.collection("feedback").add(data);
};

export const updateFeedback = (id, newValues) => {
  return firestore.collection("feedback").doc(id).update(newValues);
};

export const deleteFeedback = (id) => {
  return firestore.collection("feedback").doc(id).delete();
};
