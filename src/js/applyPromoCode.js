import { updateCart } from "./cart.js";
import { clearConjuctablePercentagePromoCode, clearConjuctableCutPromoCode, clearNonConjuctableCutPromoCode } from "./clearPromoCode.js";
import { showNotificationMessage } from "./notificationMessage";

export const applyPromoCode = (cart, conjuctableCodes, nonConjuctableCodes) => {
    const promoCodeInput = document.querySelector('#promo-code');
    const promoCodeInputValue = document.querySelector('#promo-code').value;
    const enteredPromoCodesContainer = document.querySelector('.cart__entered-promo-codes');

    promoCodeInput.value = '';

    for (const promoCode of cart.promoCodes) {
        const promoCodeHTML = `<button class="cart__entered-promo-code" data-value="${promoCode.value}" data-conjuctable="${promoCode.conjuctable}" data-type="${promoCode.type}">x ${promoCode.name}</button>`;
        if (promoCodeInputValue === promoCode.name && promoCode.conjuctable === true) {

            const ifPromoCodeExists = element => element === promoCode.value;
            
            if (nonConjuctableCodes.length > 1) {
                showNotificationMessage('These promo codes cannot be combined')
                return
            }

            if (promoCode.type === "%") {
                if (conjuctableCodes.percentageType.some(ifPromoCodeExists)) {
                    showNotificationMessage('This promo code has already been added')
                } else {
                    conjuctableCodes.percentageType.push(promoCode.value)
                    enteredPromoCodesContainer.innerHTML += promoCodeHTML; 
                    updateCart(cart);
                }
            } else if (promoCode.type === "cut"){
                if (conjuctableCodes.cutType.some(ifPromoCodeExists)) {
                    showNotificationMessage('This promo code has already been added')
                } else {
                    conjuctableCodes.cutType.push(promoCode.value)
                    enteredPromoCodesContainer.innerHTML += promoCodeHTML; 
                    updateCart(cart);
                }
            }

        } else if (promoCodeInputValue === promoCode.name && promoCode.conjuctable === false) {
            const ifPromoCodeExists = element => element === promoCode.value;

            if (conjuctableCodes.percentageType.length > 1 ||
                conjuctableCodes.cutType.length > 1) {
                    showNotificationMessage('This promo code cannot be combined')
                    return;
            }

            if (nonConjuctableCodes.some(ifPromoCodeExists)) {
                showNotificationMessage('This promo code has already been added')
            } else {
                nonConjuctableCodes.push(promoCode.value)
                enteredPromoCodesContainer.innerHTML = ''; 
                enteredPromoCodesContainer.innerHTML += promoCodeHTML; 
                updateCart(cart);
            }
        }
    }
    
    const promoCodeButtons = document.querySelectorAll('.cart__entered-promo-code');
    for (const promoButton of promoCodeButtons) {
        
        promoButton.addEventListener('click', (e) => {
            const clear = value => value !== Number(promoButton.dataset.value);

            if (promoButton.dataset.conjuctable === 'false') {
                clearNonConjuctableCutPromoCode(cart, clear)
                updateCart(cart);
                e.target.remove();
            }
            
            if (promoButton.dataset.conjuctable === 'true') {
                if (promoButton.dataset.type === '%') {
                    clearConjuctablePercentagePromoCode(cart, clear);
                    updateCart(cart);
                    e.target.remove();
                }
                else if (promoButton.dataset.type === 'cut') {
                    clearConjuctableCutPromoCode(cart, clear)
                    updateCart(cart);
                    e.target.remove();
                }
            }
        })
    }
}
