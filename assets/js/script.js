const $ = document;
const shoppingBtn = $.querySelector(".header__basket");
const appModal = $.querySelector(".modal");
const appModalOverly = $.querySelector(".modal-overly");
const prductsWrapper = $.querySelector(".products-wrapper");
const shoppingCartsWrapper = $.querySelector(".modal-wrapper");
const totalPricesOfProducts = $.querySelector(".modal__price");
const clearAllCartsBtn = $.querySelector(".app__clear-btn");
const confirmBtn = $.querySelector(".app__confirm-btn");

let allProducts = [
    { id: 1, src: "assets/images/product-1.jpeg", price: 10.99, count: 1 },
    { id: 2, src: "assets/images/product-2.jpeg", price: 8.99, count: 1 },
    { id: 3, src: "assets/images/product-3.jpeg", price: 7, count: 1 },
    { id: 4, src: "assets/images/product-4.jpeg", price: 12.5, count: 1 },
    { id: 5, src: "assets/images/product-5.jpeg", price: 9, count: 1 },
    { id: 6, src: "assets/images/product-6.jpeg", price: 13.99, count: 1 },
    { id: 7, src: "assets/images/product-7.jpeg", price: 20, count: 1 },
    { id: 8, src: "assets/images/product-8.jpeg", price: 15.99, count: 1 },
];

let shoppingCarts = [];

allProducts.forEach(function (product) {
    prductsWrapper.insertAdjacentHTML(
        "beforeend",
        '<div class="product"><img src ="' +
            product.src +
            '" alt ="#" class="product__img"><div class="product__details"><p class="product__price">$' +
            product.price +
            '</p><p class="product__caption">queen panel bed</p></div><button class="app-btn product__buy-btn" id="' +
            product.id +
            '" onclick="addNewCartBtn(' +
            product.id +
            ')">add to cart</button></div >'
    );
});

function openModalHandler() {
    appModal.classList.add("modal--active");
    appModalOverly.classList.add("modal-overly--active");
    emptyShoppingCart();
}

function closeModalHandler() {
    appModal.classList.remove("modal--active");
    appModalOverly.classList.remove("modal-overly--active");
}

function clickOutsideModal(event) {
    if (event.target.classList.contains("modal-overly")) {
        appModal.classList.remove("modal--active");
        appModalOverly.classList.remove("modal-overly--active");
    }
}

function addNewCartBtn(btnId) {
    btnId = +btnId;
    let chechItemCarts = shoppingCarts.some(function (item) {
        return item.id === btnId;
    });

    let findIndexOfnewCart = allProducts.findIndex(function (item) {
        return item.id === btnId;
    });

    if (!chechItemCarts) {
        shoppingCarts.push(allProducts[findIndexOfnewCart]);
        registerNewCartToShoppingCarts(shoppingCarts);
        calcNumberOfCartsInShopping(shoppingCarts);
        calcFinalPrices();
    }
}

function registerNewCartToShoppingCarts(cartsList) {
    shoppingCartsWrapper.innerHTML = "";
    cartsList.forEach(function (cart) {
        shoppingCartsWrapper.insertAdjacentHTML(
            "beforeend",
            '<div class="modal-content"><div class="modal-product"><img src="' +
                cart.src +
                '" alt="#" class="modal-product__img"><div class="modal-content__price"><p class="modal-content__price-name">queen panel bed</p><p class="modal-content__price-number">$' +
                cart.price +
                '</p></div><div class="modal-content__number"><svg class="modal-content__number-plus" onclick="plusNumberOfProduct(' +
                cart.id +
                ')" viewBox="0 0 384 512"><path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"></path></svg><div class="modal-content__number-value">' +
                cart.count +
                '</div><svg class="modal-content__number-minus" onclick="minusNumberOfProduct(' +
                cart.id +
                ')" viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"></path></svg></div><svg class="modal-content__icon" onclick="removeItemFromShoppingCart(' +
                cart.id +
                ')" viewBox="0 0 448 512"><path d="M144 400C144 408.8 136.8 416 128 416C119.2 416 112 408.8 112 400V176C112 167.2 119.2 160 128 160C136.8 160 144 167.2 144 176V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V176C208 167.2 215.2 160 224 160C232.8 160 240 167.2 240 176V400zM336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V400zM310.1 22.56L336.9 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56V22.56zM148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7C172.2 32 167.1 34.84 164.2 39.52L148.9 64zM64 432C64 458.5 85.49 480 112 480H336C362.5 480 384 458.5 384 432V96H64V432z"></path></svg></div></div>'
        );
    });
}

function calcNumberOfCartsInShopping(cartList) {
    shoppingBtn.dataset.notificationCount = cartList.length;
}

function emptyShoppingCart() {
    if (shoppingBtn.dataset.notificationCount == 0) {
        shoppingCartsWrapper.innerHTML = "";
        shoppingCartsWrapper.insertAdjacentHTML(
            "beforeend",
            '<div class="empty__shopping-cart"><svg class="empty__shopping-cart--icon" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM159.3 388.7C171.5 349.4 209.9 320 256 320C302.1 320 340.5 349.4 352.7 388.7C355.3 397.2 364.3 401.9 372.7 399.3C381.2 396.7 385.9 387.7 383.3 379.3C366.8 326.1 315.8 287.1 256 287.1C196.3 287.1 145.2 326.1 128.7 379.3C126.1 387.7 130.8 396.7 139.3 399.3C147.7 401.9 156.7 397.2 159.3 388.7H159.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"></path></svg><p class="empty__shopping-cart--text">Your shopping cart is empty!</p></div>'
        );
    }
}

function calcFinalPrices() {
    let numberPrice = 0;
    shoppingCarts.forEach(function (cartPrice) {
        numberPrice += cartPrice.price * cartPrice.count;
    });
    if (numberPrice === 0) {
        totalPricesOfProducts.innerHTML = "Total Price : $0" + numberPrice.toFixed(2);
    } else {
        totalPricesOfProducts.innerHTML = "Total Price : $" + numberPrice.toFixed(2);
    }
}

function plusNumberOfProduct(itemId) {
    itemId = +itemId;
    let findItemCart = shoppingCarts.find(function (item) {
        return item.id === itemId;
    });
    findItemCart.count += 1;
    registerNewCartToShoppingCarts(shoppingCarts);
    calcFinalPrices();
}

function minusNumberOfProduct(itemId) {
    itemId = +itemId;
    let findItemCart = shoppingCarts.find(function (item) {
        return item.id === itemId;
    });
    if (findItemCart.count > 1) {
        findItemCart.count -= 1;
    }
    registerNewCartToShoppingCarts(shoppingCarts);
    calcFinalPrices();
}

function removeItemFromShoppingCart(itemId) {
    itemId = +itemId;
    let findItemCart = shoppingCarts.find(function (item) {
        return item.id === itemId;
    });
    shoppingCarts.splice(findItemCart, 1);
    registerNewCartToShoppingCarts(shoppingCarts);
    calcFinalPrices();
    calcNumberOfCartsInShopping(shoppingCarts);
    emptyShoppingCart();
}

function clearShoppingCart() {
    shoppingCarts = [];
    registerNewCartToShoppingCarts(shoppingCarts);
    calcFinalPrices();
    calcNumberOfCartsInShopping(shoppingCarts);
    emptyShoppingCart();
}

shoppingBtn.addEventListener("click", openModalHandler);
confirmBtn.addEventListener("click", closeModalHandler);
clearAllCartsBtn.addEventListener("click", clearShoppingCart);
$.addEventListener("click", clickOutsideModal);
