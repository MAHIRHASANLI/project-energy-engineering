


const aeekInNumberTableTbody = document.querySelector(".aeekInNumber-table--tbody");

// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const modalBtn = document.querySelector(".modal-btn");


// postAndUpdateSwal - Swall gosterilmesi
const SwalFire = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `<span style="color:#E05306;">Aeek in Number</span> - added successfully!`,
        showConfirmButton: false,
        timer: 1500
    })
}

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

// LOGIN oldugunu yoxlayir
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "/admin/login/login.html";
    }
});

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
// addDateUI - UI 
// { title, text, img, date, id } = newNews
const addDateUI = (newAeek) => {
    aeekInNumberTableTbody.innerHTML +=
        `<tr id="${newAeek.id}">
 <td>${newAeek.name}</td>
 <td>${newAeek.number}</td>
 <td><button type="button" class="btn btn-success update" id="${newAeek.id}">Update</button></td>
</tr>`
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




// Update - // Modal acilmasi;
document.addEventListener('click', function (event) {
    const clickedBtn = event.target;
    if (clickedBtn.classList.contains('update')) {
        document.getElementsByClassName("project-name")[0].value = clickedBtn.parentElement.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("project-number")[0].value = clickedBtn.parentElement.previousElementSibling.textContent;
        modal.style.display = "block";
        modalBtn.setAttribute("id", clickedBtn.getAttribute("id"));
    }
})


modalBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    modal.style.display = "none";

    const number = document.getElementsByClassName("project-number")[0].value;
    const name = document.getElementsByClassName("project-name")[0].value;

    const aeekIdToUpdate = modalBtn.getAttribute("id");
    //UPDATE FUNKSIYASI
    try {
        const documentRef = collectionRef.doc(aeekIdToUpdate);
        await documentRef.update({ name, number });
        const updateTask = AEEKinNumbersArray.map((item) => {
            if (String(item.id) === String(aeekIdToUpdate)) {
                return { id: item.id, name, number }
            };
            return item;
        });
        aeekInNumberTableTbody.innerHTML = '';
        updateTask.forEach((newAeek) => addDateUI(newAeek));
        // swall;
        SwalFire('AEEK in Number - yeniləndi.', 'success');
    }
    catch (error) {
        SwalFire('AEEK in Number yenilənmədi.', 'error');
    }
})

span.addEventListener("click", function () {
    modal.style.display = "none";
})

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})




