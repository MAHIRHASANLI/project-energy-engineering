const aeekInNumberTableTbody = document.querySelector(".aeekInNumber-table--tbody");

// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


const aeekInNumberArray = [
    {
        id: 1,
        projectNumber: 22,
        bankFinance: 12,
        privateFinance: 21,
        ministry: 14
    }
];


aeekInNumberArray.forEach((item) => {
    aeekInNumberTableTbody.innerHTML =
        `<tr id="${item.id}">
     <td>${item.projectNumber}</td>
     <td>${item.bankFinance}</td>
     <td>${item.privateFinance}</td>
     <td>${item.ministry}</td>
     <td><button type="button" class="btn btn-success update">Update</button></td>
    </tr>`
})



var updateBtn = document.querySelectorAll(".update");
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        modal.style.display = "block";
        document.getElementsByClassName("project-number")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("bank-finance")[0].value = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("private-finance")[0].value = this.parentElement.previousElementSibling.previousElementSibling.textContent;
        document.getElementsByClassName("ministry")[0].value = this.parentElement.previousElementSibling.textContent;
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