let productsDom = document.querySelector(".products");
let emptyCart = document.querySelector(".no-products-in-cart");

// the function to draw products
function drawCartProducts(allProducts = []) {
    // check if the cart is empty
    if (
        JSON.parse(localStorage.getItem("productsCart")) == "" ||
        !localStorage.getItem("productsCart")
    ) {
        emptyCart.innerHTML = `The Cart Is Empty <a href="index.html">See Products</a>`;
        emptyCart.style.display = "block";
    }

    let products =
        JSON.parse(localStorage.getItem("productsCart")) || allProducts;
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
            <span>Quantity: ${item.qnty}</span>
        </div>
        <div class="product-actions">
            <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
        </div>
    </div>`;
    });

    // put the products into the HTML Products div
    productsDom.innerHTML = productUI.join("");
}
drawCartProducts();

// remove from cart function
function removeFromCart(id) {
    let productsOnLocalStorage = localStorage.getItem("productsCart");
    if (productsOnLocalStorage) {
        let prd = JSON.parse(productsOnLocalStorage);
        let filteredItems = prd.filter((item) => item.id != id);
        localStorage.setItem("productsCart", JSON.stringify(filteredItems));
        drawCartProducts(filteredItems);
    }
}
