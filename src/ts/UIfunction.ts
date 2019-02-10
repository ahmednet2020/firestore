import { fireStore  } from './firebaseConfig'
import { listBooks ,login, logout, signup, state } from './var'

// show data function
export function listBooksfun(docs) {
	listBooks.textContent = '';
	docs.docs.map((doc) => {
		const book = document.createElement('li')
		const btnX = document.createElement('button') as HTMLButtonElement;
		btnX.setAttribute('type', 'button');
		btnX.textContent = 'X'
		btnX.addEventListener('click', (e) => {
			e.preventDefault();
			const id = doc.id;
			fireStore.collection('books').doc(id).delete()
		})
		book.textContent = doc.data().name;
		book.setAttribute('id',`${doc.id}`);
		book.setAttribute('class',`book-item`);
		book.appendChild(btnX)
		listBooks.appendChild(book)
	})
}
// menua state
export function AuthStatefun(user) {
	if(user){
		login.hidden = true;
		signup.hidden = true;
		logout.hidden = false;
		fireStore.collection('users').doc(user.uid).get().then((data) => {
			const text = `<span> email:${user.email}</span>
						<span>id:${user.uid}</span>
						<span>bio:${data.data().bio}</span>`;
			state.innerHTML = text;
		});

	} else {
		const text = `<span>welcome login pleasee</span>`
		state.innerHTML = text;
		login.hidden = false;
		signup.hidden = false;
		logout.hidden = true;
	}
}
