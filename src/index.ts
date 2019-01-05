import firebase from './firebaseConfig'


const fireStore = firebase.firestore();

fireStore.collection('books').get().then((doc:any) => {
		console.log(doc)
	doc.docs.map((data)=> {
		console.log(data.id)
	});
})
console.log(fireStore);