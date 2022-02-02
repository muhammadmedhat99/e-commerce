let cartProducts = document.querySelector(".cart-products div");
let shoppingCart = document.querySelector(".cart-products");
let shoppingMenu = document.querySelector(".shopping-menu");
let badge = document.querySelector(".badge");

// check if there is added items to create array or not
let addedItems = localStorage.getItem("productsCart")
    ? JSON.parse(localStorage.getItem("productsCart"))
    : [];

// cart menue date from local storage function
(function cartMenuData() {
    if (addedItems) {
        addedItems.map((item) => {
            cartProducts.innerHTML += `<p>${item.title}<span class=item-qnty>${item.qnty}</span></p>`;
        });
        // active the badge and display it
        badge.style.display = "block";
        badge.innerHTML = addedItems.length;
    }
})();

// function to toggle the cart on the navbar
shoppingMenu.addEventListener("click", () => {
    if (cartProducts.innerHTML != "") {
        shoppingCart.classList.toggle("opend");
    }
});
