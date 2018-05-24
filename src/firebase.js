import Firebase from 'firebase'

/**
 * Pega aquí los datos de tu proyecto firebase
 */
const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyAwKGVFfZkp7JRGl6TkeeKwyFAJhKEg2ZM",
    authDomain: "comicview-da215.firebaseapp.com",
    databaseURL: "https://comicview-da215.firebaseio.com",
    projectId: "comicview-da215",
    storageBucket: "comicview-da215.appspot.com",
    messagingSenderId: "89036379902"
});

export const db = firebaseApp.database()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()