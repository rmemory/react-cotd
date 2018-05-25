import Rebase from 're-base'; // Allows state to be be mirrored to firebase
import firebase from 'firebase'; // we pass the rebase to firebase

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAH894Ddjcui6-XHVNMxoqYAmExsSOlxk4",
	authDomain: "cotd-rmemory.firebaseapp.com",
	databaseURL: "https://cotd-rmemory.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp }

// This is a default export
export default base;