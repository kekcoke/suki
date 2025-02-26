import wishlistTypes from "./wishlist.types";

export const addToWishlist = (wishItem) => ({
    type: wishlistTypes.ADD_TO_WISHLIST,
    payload: wishItem
});

export const removeFromWishlist = (wishItem) => ({
    type: wishlistTypes.REMOVE_WISHLIST_ITEM,
    payload: wishItem
});

export const createNewWishlistStart = (wishListData) => ({
    type: wishlistTypes.CREATE_WISHLIST_START,
    payload: wishListData
});

export const fetchWishlistsStart = (filters = { }) => ({
    type: wishlistTypes.FETCH_WISHLISTS_START,
    payload: filters
});

export const fetchWishlistStart = (wishlistID) => ({
    type: wishlistTypes.FETCH_WISHLIST_START,
    payload: wishlistID
});

export const deleteWishlistStart = (wishlistID) => ({
    type: wishlistTypes.DELETE_WISHLIST_START,
    payload: wishlistID
});

