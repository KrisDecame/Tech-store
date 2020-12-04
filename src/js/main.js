import { getData } from "./getData.js";
import { printItems } from "./printItems.js";
import { applyPromoCode } from "./applyPromoCode.js";
import { clearAllPromoCodes } from "./clearPromoCode.js";
import { addToCart, printCartItems, updateCart, clearCart, cartAppear, cartDisappear, generateCartIndicatorNumber } from "./cart.js";
import { showNotificationMessage } from "./notificationMessage";
import { navbarAnimationOnScroll } from "./navbar.js";
import { proceedToCheckout } from "./printCheckout.js";

export const main = async () => {
    var media = window.matchMedia("(min-width: 600px)")

    const data = await getData();
    printItems(data);
    
    const cartItemsContainer = document.querySelector('.cart__items');
    const $header = document.querySelector('.header');
    const $cartOpenButton = document.querySelector('.navbar__cart-button');
    const $navbar = document.querySelector('.navbar');
    const $store = document.querySelector('.store');
    const $cartElement = document.querySelector('.cart');
    const $storeItems = document.querySelectorAll('.store-item');
    const $promoEnterButton = document.querySelector('.cart__promo-code-button');
    const $clearPromoCodesButton = document.querySelector('.cart__clear-promo-code');
    const cartCloseButtons = document.querySelectorAll('.cart__close-button');
    const clearCartButton = document.querySelector('.cart__clear-cart');
    const checkoutButton = document.querySelector('.cart__checkout-button');
    const $checkoutOutput = document.querySelector('.checkout');
    const $orderOutput = document.querySelector('.order');
    const $cartIndicatorNumber = document.querySelector('.navbar__cart-items-number');
    
    for (const item of $storeItems) {
        item.addEventListener('click', async (e) => {
            if (e.target.matches('.item__add-button')) {
                addToCart(data.cart, item, data.items);
                printCartItems(data.cart, cartItemsContainer, $cartIndicatorNumber);
                updateCart(data.cart);
                generateCartIndicatorNumber(data.cart.items, $cartIndicatorNumber);
            }
        })
    }

    navbarAnimationOnScroll($navbar);
    
    $cartOpenButton.addEventListener('click', () => {
        cartAppear($cartElement, $store, $header);
    })

    for (const cartCloseButton of cartCloseButtons) {
        cartCloseButton.addEventListener('click', () => {
            cartDisappear($cartElement);
            setTimeout(() => {
                $store.style.display = 'flex';
                $header.style.display = 'flex';
            }, 200);
        })
    }

    $promoEnterButton.addEventListener('click', () => {
        applyPromoCode(
            data.cart,
            data.cart.enteredPromoCodes.conjuctable,
            data.cart.enteredPromoCodes.nonConjuctable);
    })

    $clearPromoCodesButton.addEventListener('click', () => {
        clearAllPromoCodes(data.cart, updateCart)
    })

    clearCartButton.addEventListener('click', () => {
        clearAllPromoCodes(data.cart, updateCart);
        clearCart(data.cart, cartItemsContainer, $cartIndicatorNumber);
    })

    checkoutButton.addEventListener('click', () => {
        if (data.cart.items.length === 0) {
            showNotificationMessage('Just a reminder - your cart is empty');
        } else {
            proceedToCheckout($checkoutOutput, $cartElement, data, $orderOutput);
        }
    })

    $checkoutOutput.addEventListener('click', (e) => {
        if (e.target.matches('.checkout__return-button')) {
            e.target.parentElement.remove();
            $cartElement.style.display = 'flex';
        }
    })
}
