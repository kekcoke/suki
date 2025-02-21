import { firestore } from "../../firebase/utils";

const PRODUCTS = "products";

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection(PRODUCTS)
            .doc()
            .set({...product})
            .then(() => resolve())
            .catch(e => reject(e));
    
    })
};

export const handleFetchProducts = tindaId => {
    return new Promise((resolve, reject) => {
        firestore
            .collection(PRODUCTS)
            .orderBy('createdDate')
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    });
                    resolve(productsArray);
                })
            .catch(e => reject(e));
    });
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection(PRODUCTS)
            .doc(documentID)
            .delete()
            .then(() => {
                console.log(`Product ${documentID} deleted`);
                resolve();
            })
            .catch(e => console.error(e));
    })
}