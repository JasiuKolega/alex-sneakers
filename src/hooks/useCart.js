import React from "react";
import AppContext from "../Context";

export const useCart = () => {
    const { cartItem, setCartItem } = React.useContext(AppContext);
    const totalPrice = cartItem.reduce((sum, obj) => obj.price + sum, 0);

    return { cartItem, setCartItem, totalPrice }
}
