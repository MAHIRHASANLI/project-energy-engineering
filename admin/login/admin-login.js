

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

const adminLoginForm = document.getElementById('admin-login-form');

adminLoginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById("email-signIn").value;
    const password = document.getElementById("password-signIn").value;
    // await initializeFirebase();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Giriş başarılı olduğunda yapılacak işlemler
            // const user = userCredential.user;
            // console.log("Giriş başarılı, kullanıcı:", user);
            window.location.href = "/admin/admin.html";
        })
        .catch((error) => {
            // Girişte hata oluştuğunda yapılacak işlemler
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Hata:", errorCode, errorMessage);
        });
});


// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         window.location.href = "/admin/admin.html";
//     } else {
//         console.log("Kullanıcı oturumu kapattı.");
//     }
// });