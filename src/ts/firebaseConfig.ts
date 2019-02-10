import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
const config = {
    apiKey: "AIzaSyC0VkeePFg3fwiPGslkMGbrontxUf5EcMA",
    authDomain: "book-list-777.firebaseapp.com",
    databaseURL: "https://book-list-777.firebaseio.com",
    projectId: "book-list-777",
    storageBucket: "book-list-777.appspot.com",
    messagingSenderId: "706385556623"
};
const fireBase = firebase.initializeApp(config);
const fireStore = fireBase.firestore();
const auth = fireBase.auth();
const functions = fireBase.functions();
fireStore.settings({ timestampsInSnapshots: true })
export { fireBase, fireStore, auth, functions}