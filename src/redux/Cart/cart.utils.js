export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItem.documentID
    );
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement = 1;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

    if (cartItemExists) {
        return prevCartItems.map(cartItem => {
            cartItem.documentID === nextCartItem.documentID ?
                {
                    ...cartItem,
                    quantity: cartItem.quantity + quantityIncrement
                } :
                cartItem
        });
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ];
};

export const handleRemoveCartItem = ({
    cartItems,
    cartItemToReduce
}) => cartItems
    .filter(cardItem => cardItem.documentID !== cartItemToReduce.documentID);

export const handleReduceCartItem = ({
    cartItems,
    cartItemToRemove
}) => {
    const quantityDecrement = 1;
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.documentID === cartItemToRemove.documentID
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem =>
            cartItem.documentID !== existingCartItem.documentID
        );
    }

    return cartItems.map(cardItem =>
        cardItem.documentID === existingCartItem.documentID ?
            {
                ...cardItem,
                quantity: cardItem.quantity - quantityDecrement
            } :
            cardItem
    );
}