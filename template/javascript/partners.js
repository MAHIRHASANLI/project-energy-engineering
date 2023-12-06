const partnerTableTbody = document.querySelector(".partner-table--tbody");

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

]


partnerArray.forEach(({ name, img, id }) => {
    partnerTableTbody.innerHTML += `<tr id="${id}">
    <td>
        <img src="${img}" alt="${name}"/>
    </td>
     <td>${name}</td>
     <td><button type="button" class="btn btn-success">Update</button></td>
     <td><button type="button" class="btn btn-danger remove">Delete</button></td>
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