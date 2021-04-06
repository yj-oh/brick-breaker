const firebaseConfig = {
	apiKey: '',
	projectId: '',
	storageBucket: '',
	appId: '',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const collectionName = 'score';

export const getRanking = async () => {
	let data = [];

	await db.collection(collectionName)
		.orderBy('score', 'desc')
		.orderBy('createdAt', 'desc')
		.limit(5)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
		})
		.catch((e) => {
			console.log(e);
		});
	return data;
}

export const setRanking = async (username, score) => {
	await db.collection(collectionName)
		.add({
			username: username,
			score: score,
			createdAt: new Date().getTime(),
		});
}
