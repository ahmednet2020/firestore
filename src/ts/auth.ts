import { fireStore, auth, functions } from './firebaseConfig'
import { login, logout, signup, newAdmin } from './var'
import { AuthStatefun } from './UIfunction'

// add admin cloud function
newAdmin.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminEmail = newAdmin["email"].value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// login
login.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = login["email"].value;
	const password = login["password"].value;
	auth.signInWithEmailAndPassword(email, password).then((e)=>{
	 console.log('login');
	}).catch(err => {
		console.log(err)
	})
})
// logout
logout.addEventListener("click", (e) => {
	e.preventDefault();
	auth.signOut();
})
// new user create
signup.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = signup["email"].value;
	const password = signup["password"].value;
	const name = signup["names"].value;
	const bio = signup["bio"].value;
	auth.createUserWithEmailAndPassword(email, password).then((e) => {
		return fireStore.collection("users").doc(e.user.uid).set({
			name,
			bio,
			date: new Date()
		})
	}).then(data => {
		console.log('signin sucess')
	}).catch(err => {
		console.log('signup fail')
	})
})
// realtime change auth state
auth.onAuthStateChanged((user)=> {
	AuthStatefun(user)
});