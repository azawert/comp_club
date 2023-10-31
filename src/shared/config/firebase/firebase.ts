import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBTsi_NOH5HufRd3EPGHVRtGM0a7KNtu3o',
    authDomain: 'comp-club-proj.firebaseapp.com',
    projectId: 'comp-club-proj',
    storageBucket: 'comp-club-proj.appspot.com',
    messagingSenderId: '408127387714',
    appId: '1:408127387714:web:be616a70ac32bae054d5db',
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
