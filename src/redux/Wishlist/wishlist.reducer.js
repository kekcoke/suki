import wishlistTypes from "./wishlist.types";

const INITIAL_STATE = {
    wishlists: [],
    wishItem: {}
}

const wishlistReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case wishlistTypes.ADD_TO_WISHLIST:
            return {
                ...state,
                wishlists: [...state.wishlists, action.payload]
            }
        default:
            return state;
    }
};

export default wishlistReducer;