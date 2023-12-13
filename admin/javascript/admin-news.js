// LOGIN OLUB OLMADIGINI SORUSUR
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





const newsTableTbody = document.querySelector(".news-table--tbody");
// Submit -MODAL
const modalBtn = document.querySelector(".modal-btn");
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// const dateControl = document.querySelector('input[type="date"]');
// dateControl.setAttribute("min", new Date())

let newsObjects = [
    { id: 1, title: "Xəbər 1", text: "This is the text for news 1.", img: "../images/technology-trend-freepik-1647963838.jpg", date: "2023-12-15" },
    { id: 2, title: "Xəbər 2", text: "This is the text for news 2.", img: "../images/Brad-Blog-Aus-Header-scaled.jpg", date: "2023-12-15" },
    { id: 3, title: "Xəbər 3", text: "This is the text for news 3.", img: "../images/Tech_4x3_608.jpg", date: "2023-12-10" },
    { id: 4, title: "Xəbər 4", text: "This is the text for news 4.", img: "../images/images.jpg", date: "2023-12-15" },
    { id: 5, title: "Xəbər 5", text: "This is the text for news 5.", img: "../images/download.jpg", date: "2022-12-15" },
    { id: 6, title: "Xəbər 6", text: "This is the text for news 6.", img: "../images/Surveillance-State_QBS_Drones-technology-and-apps_Featured.webp", date: "2023-02-15" },
];

// addDateUI - UI 
// { title, text, img, date, id } = newNews
const addDateUI = (newNews) => {
    newsTableTbody.innerHTML += `<tr id="${newNews.id}">
    <td>
        <img src="${newNews.img}" alt="${newNews.title}"/>
    </td>
     <td>${newNews.title}</td>
     <td>${newNews.text}</td>
     <td>${newNews.date}</td>
     <td><button type="button" class="btn btn-success update">Update</button></td>
     <td><button type="button" class="btn btn-danger remove">Delete</button></td>
    </tr>`
}

newsObjects.forEach((newNews) => {
    addDateUI(newNews)
})

// postAndUpdateSwal - Swall gosterilmesi
const SwalFire = (newNews) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `<span style="color:#E05306;">${newNews.title}</span> - added successfully!`,
        showConfirmButton: false,
        timer: 1500
    })
}


// Delete request
const deleteBtn = document.querySelectorAll(".remove")
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        const thisDataName = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const thisId = this.parentElement.parentElement.getAttribute("id");
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
})


// Post - // Modal acilmasi;
const postBtn = document.querySelector(".post-data--btn");
postBtn.addEventListener("click", function () {
    document.getElementsByClassName("image")[0].value = "";
    document.getElementsByClassName("title")[0].value = "";
    document.getElementsByClassName("text")[0].value = "";
    document.getElementsByClassName("date")[0].value = "";
    modalBtn.classList.add("post")
    modalBtn.classList.remove("update")
    modal.style.display = "block";
});

// Update - // Modal acilmasi;
const updateBtn = document.querySelectorAll(".update");
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        document.getElementsByClassName("image")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getAttribute("src");
        document.getElementsByClassName("title")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("text")[0].value = this.parentElement.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("date")[0].value = this.parentElement.previousElementSibling.textContent;
        modal.style.display = "block";
        modalBtn.classList.add("update");
        modalBtn.classList.remove("post");
        modalBtn.setAttribute("id", this.parentElement.parentElement.getAttribute("id"))
        console.log(modalBtn.getAttribute("id"));
    })
})

// Submit -MODAL - Update and Post
modalBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (modalBtn.className.includes("post")) {
        const newNews = {
            id: Math.round(Math.random() * 99),
            title: document.getElementsByClassName("title")[0].value,
            img: document.getElementsByClassName("image")[0].value,
            date: document.getElementsByClassName("date")[0].value,
            text: document.getElementsByClassName("text")[0].value
        }
        addDateUI(newNews);
        SwalFire(newNews);
        modal.style.display = "none";
    }
    else if (modalBtn.className.includes("update")) {
        const newNews = {
            id: modalBtn.getAttribute("id"),
            title: document.getElementsByClassName("title")[0].value,
            img: document.getElementsByClassName("image")[0].value,
            date: document.getElementsByClassName("date")[0].value,
            text: document.getElementsByClassName("text")[0].value
        };

        const updateTask = newsObjects.map((item) => {
            const IdData = modalBtn.getAttribute("id")
            if (Number(item.id) === Number(IdData)) {
                return { id: item.id, title: newNews.title, img: newNews.img, date: newNews.date, text: newNews.text }
            };
            return item;
        });
        newsTableTbody.innerHTML = '';
        updateTask.forEach((newNews) => addDateUI(newNews));
        modal.style.display = "none";
        // swall
        SwalFire(newNews);
    }
    else console.error('Invalid data');
});

span.addEventListener("click", function () {
    modal.style.display = "none";
})

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})