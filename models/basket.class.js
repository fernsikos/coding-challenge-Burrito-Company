class Basket {
    basketItems = [];

    sumBasket() {
        let sum = 0
        for (let i = 0; i < this.basketItems.length; i++) {
            const element = this.basketItems[i];
            let elementPriceAsNumber = parseFloat(element['price'].replace(',', '.'));
            let quantityAsNumber = parseFloat(element['quantity']);
            sum = sum + (elementPriceAsNumber * quantityAsNumber)
        }

        if(document.getElementById('discount-none').checked) {
            return sum 
        } else if(document.getElementById('discount-fix').checked) {
            return (sum - 2)
        } else {
            return (sum * 0.75)
        }
    }
}