import { initializeApp, getApps } from 'firebase/app';
// import { firebaseConfig } from './config';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAXUWulvGmrR1Gu3Pn8wQq0g5xgAnHDRIE',
	authDomain: 'nft-calendar-ade51.firebaseapp.com',
	projectId: 'nft-calendar-ade51',
	storageBucket: 'nft-calendar-ade51.appspot.com',
	messagingSenderId: '32575287263',
	appId: '1:32575287263:web:48be293f2d499ef97e9e6a'
};

export function initializeFirestore() {
	if (getApps().length == 0) {
		initializeApp(firebaseConfig);
	}

	return { db: getFirestore() };
}
