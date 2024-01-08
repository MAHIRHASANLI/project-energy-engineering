const aeekContainerItem = document.querySelector('.aeekContainer-item');

const firebaseConfig = {
    apiKey: "AIzaSyAHSxYrO-NXOgyhrPAn-yVjsTjcWibKBdk",
    authDomain: "azerbaijan-energy-engineering.firebaseapp.com",
    projectId: "azerbaijan-energy-engineering",
    storageBucket: "azerbaijan-energy-engineering.appspot.com",
    messagingSenderId: "349375785141",
    appId: "1:349375785141:web:d62539d0e0ad00865176fc",
    measurementId: "G-Z2Q2E9GVZ3"
};

firebase.initializeApp(firebaseConfig);
// Firestore referansı
const firestore = firebase.firestore();
// Tüm belgeleri almak için koleksiyon referansı
const collectionRef = firestore.collection('AEEKinNumbers');

// addDateUI - UI 
// { title, text, img, date, id } = newNews
const addDateUI = (newAeek) => {
    aeekContainerItem.innerHTML +=
        `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div class="aeek-item">
           <p>${newAeek.name} </p><span>${newAeek.number}</span>
        </div>
     </div>`
}

let AEEKinNumbersArray = [];
const getAllDocuments = async () => {
    try {
        const querySnapshot = await collectionRef.get();

        querySnapshot.forEach((doc) => {
            const data = {
                name: doc.data().name,
                number: doc.data().number,
                id: doc.id
            }
            AEEKinNumbersArray.push(data)
            addDateUI(data)
        });
    } catch (error) {
        console.error('Data çekme hatası:', error);
    }
};
// getAllDocuments fonksiyonunu çağır
getAllDocuments();