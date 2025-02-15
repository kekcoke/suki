import { all, call, takeLatest } from "redux-saga/effects";
import { auth } from "./../../firebase/utils";
import { handleAddProduct } from "./products.helpers";
import productTypes from "./products.types";

export function* addProduct({ payload: {
    productName,
    productBrandName,
    productCategory,
    productSubCategory,
    productGender,
    productStatus,
    productStock,
    productBundle,
    productThumbnail,
    productPrice,
    productDescription,
    productFeatures,
    productSpecifications 
}}) {
    try {
        const timestamp = new Date();
        // Add product to firebase
        yield handleAddProduct({
            productName,
            productBrandName,
            productCategory,
            productSubCategory,
            productGender,
            productStatus,
            productStock,
            productBundle,
            productThumbnail,
            productPrice,
            productDescription,
            productFeatures,
            productSpecifications,
            productUserAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        });
    } catch(e) {
        console.error(e);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart)
    ]);
}