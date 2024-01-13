
import { firestore } from './base_firebase.js'


const Collection_Numbers = firestore.collection('AEEKinNumbers');



//GET-ALL-DATA
export const getAllAEEKinNumbers = async () => {
    let AEEKinNumberArray = [];
    const querySnapshot = await Collection_Numbers.get();
    querySnapshot.forEach((doc) => {
        const data = {
            name: doc.data().name,
            number: doc.data().number,
            id: doc.id
        }
        AEEKinNumberArray.push(data)
    });
    return AEEKinNumberArray
};


// //DELETE
// export const deleteAEEKinNumbers = async (id) => {
//     const documentRef = Collection_Numbers.doc(id);
//     await documentRef.delete();
// };


// //POST
// export const PostAEEKinNumbers = async ({ name, number }) => {
//     const docRef = await Collection_Numbers.add({ name, number });
//     return docRef;
// };



//UPDATE
export const UpdateAEEKinNumbers = async ({ name, number }, id) => {
    const documentRef = Collection_Numbers.doc(id);
    await documentRef.update({ name, number });
};