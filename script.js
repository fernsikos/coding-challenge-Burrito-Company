let basket = new Basket();
let menu = new Menu();
let sum;

function init() {
    renderBasket();
    renderMenu();
}

/**
 * Checkes if an item is already in basket. If true adds quantity of item. If false pushes 
 * Item to basket
 * @param {Number} index 
 */
function addToBasket(index) {
    let item = menu.burritoMenu[index];
    let doublicate = basket.basketItems.find(element => element.name == item.name);
    if (doublicate) {
        doublicate['quantity']++
    }
    else {
        createNewItem(item)
    }
    renderBasket(item)
}

/**
 * Creates new Menu item and its data. Then pushes it to basket
 * @param {Object} item 
 */
function createNewItem(item) {
    let itemToAdd = new Item;
    itemToAdd.name = item.name;
    itemToAdd.price = item.price;
    itemToAdd.quantity = 1;
    basket.basketItems.push(itemToAdd)
}

/**
 * Finds the object and raises its quantity by 1
 * @param {Number} index 
 */
function addQuantityOfItem(index) {
    let item = basket.basketItems[index];
    let itemToEdit = basket.basketItems.find(element => element.name == item.name);
    itemToEdit['quantity']++;
    renderBasket();
}

/**
 * Finds the object and lowers its quantity by 1. If quantity is already one, deletes the object from basket
 * @param {Number} index 
 */
function lowerQuantityOfItem(index) {
    let item = basket.basketItems[index];
    let itemToEdit = basket.basketItems.find(element => element.name == item.name);
    if (itemToEdit['quantity'] > 1) {
        itemToEdit['quantity']--
    } else {
        basket.basketItems = basket.basketItems.filter(e => e.name != itemToEdit.name);
    }
    renderBasket()
}

/**
 * Renders the menu HTML
 */
function renderMenu() {
    for (let index = 0; index < menu.burritoMenu.length; index++) {
        const item = menu.burritoMenu[index];
        document.getElementById('menu-item-container').innerHTML += HTMLMenuItems(item, index)
    }
}

/**
 * Renders the basket HTML
 */
function renderBasket() {
    if (basket.basketItems.length === 0) {
        renderEmptyBasket();
    } else {
        renderBasketItems();
    }
    renderSum();
}

/**
 * Renders basket items HTML
 */
function renderBasketItems() {
    document.getElementById('order-btn').disabled = false;
    document.getElementById('basket-items').innerHTML = ''
    for (let i = 0; i < basket.basketItems.length; i++) {
        const item = basket.basketItems[i];
        document.getElementById('basket-items').innerHTML += HTMLBasketItems(item, i);
    }
}

/**
 * Renders empty basket HTML
 */
function renderEmptyBasket() {
    document.getElementById('basket-items').innerHTML = 'Dein Warenkorb ist leer'
    document.getElementById('order-btn').disabled = true;
}

/**
 * Sums up all basket items
 */
function renderSum() {
    sum = basket.sumBasket().toFixed(2);
    document.getElementById('summe').innerHTML = /*html*/ `${sum}`
}

/**
 * Triggers oder function and resets basket
 */
function order() {
    document.getElementById('overlay').classList.remove('d-none');
    basket.basketItems = [];
    renderBasket();
}

/**
 * Closes order overlay
 */
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

function HTMLMenuItems(item, index) {
    return /*html*/`
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
    </div>
`
}