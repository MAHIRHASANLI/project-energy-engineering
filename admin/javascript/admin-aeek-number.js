import { UpdateAEEKinNumbers, getAllAEEKinNumbers } from "../api/aeek_in_number_request.js";



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
};


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


// Get All Data
let AEEKinNumbersArray = [];
getAllAEEKinNumbers().then((aeek) => {
    aeek.forEach((res) => {
        AEEKinNumbersArray.push(res);
        addDateUI(res);
    })
});


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

    const IdData = modalBtn.getAttribute("id");
    //UPDATE FUNKSIYASI
    try {
        await UpdateAEEKinNumbers({ name, number }, IdData);

        const updateTask = AEEKinNumbersArray.map((item) => {
            if (String(item.id) === String(IdData)) {
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
        SwalFire(`${error}: AEEK in Number yenilənmədi.`, 'error');
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




