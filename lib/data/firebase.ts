import admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);
// models from firestore data base
if(!admin.apps.length){ 
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const firestore = admin.firestore();
const authCollection = firestore.collection('auth');
const userCollection = firestore.collection('user');
const orderCollection = firestore.collection('order');

export { authCollection, userCollection,orderCollection ,firestore }