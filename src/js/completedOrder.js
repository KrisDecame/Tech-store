export const printCompletedOrder = (data, outputElement) => {
    const completeOrderHTML = `
    <section class="order__order-section">
        <h1>Dear customer, thank you for your purchase!</h1>
        <p>Rest of the nformation about order will be send to your e-mail address.</p>
        <div class="order-summary">
            <div class="order__items"></div>
            <div class="order__total">Subtotal $ ${data.cart.totalPrice}</div>
        </div>
        <button class="order__exit-button">Back</button>
    </section>`;
    outputElement.innerHTML = completeOrderHTML;

    const $orderItemsContainer = document.querySelector('.order__items');

    for (const item of data.cart.items) {
        const itemHTML = `<div class="order__item"><span>${item.name}</span><span>$ ${item.price}</span><span>${item.amount}</span></div>`;
        $orderItemsContainer.innerHTML += itemHTML;
    }

    const $orderExitButton = document.querySelector('.order__exit-button');

    $orderExitButton.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    })
}