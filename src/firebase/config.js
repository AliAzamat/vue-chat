import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAnMEmFmZSluGYs8iIHpAyy4QbMPlG9wsA",
  authDomain: "vue-chat-274a3.firebaseapp.com",
  projectId: "vue-chat-274a3",
  storageBucket: "vue-chat-274a3.appspot.com",
  messagingSenderId: "898587283694",
  appId: "1:898587283694:web:bbd787eb1f111a864fa3ff"
};

firebase.initializeApp(firebaseConfig)



const auth = firebase.auth()
const firestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { firestore, timestamp, auth }