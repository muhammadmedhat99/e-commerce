let product = JSON.parse(localStorage.getItem("allProducts")) || productDB;
let productsDom = document.querySelector(".products");
let emptyFav = document.querySelector(".no-products");

let drawProductsUI;
(drawProductsUI = function (product = []) {
    let myProducts = product.filter((item) => item.isMe === "Y");
    console.log(myProducts);
    if (myProducts.length != 0) {
        let productUI = myProducts.map((item) => {
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
            
        </div>
        <div class="product-actions">
            <button class = edit-product onclick=editProduct(${item.id}) style="margin:0">Edit</button>
            <button class = delete-product onclick=deleteProduct(${item.id})>Delete</button>
        </div>
    </div>`;
        });

        // put the products into the HTML Products div
        productsDom.innerHTML = productUI.join("");
    } else {
        {
            productsDom.remove();
            emptyFav.innerHTML = `<p>There Is No Products Created By This User</p> <a href="create.html">Create Products</a>`;
            emptyFav.style.display = "block";
        }
    }
})(JSON.parse(localStorage.getItem("allProducts")) || productDB);

// edit product function
function editProduct(id) {
    localStorage.setItem("productToEdit", id);
    window.location = "edit.html";
}

// delete product function
function deleteProduct(id) {
    let product = JSON.parse(localStorage.getItem("allProducts")) || productDB;
    let myProducts = product.filter((item) => item.isMe === "Y");
    let filtered = myProducts.filter((i) => i.id !== id);
    let clickedProduct = product.find((i) => i.id === id);
    product = product.filter((item) => item.id !== clickedProduct.id);
    localStorage.setItem("allProducts", JSON.stringify(product));
    drawProductsUI(filtered);
}
