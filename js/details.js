let allProducts = JSON.parse(localStorage.getItem("allProducts")) || productDB;
let productIdDetails = localStorage.getItem("productId");
let itemDetails = document.querySelector(".item-details");

// fint the clicked product by the id
let productDetails = allProducts.find((item) => item.id == productIdDetails);

// set the details into HtML Page
itemDetails.innerHTML = `<img src="${productDetails.imageUrl}" alt="${
    productDetails.title
}" />
<h2>${productDetails.title}</h2>
<p>${productDetails.description}</p>
<h4>price: ${productDetails.price}</h4>
${
    productDetails.isMe == "Y"
        ? "<button class = edit-product style=display:inline-block; onclick=editProduct(" +
          productDetails.id +
          ")>Edit</button>"
        : ""
}`;

function editProduct(id) {
    localStorage.setItem("productToEdit", id);
    window.location = "edit.html";
}
