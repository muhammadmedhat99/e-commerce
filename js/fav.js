let productsDom = document.querySelector(".products");
let emptyFav = document.querySelector(".no-fav");

// the function to draw products
function drawFavProducts(allProducts = []) {
    // check if the cart is empty
    if (
        JSON.parse(localStorage.getItem("fav")) == "" ||
        !localStorage.getItem("fav")
    ) {
        emptyFav.innerHTML = `No Favorite Products <a href="index.html">See All Products</a>`;
        emptyFav.style.display = "block";
    }

    let products = JSON.parse(localStorage.getItem("fav")) || allProducts;
    let productUI = products.map((item) => {
        return `<div class="product-items">
        <img
            src="${item.imageUrl}"
            alt="flit-mnstr"
        />
        <div class="product-info">
            <h2>${item.title}</h2>
            <p>
                Lorem ipsum dolor sit, amet consectetur
                adipisicing.
            </p>
            <span>price: ${item.price}</span><br/>
            <br/>
            
        </div>
        <div class="product-actions">
            <button class="add-to-cart" onclick="removeFromFav(${item.id})">Remove From Favorites</button>
        </div>
    </div>`;
    });

    // put the products into the HTML Products div
    productsDom.innerHTML = productUI.join("");
}
drawFavProducts();

// remove from cart function
function removeFromFav(id) {
    let productsOnLocalStorage = localStorage.getItem("fav");
    if (productsOnLocalStorage) {
        let product =
            JSON.parse(localStorage.getItem("allProducts")) || productDB;
        let prd = JSON.parse(productsOnLocalStorage);
        let filteredItems = prd.filter((item) => item.id != id);

        localStorage.setItem("fav", JSON.stringify(filteredItems));

        let selected = prd.find((i) => (i.id = id));
        product.map((item) => {
            if (item.id === selected.id) {
                item.liked = false;
            }
        });
        localStorage.setItem("allProducts", JSON.stringify(product));
        drawFavProducts(filteredItems);
    }
}
