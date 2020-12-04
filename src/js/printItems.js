export const printItems = async (data) => {

    const itemsContainer = document.querySelector('.store__items-container');
    data.items.forEach(item => {
        const itemHTML = `
            <div class="store-item" data-id="${item.id}" data-name="${item.name}">
                <div class="store-item__content">
                    <div class="store-item__percent">${item.saleSymbol}</div>
                    <h1>${item.name}</h1>
                    <h4>$ ${item.price}</h4>
                    <h3 class="store-item__sale-caption">${item.saleCaption}</h3>
                </div>
                <img src="${item.image}">
                <button class="item__add-button">Add to Cart</button>
            <div>`;
        itemsContainer.innerHTML += itemHTML;
    });

    return data;
}
