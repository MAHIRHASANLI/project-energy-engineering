const aeekInNumberTableTbody = document.querySelector(".aeekInNumber-table--tbody");



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
    aeekInNumberTableTbody.innerHTML = `<tr id="${item.id}">
    <td>${item.projectNumber}</td>
     <td>${item.bankFinance}</td>
     <td>${item.privateFinance}</td>
     <td>${item.ministry}</td>
     <td><button type="button" class="btn btn-success">Update</button></td>
    </tr>`
})
