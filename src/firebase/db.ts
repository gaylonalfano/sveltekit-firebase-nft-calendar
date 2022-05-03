import { collection, getDocs } from 'firebase/firestore';
import { initializeFirestore } from './firebase';
// import type { Project } from './models';

export async function getProjects(): Promise<Record<string, any>[]> {
	const { db } = initializeFirestore();
	const colRef = collection(db, 'projects');
	const snapshot = await getDocs(colRef);

	return snapshot.docs.map((project) => {
		const data = project.data();

		return {
			id: data.id,
			...data
		};
	});
}
