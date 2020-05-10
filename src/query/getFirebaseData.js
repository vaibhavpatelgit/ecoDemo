import { firestore } from "firebase/app";

function getFirebaseDataQuery(collectionName, docId) {
  if (docId) {
    return firestore().collection(collectionName).doc(docId);
  } else {
    return firestore().collection(collectionName);
  }
}

export default getFirebaseDataQuery;
