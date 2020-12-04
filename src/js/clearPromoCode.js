export const clearAllPromoCodes = (cart, updateCart) => {
    
    const enteredPromoCodesContainer = document.querySelector('.cart__entered-promo-codes');
    enteredPromoCodesContainer.innerHTML = '';
    
    const clear = value => value === 0;

    clearConjuctablePercentagePromoCode(cart, clear);
    clearConjuctableCutPromoCode(cart, clear);
    clearNonConjuctableCutPromoCode(cart, clear);
    updateCart(cart);
}

export const clearConjuctablePercentagePromoCode = (cart, clear) => {
    cart.enteredPromoCodes.conjuctable.percentageType = cart.enteredPromoCodes.conjuctable.percentageType.filter(clear);
}

export const clearConjuctableCutPromoCode = (cart, clear) => {
    cart.enteredPromoCodes.conjuctable.cutType = cart.enteredPromoCodes.conjuctable.cutType.filter(clear);

}
export const clearNonConjuctableCutPromoCode = (cart, clear) => {
    cart.enteredPromoCodes.nonConjuctable = cart.enteredPromoCodes.nonConjuctable.filter(clear);
}