import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const addAdminRole = functions.https.onCall((data: any, context:functions.https.CallableContext) => {
	// get user and add admin custom claim
	return admin.auth().getUserByEmail(data.email).then(user => {
		return admin.auth().setCustomUserClaims(user.uid, {
			  admin: true
			})
	}).then((user) => {
	return {
			message: `Success! ${data.email} has been made an admin.`,
			user
		}
	}).catch(err => {
		return err;
	});
});