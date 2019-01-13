import { firebase, fireStore, auth } from './firebaseConfig'

const form1 = document.getElementById("form1") as HTMLFormElement
const listBooks = document.getElementById("list-of-books") as HTMLUListElement
// fireStore.collection('books').get().then((doc:any) => {
// 	doc.docs.map((data)=> {
// 		console.log(data.id)
// 	});
// })

fireStore.collection('books').orderBy('name','asc').limit(5).onSnapshot((docs) => {
	listBooks.textContent = '';
	docs.docs.map((doc) => {
		const book = document.createElement('li')
		book.textContent = doc.data().name;
		book.setAttribute('id',`#${doc.id}`);
		listBooks.appendChild(book)
	})
})

form1.addEventListener('submit', (e:Event)=> {
	e.preventDefault();
	fireStore.collection('books').add({
		name:e.target['name1'].value,
		age: 25
	}).then((doc) => {console.log(doc.id)})
		.catch((err) => console.log(err))
})
// auth.signInWithEmailAndPassword('ahmednet2020@yahoo.com', '012364783259').then((e)=>{
//  console.log('login');
//  console.log(e);
// }).catch(err => {
// 	console.log(err)
// })

// auth.signOut();
auth.onAuthStateChanged((user)=> {
	if(user){
		console.log(user.uid);
	} else {
		console.log(user);
	}
});
