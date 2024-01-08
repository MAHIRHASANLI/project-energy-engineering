// const firebaseConfig = {
//     apiKey: "AIzaSyAHSxYrO-NXOgyhrPAn-yVjsTjcWibKBdk",
//     authDomain: "azerbaijan-energy-engineering.firebaseapp.com",
//     projectId: "azerbaijan-energy-engineering",
//     storageBucket: "azerbaijan-energy-engineering.appspot.com",
//     messagingSenderId: "349375785141",
//     appId: "1:349375785141:web:d62539d0e0ad00865176fc",
//     measurementId: "G-Z2Q2E9GVZ3"
// };

// firebase.initializeApp(firebaseConfig);
// // Firestore referansı
// const firestore = firebase.firestore();
// // Tüm belgeleri almak için koleksiyon referansı
// const collectionRef = firestore.collection('statistics');


// document.addEventListener("DOMContentLoaded", async () => {

//     try {
//         let view
//         const querySnapshot = await collectionRef.get();
//         querySnapshot.forEach((doc) => {
//             view = doc.data().view;
//         });
//         // await collectionRef.add(view += 1);
//     } catch (error) {
//         console.error(error);
//     }
// })