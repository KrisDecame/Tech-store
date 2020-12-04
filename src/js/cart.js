import { showNotificationMessage } from "./notificationMessage";

export const addToCart = (cart, item, storeItems) => {

    let cartItem;

    for (const storeItem of storeItems) {
        if (item.dataset.id === storeItem.id) {
            cartItem = {
                id: storeItem.id,
                name: storeItem.name,
                price: Number(storeItem.price),
                image: storeItem.image,
                amount: Number(storeItem.amount),
                sale: storeItem.sale,
                salePrice: Number(storeItem.salePrice),
                saleAmount: Number(storeItem.saleAmount),
                itemTotal: 0
            };
        }
    }

    const ifElementExists = element => element.id === cartItem.id;

    if (cart.items.some(ifElementExists)) {
        showNotificationMessage('Item already exists in the cart')
    } else {
        cart.items.push(cartItem);
        showNotificationMessage('Item has been added')
    }
}

export const printCartItems = (cart, outputElement, cartIndicator) => {
    outputElement.innerHTML = '';

    cart.items.forEach(item => {
        const itemHTML =
            `<div class="cart-item" data-id="${item.id}" data-price="${item.price}">
                <img src="${item.image}">
                <div class="cart-item__content">
                    <b class="cart-item__name">${item.name}</b>
                    <div>
                        <p>€ ${item.price}</p>
                        <input class="cart-item__amout-input" type="number" min="1" value="${item.amount}">
                        <button class="cart-item__remove-button">Remove</button>
                    </div>
                </div>
            </div>`;
        outputElement.innerHTML += itemHTML;
    });

    generateItems(cart, outputElement, cartIndicator)
}

const generateItems = (cart, outputElement, cartIndicator) => {

    const $cartItemElements = document.querySelectorAll('.cart-item');

    for (const cartItemElement of $cartItemElements) {
        cartItemElement.addEventListener('click', (e) => {
            const clickedCartItem = cart.items.find(item => item.id === cartItemElement.dataset.id);

            if (e.target.matches('.cart-item__amout-input')) {
                generateAmount(cart, clickedCartItem, e.target);
            }

            if (e.target.matches('.cart-item__remove-button')) {
                deleteItem(cart, clickedCartItem, outputElement, cartIndicator);
            }
        })
    }
}

const deleteItem = (cart, clickedItem, outputElement, cartIndicator) => {
    cart.items = cart.items.filter(item => item !== clickedItem);
    updateCart(cart);
    if (cart.items.length === 0) {
        outputElement.innerHTML = '<h1>Your cart is empty</h1>'
    } else {
        printCartItems(cart, outputElement, cartIndicator);
    };
    generateCartIndicatorNumber(cart.items, cartIndicator)
}

const generateAmount = (cart, clickedItem, amountInput) => {
    clickedItem.amount = amountInput.value;
    updateCart(cart);
}

export const updateCart = (cart) => {
    let total = 0;
    const $cartTotalElement = document.querySelector('.cart__total');
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (const item of cart.items) {

        if (item.sale === false) {
            item.itemTotal = item.price * item.amount;
        }
        
        if (item.sale === true) {
            if (Number(item.amount) === item.saleAmount) {
                item.itemTotal = item.salePrice;
            } else {
                item.itemTotal = item.price * item.amount;
            }
        }
        console.log(item.itemTotal);
        total += item.itemTotal;
    }

    if (total === 0) {
        cart.totalPrice = total;
    } else if (cart.enteredPromoCodes.conjuctable.percentageType.length > 1 ||
        cart.enteredPromoCodes.conjuctable.cutType.length > 1) {
        cart.totalPrice = (total 
            - (total * cart.enteredPromoCodes.conjuctable.percentageType.reduce(reducer)/100) 
            - cart.enteredPromoCodes.conjuctable.cutType.reduce(reducer))
            .toFixed(2);
    } else {
        cart.totalPrice = (total - (total * cart.enteredPromoCodes.nonConjuctable.reduce(reducer)/100)).toFixed(2);
    }

    $cartTotalElement.innerHTML = cart.totalPrice;
}

export const generateCartIndicatorNumber = (items, indicator) => {
    indicator.innerHTML = items.length;
}

export const clearCart = (cart, outputElement, cartIndicator) => {
    cart.items.length = 0;
    updateCart(cart);
    printCartItems(cart, outputElement);
    generateCartIndicatorNumber(cart.items, cartIndicator)
}


export const cartAppear = (cart, store, header) =>{
    cart.classList.add('cart-appear')
    store.style.display = 'none';
    header.style.display = 'none';

}

export const cartDisappear = (cart) =>{
    cart.classList.remove('cart-appear')
}
