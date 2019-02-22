import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const addAdminRole = functions.https.onCall((data: any, context:functions.https.CallableContext) => {
	// get user and add admin custom claim
	const role:boolean = (data.role === "admin")? true:false;
	if(context.auth.token.admin !== true)
	{
		return 'you are not admin';
	}
	return admin.auth().getUserByEmail(data.email).then(user => {
		return admin.auth().setCustomUserClaims(user.uid, {admin:role})
	}).then(() => {
	return {
			message: `Success! ${data.email} has been made an ${data.role}.`,
			context:context.auth.token
		}
	}).catch(err => {
		return err;
	});
});