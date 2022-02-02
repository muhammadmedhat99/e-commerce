// draw the products into the html
let productsDom = document.querySelector(".products");

// products array of objects
let product = productDB;

// the function to draw products
let drawProductsUI;
(drawProductsUI = function (products = []) {
    let productUI = products.map((item) => {
        return `<div class="product-items">
        <img
            src="${item.imageUrl}"
            alt="${item.title}"
        />
        <div class="product-info">
            <a onclick="saveItemData(${item.id})">${item.title}</a>
            <p>
            ${item.description}
            </p>
            <span>price: ${item.price} EGP</span>
            ${
                item.isMe == "Y"
                    ? "<button class = edit-product onclick=editProduct(" +
                      item.id +
                      ")>Edit</button>"
                    : ""
            }
        </div>
        <div class="product-actions">
            <button class="add-to-cart" onclick="navProducts(${
                item.id
            })">Add To Cart</button>
            <i class="far fa-heart" style="color:${
                item.liked == true ? "red" : ""
            }" onclick="addToFav(${item.id})"></i>
        </div>
    </div>`;
    });

    // put the products into the HTML Products div
    productsDom.innerHTML = productUI.join("");
})(JSON.parse(localStorage.getItem("allProducts")) || product);

// add products to cart on the navbar
function navProducts(id) {
    let product = JSON.parse(localStorage.getItem("allProducts")) || productDB;
    let chosenItem = product.find((item) => item.id === id);
    let isProductInCart = addedItems.some((p) => p.id === chosenItem.id);

    if (isProductInCart) {
        addedItems = addedItems.map((p) => {
            if (p.id === chosenItem.id) p.qnty += 1;
            return p;
        });
    } else {
        addedItems.push(chosenItem);
    }
    cartProducts.innerHTML = "";

    addedItems.forEach((item) => {
        cartProducts.innerHTML += `<p>${item.title}   ${item.qnty}</p>`;
    });

    // add items to local Storage
    localStorage.setItem("productsCart", JSON.stringify(addedItems));

    // check if user loged in and show the cart
    if (localStorage.getItem("username")) {
        // counter to cound products
        let counter = document.querySelectorAll(".cart-products div p");
        // active the badge and display it
        badge.style.display = "block";
        badge.innerHTML = counter.length;
    } else {
        window.location = "login.html";
    }
}

function getUniqueArr(arr, filterType) {
    let unique = arr
        .map((item) => item[filterType])
        .map((item, i, final) => final.indexOf(item) === i && i)
        .filter((item) => arr[item])
        .map((item) => arr[item]);

    return unique;
}

// show item details on the details page
function saveItemData(id) {
    localStorage.setItem("productId", id);
    window.location = "details.html";
}

// search icon click to focus the search input
let searchIcon = document.querySelector(".search-engine i");
let searchField = document.querySelector(".search");
searchIcon.addEventListener("click", () => {
    searchField.focus();
});

// when click enter we search the product
searchField.addEventListener("keyup", (e) => {
    searching(
        e.target.value,
        JSON.parse(localStorage.getItem("allProducts")) || productDB
    );
    if (e.target.value.trim() === "") {
        drawProductsUI(
            JSON.parse(localStorage.getItem("allProducts")) || productDB
        );
    }
});

// search function
function searching(title, myArr) {
    let arr = myArr.filter(
        (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
    drawProductsUI(arr);
}

// add to favorite
let favItems = localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [];
function addToFav(id) {
    // check if user loged in and show the cart
    if (localStorage.getItem("username")) {
        let product =
            JSON.parse(localStorage.getItem("allProducts")) || productDB;
        let chosenItem = product.find((item) => item.id === id);
        chosenItem.liked = true;

        // add favorites to local Storage
        favItems = [...favItems, chosenItem];
        let uniqueProducts = getUniqueArr(favItems, "id");
        localStorage.setItem("fav", JSON.stringify(uniqueProducts));

        product.map((item) => {
            if (item.id === chosenItem.id) {
                item.liked = true;
            }
        });
        localStorage.setItem("allProducts", JSON.stringify(product));
        drawProductsUI(product);
    } else {
        window.location = "login.html";
    }
}

// create product check user
let createBtn = document.querySelector(".create-product-btn");
createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.getItem("username")) {
        window.location = "create.html";
    } else {
        window.location = "login.html";
    }
});

// filter products by price
let priceFilter = document.getElementById("price-filter");

priceFilter.addEventListener("change", filterProducts);

function filterProducts(e) {
    let val = e.target.value;
    let product = JSON.parse(localStorage.getItem("allProducts")) || product;

    if (val === "all") {
        drawProductsUI(product);
    } else {
        product = product.filter((i) => i.price < val);
        drawProductsUI(product);
    }
}

// edit product function
function editProduct(id) {
    localStorage.setItem("productToEdit", id);
    window.location = "edit.html";
}
