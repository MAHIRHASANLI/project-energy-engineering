
import { firestore } from './base_firebase.js'


const Collection_Partners = firestore.collection('partners');



//GET-ALL-DATA
export const getAllPartners = async () => {
    let partnerArray = [];
    const querySnapshot = await Collection_Partners.get();
    querySnapshot.forEach((doc) => {
        const data = {
            name: doc.data().name,
            img: doc.data().img,
            id: doc.id
        }
        partnerArray.push(data)
    });
    return partnerArray
};


//DELETE
export const deletePartner = async (id) => {
    const documentRef = Collection_Partners.doc(id);
    await documentRef.delete();
};


//POST
export const PostPartner = async ({ name, img }) => {
    const docRef = await Collection_Partners.add({ name, img });
    return docRef;
};



//UPDATE
export const UpdatePartner = async ({ name, img }, id) => {
    const documentRef = Collection_Partners.doc(id);
    await documentRef.update({ name, img });
};