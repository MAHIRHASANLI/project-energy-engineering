const partnerTableTbody = document.querySelector(".partner-table--tbody");
// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

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


// Delete request
const deleteBtn = document.querySelectorAll(".remove")
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        const thisId = this.parentElement.parentElement.getAttribute("id");
        // const partnerArray = partnerArray.filter((partner) => partner.id != thisId);
        if (window.confirm(`Id :  ${thisId}`)) {
            this.parentElement.parentElement.remove()
        }
    })
})




var updateBtn = document.querySelectorAll(".update");
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        modal.style.display = "block";
        document.getElementsByClassName("name")[0].value = this.parentElement.previousElementSibling.textContent;
        document.getElementsByClassName("image")[0].value = this.parentElement.previousElementSibling.previousElementSibling.children[0].getAttribute("src");
    })
})

span.addEventListener("click", function () {
    modal.style.display = "none";
})

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})