import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyC0VkeePFg3fwiPGslkMGbrontxUf5EcMA",
    authDomain: "book-list-777.firebaseapp.com",
    databaseURL: "https://book-list-777.firebaseio.com",
    projectId: "book-list-777",
    storageBucket: "book-list-777.appspot.com",
    messagingSenderId: "706385556623"
};
firebase.initializeApp(config)
const fireStore = firebase.firestore();
fireStore.settings({ timestampsInSnapshots: true })
const auth = firebase.auth();
export { firebase, fireStore, auth }