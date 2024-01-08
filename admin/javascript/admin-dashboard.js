const SwalFire = (swalContent, icon) => {
    Swal.fire({
        position: "center",
        icon: icon,
        title: swalContent,
        showConfirmButton: false,
        timer: 1500,
    });
};

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

const collectionRef = firestore.collection('statistics');


// LOGOUT
const logOutBtn = document.querySelector('.dropdown-item')
logOutBtn.addEventListener('click', function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await firebase.auth().signOut().then(() => {
                SwalFire('Səhifədən uğurla çıxdınız!', 'success');
            }).catch((error) => {
                SwalFire("Çıxış xətası:", error);
            });
        }
    });
});


// Get All Data
const totalDay = document.querySelector(".total-viewing-day");
const totalMonth = document.querySelector(".total-viewing-month");
const getAllDocuments = async () => {
    try {
        const querySnapshot = await collectionRef.get();
        querySnapshot.forEach((doc) => {
            totalDay.textContent = doc.data().view;
            totalMonth.textContent = doc.data().view * 28
        });
    } catch (error) {
        console.error('Data çekme hatası:', error);
    }
};
getAllDocuments();



