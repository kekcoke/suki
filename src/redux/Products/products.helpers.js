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

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {

        const pageSize = 6;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterType) ref = ref.where('productStatus', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1],
                    isLastPage: totalCount < pageSize
                });
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