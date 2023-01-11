import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCcO0dTk7ckVbFqSziP7Kr0LHBcQAkeTDo",
  authDomain: "thedojosite-camhao.firebaseapp.com",
  projectId: "thedojosite-camhao",
  storageBucket: "thedojosite-camhao.appspot.com",
  messagingSenderId: "187670928982",
  appId: "1:187670928982:web:6c35200ef1a05b89eda5f7"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFireStore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp
//
export {projectFireStore, projectAuth, timestamp, projectStorage}