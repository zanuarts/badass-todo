import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: '',
  authDomain: 'badass-todo-37f4a.firebaseapp.com',
  projectId: 'badass-todo-37f4a',
  storageBucket: 'badass-todo-37f4a.appspot.com',
  messagingSenderId: '',
  appId: ''
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export {
    db
}