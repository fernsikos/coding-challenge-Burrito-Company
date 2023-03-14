let basket = new Basket;
let menu = new Menu;
let sum;

function init() {
    renderBasket();
    renderMenu();
}

function addToBasket(index) {
    let item = menu.burritoMenu[index];
    let doublicate = basket.basketItems.find(element=>element.name==item.name);
    if(doublicate) {
        doublicate['quantity']++
    }
    else {
        let itemToAdd = new Item;
        itemToAdd.name = item.name;
        itemToAdd.price = item.price;
        itemToAdd.quantity = 1;
        basket.basketItems.push(itemToAdd)

    }
    renderBasket(item)
}

function addQuantityOfItem(index) {
    let item = basket.basketItems[index];
    let itemToEdit = basket.basketItems.find(element=>element.name==item.name);
    itemToEdit['quantity']++;
    renderBasket();
}

function lowerQuantityOfItem(index) {
    let item = basket.basketItems[index];
    let itemToEdit = basket.basketItems.find(element=>element.name==item.name);
    if(itemToEdit['quantity'] >1) {
        itemToEdit['quantity']--
        console.log(basket.basketItems)

    } else {
        basket.basketItems = basket.basketItems.filter(e => e.name != itemToEdit.name);
        console.log(basket.basketItems)
    }
    renderBasket()
}

function renderMenu() {
    for (let index = 0; index < menu.burritoMenu.length; index++) {
        const item = menu.burritoMenu[index];
        document.getElementById('menu-item-container').innerHTML +=  /*html*/`
    <div class="menu-item">
    <img src="${item.img}" alt="">
    <div class="item-description">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>${item.price}</span>
    </div>
    <div class="add-button">
        <img src="img/plus-2-32.png" alt="" onclick="addToBasket(${index})">
    </div>
</div>`
    }
}

function renderBasket() {
    if (basket.basketItems.length === 0) {
        document.getElementById('basket-items').innerHTML = 'Dein Warenkorb ist leer'
        document.getElementById('order-btn').disabled = true;
    } else {
        document.getElementById('order-btn').disabled = false;
        document.getElementById('basket-items').innerHTML = ''
        for (let i = 0; i < basket.basketItems.length; i++) {
            const item = basket.basketItems[i];
            let itemName = item.name;
            document.getElementById('basket-items').innerHTML += HTMLBasketItems(item, i);
        }
    }
    renderSum();
}

function renderSum() {
    sum = basket.sumBasket().toFixed(2);
    document.getElementById('summe').innerHTML = /*html*/ `${sum}`
}

function oder() {
    document.getElementById('overlay').classList.remove('d-none');
    basket.basketItems = [];
    renderBasket();
}

function goBack() {
    document.getElementById('overlay').classList.add('d-none');
}

//Templates

function HTMLBasketItems(item, i) {
    return /*html*/`
    <div class="item">
        <div class="quantity">${item.quantity}</div>
        <div class="data">
            <div class="name">${item.name}</div>
            <div class="price">
                <div class="button-container">
                    <img src="img/minus-2-32.png" alt="" onclick="lowerQuantityOfItem(${i})">
                    <img src="img/plus-2-32.png" alt="" onclick="addQuantityOfItem(${i})">
                </div>${item.price}€</div>
        </div>
    </div>
 `
}