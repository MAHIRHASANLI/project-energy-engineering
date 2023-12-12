
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






const aeekInNumberTableTbody = document.querySelector(".aeekInNumber-table--tbody");

// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const modalBtn = document.querySelector(".modal-btn");

const aeekInNumberArray = [
    {
        id: 1,
        projectNumber: 22,
        bankFinance: 12,
        privateFinance: 21,
        ministry: 14
    }
];


// addDateUI - UI 
// { title, text, img, date, id } = newNews
const addDateUI = (newAeek) => {
    aeekInNumberTableTbody.innerHTML =
        `<tr id="${newAeek.id}">
 <td>${newAeek.projectNumber}</td>
 <td>${newAeek.bankFinance}</td>
 <td>${newAeek.privateFinance}</td>
 <td>${newAeek.ministry}</td>
 <td><button type="button" class="btn btn-success update">Update</button></td>
</tr>`
}

aeekInNumberArray.forEach((newAeek) => {
    addDateUI(newAeek)
})

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


var updateBtn = document.querySelectorAll(".update");
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        document.getElementsByClassName("project-number")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("bank-finance")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("private-finance")[0].value = this.parentElement.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("ministry")[0].value = this.parentElement.previousElementSibling.textContent;
        modal.style.display = "block";
        modalBtn.setAttribute("id", this.parentElement.parentElement.getAttribute("id"))
    })
})


modalBtn.addEventListener("click", function () {
    const newAeek = {
        id: modalBtn.getAttribute("id"),
        projectNumber: document.getElementsByClassName("project-number")[0].value,
        bankFinance: document.getElementsByClassName("bank-finance")[0].value,
        privateFinance: document.getElementsByClassName("private-finance")[0].value,
        ministry: document.getElementsByClassName("ministry")[0].value
    };

    const updateTask = aeekInNumberArray.map((item) => {
        const IdData = modalBtn.getAttribute("id")
        if (Number(item.id) === Number(IdData)) {
            return { id: item.id, projectNumber: newAeek.projectNumber, bankFinance: newAeek.bankFinance, privateFinance: newAeek.privateFinance, ministry: newAeek.ministry }
        };
        return item;
    });
    aeekInNumberTableTbody.innerHTML = '';
    updateTask.forEach((newAeek) => addDateUI(newAeek));
    modal.style.display = "none";
    // swall
    SwalFire();
})

span.addEventListener("click", function () {
    modal.style.display = "none";
})

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})