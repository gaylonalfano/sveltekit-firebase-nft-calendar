import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './config';
import { getFirestore } from 'firebase/firestore';

export function initializeFirebaseAndGetFirestore() {
	if (getApps().length == 0) {
		initializeApp(firebaseConfig);
	}

	return { db: getFirestore() };
}
