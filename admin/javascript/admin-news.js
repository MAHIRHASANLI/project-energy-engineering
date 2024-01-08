// Submit -MODAL
const modalBtn = document.querySelector(".modal-btn");
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// postAndUpdateSwal - Swall gosterilmesi
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
const collectionRef = firestore.collection('news');

// LOGIN OLUB OLMADIGINI SORUSUR
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
})

// addDateUI - UI
// { title, text, img, date, id } = newNews
const newsTableTbody = document.querySelector(".news-table--tbody");
const addDateUI = (newNews) => {
  newsTableTbody.innerHTML += `<tr id="${newNews.id}">
    <td>
        <img src="${newNews.img}" alt="${newNews.title}"/>
    </td>
     <td>${newNews.title}</td>
     <td>${newNews.text}</td>
     <td>${newNews.date}</td>
     <td><button type="button" class="btn btn-success update" id=${newNews.id}>Update</button></td>
     <td><button type="button" class="btn btn-danger remove" id=${newNews.id}>Delete</button></td>
    </tr>`;
};

// Get All Data
let newsArray = [];
const getAllDocuments = async () => {
  try {
    const querySnapshot = await collectionRef.get();

    querySnapshot.forEach((doc) => {
      const data = {
        title: doc.data().title,
        text: doc.data().text,
        date: doc.data().date,
        img: doc.data().img,
        id: doc.id
      }
      newsArray.push(data)
      addDateUI(data)
    });
  } catch (error) {
    console.error('Data çekme hatası:', error);
  }
};
// getAllDocuments fonksiyonunu çağır
getAllDocuments();

// Delete request
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


// Post - // Modal acilmasi;
const postBtn = document.querySelector(".post-data--btn");
postBtn.addEventListener("click", function () {
  document.getElementsByClassName("image")[0].value = "";
  document.getElementsByClassName("title")[0].value = "";
  document.getElementsByClassName("text")[0].value = "";
  document.getElementsByClassName("date")[0].value = "";
  modalBtn.classList.add("post");
  modalBtn.classList.remove("update");
  modal.style.display = "block";
});

// Update - // Modal acilmasi;
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update")) {
    const clickedBtn = event.target;

    if (clickedBtn.classList.contains('update')) {
      document.getElementsByClassName("image")[0].value =
        clickedBtn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getAttribute("src");
      document.getElementsByClassName("title")[0].value =
        clickedBtn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
      document.getElementsByClassName("text")[0].value =
        clickedBtn.parentElement.previousElementSibling.previousElementSibling.textContent;
      document.getElementsByClassName("date")[0].value =
        clickedBtn.parentElement.previousElementSibling.textContent;

      modal.style.display = "block";
      modalBtn.classList.add("update");
      modalBtn.classList.remove("post");
      modalBtn.setAttribute("id", clickedBtn.getAttribute("id"));
    }
  }
});

// Submit -MODAL - Update and Post
modalBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  if (modalBtn.className.includes("post")) {
    modal.style.display = "none";

    const title = document.getElementsByClassName("title")[0].value;
    const img = document.getElementsByClassName("image")[0].value;
    const date = document.getElementsByClassName("date")[0].value;
    const text = document.getElementsByClassName("text")[0].value;

    // POST FUNKSIYASI
    try {
      const docRef = await collectionRef.add({ title, img, date, text });
      addDateUI({ title, img, date, text, id: docRef.id });
      newsArray.push({ title, img, date, text, id: docRef.id })
      SwalFire(`${title} - əlavə olundu.`, 'success');
    } catch (error) {
      SwalFire(`${title} əlavə olunmadı:`, 'error');
    }

  } else if (modalBtn.className.includes("update")) {
    modal.style.display = "none";

    const title = document.getElementsByClassName("title")[0].value;
    const img = document.getElementsByClassName("image")[0].value;
    const date = document.getElementsByClassName("date")[0].value;
    const text = document.getElementsByClassName("text")[0].value;

    const newIdToUpdate = modalBtn.getAttribute("id");
    try {
      const documentRef = collectionRef.doc(newIdToUpdate);
      await documentRef.update({ title, img, date, text });
      const updateTask = newsArray.map((item) => {
        if (String(item.id) === String(newIdToUpdate)) {
          return { id: item.id, title, img, date, text }
        }
        return item;
      });
      newsTableTbody.innerHTML = "";
      updateTask.forEach((newNews) => addDateUI(newNews));
      // swall
      SwalFire(`${title} - yeniləndi.`, 'success');
    } catch (error) {
      SwalFire(`${title} yenilənmədi.`, 'error');
    }
  } else console.error("Invalid data");
});

span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
