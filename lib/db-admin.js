import { compareAsc, parseISO } from "date-fns";
import { db } from "./firebase-admin";

export const getAllFeedback = async (siteId, route) => {
  try {
    let ref = db.collection("feedback").where("siteId", "==", siteId);
    // .where("status", "==", "active");

    if (route) {
      ref = ref.where("route", "==", route);
    }

    const snapshot = await ref.get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
};

export const getSite = async (siteId) => {
  const doc = await db.collection("sites").doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };

  return { site };
};

export const getAllSites = async () => {
  try {
    const snapshot = await db.collection("sites").get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
};

export const getUserSites = async (userId) => {
  const snapshot = await db
    .collection("sites")
    .where("authorId", "==", userId)
    .get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
};

export const getUserFeedback = async (userId) => {
  const snapshot = await db
    .collection("feedback")
    .where("authorId", "==", userId)
    .get();
  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
};
