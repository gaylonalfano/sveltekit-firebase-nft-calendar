import { collection, getDocs } from 'firebase/firestore';
import { initializeFirebaseAndGetFirestore } from './firebase';
import type { Book } from '$lib/models';

export async function getProjects(): Promise<Record<string, any>[]> {
	const { db } = initializeFirebaseAndGetFirestore();
	const colRef = collection(db, 'projects');
	const snapshot = await getDocs(colRef);

	return snapshot.docs.map((project) => {
		const data = project.data();

		// NOTE 'data' has the fields only, NOT the auto ID!
		// so we need to add it to our returned object
		return {
			id: data.id,
			...data
		};
	});
}

export async function getBooks(): Promise<Book[]> {
	const { db } = initializeFirebaseAndGetFirestore();
	const colRef = collection(db, 'books');
	const snapshot = await getDocs(colRef);

	return snapshot.docs.map((book) => {
		const data = book.data();

		// NOTE 'data' has the fields only, NOT the auto ID!
		// so we need to add it to our returned object
		return {
			id: book.id,
			title: data['title'],
			author: data['author']
		};
	});
}
