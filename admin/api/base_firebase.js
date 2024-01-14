const firebaseConfig = {
    apiKey: "AIzaSyAHSxYrO-NXOgyhrPAn-yVjsTjcWibKBdk",
    authDomain: "azerbaijan-energy-engineering.firebaseapp.com",
    projectId: "azerbaijan-energy-engineering",
    storageBucket: "azerbaijan-energy-engineering.appspot.com",
    messagingSenderId: "349375785141",
    appId: "1:349375785141:web:d62539d0e0ad00865176fc",
    measurementId: "G-Z2Q2E9GVZ3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Firestore referansı
export const firestore = firebase.firestore();


// LOGIN oldugunu yoxlayir
// firebase.auth().onAuthStateChanged((user) => {
//     if (!user) {
//         window.location.href = "/admin/login/login.html";
//     }
// });


const SwalFire = (swalContent, icon) => {
    Swal.fire({
        position: "center",
        icon: icon,
        title: swalContent,
        showConfirmButton: false,
        timer: 1500,
    });
};

// // // LOGOUT
// const logOutBtn = document.querySelector('.dropdown-item')
// logOutBtn.addEventListener('click', function () {
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             await firebase.auth().signOut().then(() => {
//                 SwalFire('Log Out successfully!', 'success');
//             }).catch((error) => {
//                 SwalFire(`${error}:log Out error!!`, 'error');

//             });
//         }
//     });
// });