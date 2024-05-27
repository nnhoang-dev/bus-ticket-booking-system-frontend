/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAqU_7r9pe8BCpV9naPG2XLv265H1DREwM',
	authDomain: 'bus-ticket-booking-syste-f7b6c.firebaseapp.com',
	projectId: 'bus-ticket-booking-syste-f7b6c',
	storageBucket: 'bus-ticket-booking-syste-f7b6c.appspot.com',
	messagingSenderId: '1891562293',
	appId: '1:1891562293:web:630b8c31cdfc2416fa927c',
	measurementId: 'G-3V3TPGC87S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
