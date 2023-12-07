const partnerTableTbody = document.querySelector(".partner-table--tbody");
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// Submit -MODAL
const modalBtn = document.querySelector(".modal-btn");

// const name = document.querySelector(".name")

const partnerArray = [
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


const fethcData = () => {
    partnerArray.forEach(({ name, img, id }) => {
        partnerTableTbody.innerHTML +=
            `<tr id="${id}">
    <td>
        <img src="${img}" alt="${name}" id="sss"/>
    </td>
    <td>${name}</td>
    <td>
        <button type="button" class="btn btn-success update">Update</button>
    </td>
    <td>
        <button type="button" class="btn btn-danger remove">Delete</button>
    </td>
    </tr>`
    })
}
fethcData();

// Delete - Data;
const deleteBtn = document.querySelectorAll(".remove");
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
                this.parentElement.parentElement.remove()
                Swal.fire({
                    title: "Deleted!",
                    text: `${thisDataName} - file has been deleted.`,
                    icon: "success"
                });
            }
        });
    })
});

// Update - Data;
const updateBtn = document.querySelectorAll(".update");
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

span.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Post - Data;
const postBtn = document.querySelector(".post-data--btn");
postBtn.addEventListener("click", function () {
    document.getElementsByClassName("name")[0].value = "";
    document.getElementsByClassName("image")[0].value = "";
    modalBtn.classList.add("post")
    modalBtn.classList.remove("update")
    modal.style.display = "block";
});

// Submit -MODAL

modalBtn.addEventListener("click", function () {
    if (modalBtn.className.includes("post")) {
        const newDate = {
            id: Math.floor(Math.random()),
            name: document.getElementsByClassName("name")[0].value,
            img: document.getElementsByClassName("image")[0].value
        }
        partnerArray.push(newDate);
        modal.style.display = "none";
        fethcData();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${newDate.name} added successfully!`,
            showConfirmButton: false,
            timer: 1500
        })
        return
    };
    if (modalBtn.className.includes("update")) {
        const newDate = {
            name: document.getElementsByClassName("name")[0].value,
            img: document.getElementsByClassName("image")[0].value
        };
        const findData = partnerArray.find((partner) => partner.id == modalBtn.getAttribute("id"));
        findData.name = document.getElementsByClassName("name")[0].value;
        findData.img = document.getElementsByClassName("image")[0].value;

        // partnerArray.push(newDate);
        fethcData();
        // console.log(partnerArray);
        modal.style.display = "none";
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${newDate.name} update successfully!`,
            showConfirmButton: false,
            timer: 1500
        })
        return
    };
    // else { console.log("error!! (Post ve Update Olunmadi)") };
});
