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


// Tüm belgeleri almak için koleksiyon referansı
const collectionRef = firestore.collection('partners');

const partnerAdminPageUI = document.querySelector(".partner-table--tbody");
const addDateUI = (newPartner) => {
  partnerAdminPageUI.innerHTML += `<tr id="${newPartner.id}">
       <td><img src="${newPartner.img}" alt="${newPartner.name}"/></td>
       <td>${newPartner.name}</td>
       <td><button type="button" class="btn btn-success update" id=${newPartner.id}>Update</button></td>
       <td><button type="button" class="btn btn-danger remove" id=${newPartner.id}>Delete</button></td>
    </tr>`;
};

// Get All Data
let partnerArray = [];
const getAllDocuments = async () => {
  try {
    const querySnapshot = await collectionRef.get();

    querySnapshot.forEach((doc) => {
      const data = {
        name: doc.data().name,
        img: doc.data().img,
        id: doc.id
      }
      partnerArray.push(data)
      addDateUI(data)
    });
  } catch (error) {
    console.error('Data çekme hatası:', error);
  }
};
// getAllDocuments fonksiyonunu çağır
getAllDocuments();


// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const docRef = db.collection('partners')
// addDateUI - UI

// Gett - Data;
// export const getAllPartners = () => {

// getDocs(colPartner).then((querySnapshot) => {
//   querySnapshot.docs.forEach((doc) => {
//     const data = {
//       name: doc.data().name,
//       img: doc.data().img,
//       id: doc.id
//     }
//     partnerArray.push(data)
//     addDateUI(data)
//     // console.log(doc);
//     // console.log(doc.id, " =>dddee ", doc.data());
//   });
//   // partnerArray = querySnapshot.docs
//   // partnerArray.forEach((partner) => {
//   //     addDateUI(partner)
//   // })
// }).catch((error) => {
//   console.error("Yenede Error!: ", error);
// });

// postAndUpdateSwal - Swall gosterilmesi


// Delete - Data;
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    const deleteBtn = event.target;
    const fileElement = deleteBtn.parentElement.previousElementSibling.previousElementSibling;
    const thisDataName = fileElement.textContent.trim();
    const partnerIdToDelete = deleteBtn.getAttribute('id');
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
        // Koleksiyon referansı ve belge referansı
        try {
          const documentRef = collectionRef.doc(partnerIdToDelete);
          await documentRef.delete();
          fileElement.parentElement.remove();
          SwalFire(`${thisDataName} - adlı Partnyor silindi.`, 'success');
        } catch (error) {
          SwalFire('silinmə uğursuz oldu.', 'error');
        }
      }
    });
  }
});




// Get the modal
const modal = document.getElementById("myModal");

// Submit -MODAL
const modalBtn = document.querySelector(".modal-btn");

// Post - // Modal acilmasi;
const postBtn = document.querySelector(".post-data--btn");
postBtn.addEventListener("click", function () {
  document.getElementsByClassName("name")[0].value = "";
  document.getElementsByClassName("image")[0].value = "";
  modalBtn.classList.add("post");
  modalBtn.classList.remove("update");
  modal.style.display = "block";
});

// Update - // Modal acilmasi;
document.addEventListener("click", function (event) {
  const clickedBtn = event.target;

  if (clickedBtn.classList.contains('update')) {
    document.getElementsByClassName("name")[0].value = clickedBtn.parentElement.previousElementSibling.textContent;
    document.getElementsByClassName("image")[0].value = clickedBtn.parentElement.previousElementSibling.previousElementSibling.children[0].getAttribute("src");;
    modal.style.display = "block";
    modalBtn.classList.add("update");
    modalBtn.classList.remove("post");
    modalBtn.setAttribute("id", clickedBtn.getAttribute("id"));
  }
});

// Modal baglanmasi
const span = document.getElementsByClassName("close")[0];
span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

modalBtn.addEventListener("click", async function (e) {
  // Firestore'daki 'cities' koleksiyonunu temsil eden bir referans alın
  e.preventDefault();
  if (modalBtn.className.includes("post")) {
    modal.style.display = "none";
    const name = document.getElementsByClassName("name")[0].value;
    const img = document.getElementsByClassName("image")[0].value;
    // POST FUNKSIYASI
    try {
      const docRef = await collectionRef.add({ name, img });
      addDateUI({ name, img, id: docRef.id });
      partnerArray.push({ name, img, id: docRef.id })
      SwalFire(`${name} - adlı partnyor əlavə olundu.`, 'success');
    } catch (error) {
      SwalFire("Partnyor əlavə olunmadı:", 'error');
    }
  } else if (modalBtn.className.includes("update")) {
    modal.style.display = "none";
    const name = document.getElementsByClassName("name")[0].value;
    const img = document.getElementsByClassName("image")[0].value;

    const partnerIdToUpdate = modalBtn.getAttribute("id");
    //UPDATE FUNKSIYASI
    try {
      const documentRef = collectionRef.doc(partnerIdToUpdate);
      await documentRef.update({ name, img });
      const updateTask = partnerArray.map((item) => {
        if (String(item.id) === String(partnerIdToUpdate)) {
          return { id: item.id, name, img };
        }
        return item;
      });
      partnerAdminPageUI.innerHTML = "";
      updateTask.forEach((partner) => addDateUI(partner));
      SwalFire(`${name} - partnyor yeniləndi.`, 'success');
    } catch (error) {
      SwalFire('Partnyor yenilənmədi.', 'error');
    }
  } else console.error("Invalid data");
});


