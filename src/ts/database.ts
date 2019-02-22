import { fireBase, fireStore, auth } from './firebaseConfig'
import { listBooks, newBook} from './var'
import { listBooksfun } from './UIfunction'

// realtime date base by onSnapshot
fireStore.collection('books').orderBy('name','asc').onSnapshot((docs) => {
	listBooksfun(docs);
}, err => {
	listBooks.textContent = err.message;
})
// add new book
newBook.addEventListener('submit', (e:Event)=> {
	e.preventDefault();
	fireStore.collection('books').add({
		name:e.target['name1'].value,
		creatBy: auth.currentUser.email,
		creatAt: new Date
	}).then((doc) => {
		newBook.reset();
	}).catch((err) =>{
		newBook['error'].value = err.message;
	})
})
