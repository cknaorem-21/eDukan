export const addDecimals = (num) => {
    return (Math.round(num*100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item)=> acc + item.price * item.quantity, 0));
            
    // Calculate shipping price (if order is equal/above Rs.500 then free, else Rs.100 shipping charge)
    state.shippingPrice = addDecimals(state.itemsPrice >=500 ? 0 : 100);

    // Calculate tax price (18% tax)
    state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));
    
    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state))

    return state;
}