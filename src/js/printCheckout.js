import { printCompletedOrder } from "./completedOrder.js";

export const proceedToCheckout = (checkoutOutput, cartElement, data, orderOutput) => {
    checkoutOutput.innerHTML = checkoutHTML;
    cartElement.style.display = 'none';
    const checkoutForm = document.querySelector('.checkout__form');
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        printCompletedOrder(data, orderOutput);
        return false;
    });
}

const checkoutHTML = `
    <section class="checkout__checkout-section">
        <form class="checkout__form" autocomplete="off">
            <label for="email-input">e-mail
                <input type="email" id="email-input" name="email-input" size="30" required>
            </label>
            <label for="adress-input">adress
                <input type="text" id="adress-input" id="adress-input" name="adress-input" required>
            </label>
            <label for="credit-card-input id="credit-card-input" name="credit-card-input"">credit card number
                <input type="text" id="credit-card-input" pattern="[0-9]{13,16}" required>
            </label>
            <button class="order__button">Place Order</button>
        </form>
        <button class="checkout__return-button">Back to shopping</button>
    </section>`;