import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth } from "./../../firebase/utils";
import { fetchProductsStart, setProduct, setProducts } from "./products.actions";
import { handleAddProduct, handleDeleteProduct, handleFetchProduct, handleFetchProducts } from "./products.helpers";
import productTypes from "./products.types";

export function* addProduct({ payload }) {
    try {
        const timestamp = new Date();
        // Add product to firebase
        yield handleAddProduct({
            ...payload,
            productUserAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchProductsStart()
        );

    } catch(e) {
        console.error(e);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts(payload);
        yield put(
            setProducts(products)
        );
    } catch (e) {
        console.error(e);
    }
}

export function* onFetchProductsStart()
{
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
    try {
        const products = yield handleDeleteProduct(payload);
        yield put (
            fetchProductsStart()
        )
    } catch (e) {
        console.error(e);
    }
}
export function* onDeleteProductStart(productID) {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        );
    } catch (e) {
        console.error(e);
    }
}
export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart)
    ]);
}