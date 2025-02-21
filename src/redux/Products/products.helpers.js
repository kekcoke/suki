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

export const handleFetchProducts = ({ filterType }) => {
    return new Promise((resolve, reject) => {
    
        let ref = firestore.collection('products').orderBy('createdDate');

        if (filterType) ref = ref.where('productStatus', '==', filterType);
    
        ref
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {                        
                        return {
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