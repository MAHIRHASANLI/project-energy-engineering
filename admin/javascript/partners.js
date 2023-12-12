const isLoggedIn = true; // Bu değeri oturum durumuna göre güncelleyin

// Sayfa yüklendiğinde kontrolü yap
window.onload = function () {
    checkLoginStatus();
};

// Oturum durumunu kontrol et
function checkLoginStatus() {
    if (!isLoggedIn) {
        // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
        window.location.href = '/admin/login/login.html'; // Yönlendirme yapılacak sayfanın yolunu belirtin
    }
}


const partnerTableTbody = document.querySelector(".partner-table--tbody");
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// Submit -MODAL
const modalBtn = document.querySelector(".modal-btn");


let partnerArray = [
    {
        id: 1,
        name: "Azerbaijan Technical University",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Aztu.png?20170610204934"
    },
    {
        id: 2,
        name: "Baku State University",
        img: "https://pbs.twimg.com/profile_images/1269201061476208640/wWXh5DLy_400x400.jpg"
    },
    {
        id: 3,
        name: "UNEC",
        img: "https://upload.wikimedia.org/wikipedia/az/6/61/UNEC_1.png"
    },
    {
        id: 4,
        name: "Baku Slavyan University",
        img: "https://yt3.googleusercontent.com/YVVdn4xK2iZqLyrALIpA_VAmq-oqDcyC2rF7uozf1zYJhuRd8iEVi_QH325gLDR5CAdf_X_GERo=s900-c-k-c0x00ffffff-no-rj"
    },

]

// addDateUI - UI 
const addDateUI = (newPartner) => {
    partnerTableTbody.innerHTML +=
        `<tr id="${newPartner.id}">
       <td>
        <img src="${newPartner.img}" alt="${newPartner.name}"/>
       </td>
       <td>${newPartner.name}</td>
       <td>
        <button type="button" class="btn btn-success update-btn">Update</button>
       </td>
       <td>
        <button type="button" class="btn btn-danger remove-btn">Delete</button>
       </td>
    </tr>`
}

partnerArray.forEach((partner) => {
    addDateUI(partner)
})

// postAndUpdateSwal - Swall gosterilmesi
const SwalFire = (newPartner) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `<span style="color:#E05306;">${newPartner.name}</span> - added successfully!`,
        showConfirmButton: false,
        timer: 1500
    })
}


// Delete - Data;
const deleteBtn = document.querySelectorAll(".remove-btn");
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        const thisId = this.parentElement.parentElement.getAttribute("id");
        const thisDataName = this.parentElement.previousElementSibling.previousElementSibling.textContent;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.parentElement.parentElement.remove();
                Swal.fire({
                    title: "Deleted!",
                    text: `${thisDataName} - file has been deleted.`,
                    icon: "success"
                });
            }
        });
    })
});

// Post - // Modal acilmasi;
const postBtn = document.querySelector(".post-data--btn");
postBtn.addEventListener("click", function () {
    document.getElementsByClassName("name")[0].value = "";
    document.getElementsByClassName("image")[0].value = "";
    modalBtn.classList.add("post")
    modalBtn.classList.remove("update")
    modal.style.display = "block";
});

// Update - // Modal acilmasi;
const updateBtn = document.querySelectorAll(".update-btn");
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        document.getElementsByClassName("name")[0].value = this.parentElement.previousElementSibling.textContent;
        document.getElementsByClassName("image")[0].value = this.parentElement.previousElementSibling.previousElementSibling.children[0].getAttribute("src");
        modal.style.display = "block";
        modalBtn.classList.add("update");
        modalBtn.classList.remove("post");
        modalBtn.setAttribute("id", this.parentElement.parentElement.getAttribute("id"))
    })
});


// Submit -MODAL - Update and Post
modalBtn.addEventListener("click", function () {
    if (modalBtn.className.includes("post")) {
        const newPartner = {
            id: Math.round(Math.random() * 99),
            name: document.getElementsByClassName("name")[0].value,
            img: document.getElementsByClassName("image")[0].value
        }
        addDateUI(newPartner);
        SwalFire(newPartner);
        modal.style.display = "none";
    }
    else if (modalBtn.className.includes("update")) {
        const newPartner = {
            id: modalBtn.getAttribute("id"),
            name: document.getElementsByClassName("name")[0].value,
            img: document.getElementsByClassName("image")[0].value
        };

        const updateTask = partnerArray.map((item) => {
            const IdData = modalBtn.getAttribute("id")
            if (Number(item.id) === Number(IdData)) {
                return { id: item.id, name: newPartner.name, img: newPartner.img }
            };
            return item;
        });
        partnerTableTbody.innerHTML = '';
        updateTask.forEach((partner) => addDateUI(partner));
        modal.style.display = "none";
        // swall
        SwalFire(newPartner);
    }
    else console.error('Invalid data');
});

// Modal baglanmasi
span.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
