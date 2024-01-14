import { getAllAEEKinNumbers } from "../admin/api/aeek_in_number_request.js";

const aeekContainerItem = document.querySelector('.aeekContainer-item');

// addDateUI - UI 
// { title, text, img, date, id } = newNews
const addDateUI = (newAeek) => {
    aeekContainerItem.innerHTML +=
        `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div class="aeek-item">
           <p>${newAeek.name} </p><span>${newAeek.number}</span>
        </div>
     </div>`
};


// Get All Data
// let newsArray = [];
getAllAEEKinNumbers().then((news) => {
    news.forEach((res) => {
        // newsArray.push(res)
        addDateUI(res)
    })
});

// let AEEKinNumbersArray = [];
// const getAllDocuments = async () => {
//     try {
//         const querySnapshot = await collectionRef.get();

//         querySnapshot.forEach((doc) => {
//             const data = {
//                 name: doc.data().name,
//                 number: doc.data().number,
//                 id: doc.id
//             }
//             AEEKinNumbersArray.push(data)
//             addDateUI(data)
//         });
//     } catch (error) {
//         console.error('Data çekme hatası:', error);
//     }
// };
// // getAllDocuments fonksiyonunu çağır
// getAllDocuments();