let product = JSON.parse(localStorage.getItem("allProducts")) || productDB;
let selectedProductToEditId = localStorage.getItem("productToEdit");
let selectedProductToEdit = product.find(
    (i) => i.id == selectedProductToEditId
);
let productName = document.getElementById("name-edit");
let productDesc = document.getElementById("desc-edit");
let productPrise = document.getElementById("price-edit");
let submitEditBtn = document.getElementById("submit-edit");
let chosenImage = document.getElementById("image-file");
let productImage;
console.log(productImage);

// set local storage old values into the input feilds
productName.value = selectedProductToEdit.title;
productDesc.value = selectedProductToEdit.description;
productPrise.value = selectedProductToEdit.price;
productImage = selectedProductToEdit.imageUrl;

// we upload the image
chosenImage.addEventListener("change", uploadImage);

// // when click we create the products in page
submitEditBtn.addEventListener("click", editProductsFun);

// create products function
function editProductsFun(e) {
    e.preventDefault();

    // set the new values into the local storage
    let nameValue = productName.value;
    let descValue = productDesc.value;
    let priceValue = productPrise.value;

    selectedProductToEdit.title = nameValue;
    selectedProductToEdit.description = descValue;
    selectedProductToEdit.price = priceValue;
    selectedProductToEdit.imageUrl = productImage;

    localStorage.setItem("allProducts", JSON.stringify(product));

    // go to home page
    setTimeout(() => {
        window.location = "index.html";
    }, 500);
}

// uploadImage
function uploadImage() {
    let file = this.files[0];

    let types = ["image/png", "image/jpeg"];

    if (types.indexOf(file.type) == -1) {
        alert("type doesent exist");
        return;
    }

    getImageBase(file);
}

// function to get the image link to apper into the page
function getImageBase(file) {
    // declare the reader to read the photo
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
        productImage = reader.result;
    };

    reader.onerror = function () {
        alert("Error !!!");
    };
}
