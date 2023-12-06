const newsTableTbody = document.querySelector(".news-table--tbody");

let newsObjects = [
    { id: 1, title: "Xəbər 1", text: "This is the text for news 1.", img: "../images/technology-trend-freepik-1647963838.jpg", date: "10/06/2023" },
    { id: 2, title: "Xəbər 2", text: "This is the text for news 2.", img: "../images/Brad-Blog-Aus-Header-scaled.jpg", date: "10/06/2023" },
    { id: 3, title: "Xəbər 3", text: "This is the text for news 3.", img: "../images/Tech_4x3_608.jpg", date: "8/06/2023" },
    { id: 4, title: "Xəbər 4", text: "This is the text for news 4.", img: "../images/images.jpg", date: "10/06/2023" },
    { id: 5, title: "Xəbər 5", text: "This is the text for news 5.", img: "../images/download.jpg", date: "9/06/2023" },
    { id: 6, title: "Xəbər 6", text: "This is the text for news 6.", img: "../images/Surveillance-State_QBS_Drones-technology-and-apps_Featured.webp", date: "10/06/2023" },
];

newsObjects.forEach(({ title, text, img, date, id }) => {
    newsTableTbody.innerHTML += `<tr id="${id}">
    <td>
        <img src="${img}" alt="${title}"/>
    </td>
     <td>${title}</td>
     <td>${text}</td>
     <td>${date}</td>
     <td><button type="button" class="btn btn-success update">Update</button></td>
     <td><button type="button" class="btn btn-danger remove">Delete</button></td>
    </tr>`
})



// Delete request
const deleteBtn = document.querySelectorAll(".remove")
deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
        const thisId = this.parentElement.parentElement.getAttribute("id");
        if (window.confirm(`Id :  ${thisId}`)) {
            this.parentElement.parentElement.remove()
        }
        // const partnerArray = partnerArray.filter((partner) => partner.id != thisId);
    })
})


const updateBtn = document.querySelectorAll(".update")
updateBtn.forEach((btn) => {
    btn.addEventListener("click", function () {

    })
})
