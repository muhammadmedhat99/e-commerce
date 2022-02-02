// select elements from dom page
let productName = document.getElementById("name-created");
let productDesc = document.getElementById("desc-created");
let productPrise = document.getElementById("price-created");
let submitCreateBtn = document.getElementById("submit-create");
let chosenImage = document.getElementById("image-file");
let productImage;

// we upload the image
chosenImage.addEventListener("change", uploadImage);

// when click we create the products in page
submitCreateBtn.addEventListener("click", createProductsFun);

// create products function
function createProductsFun(e) {
    e.preventDefault();
    // check if the fields is empty or not
    if (
        productName.value == "" ||
        productDesc.value == "" ||
        productPrise.value == "" ||
        chosenImage.value == ""
    ) {
        alert("Please fill all fields ");
    } else {
        let myProducts =
            JSON.parse(localStorage.getItem("allProducts")) || productDB;
        let nameValue = productName.value;
        let descValue = productDesc.value;
        let priceValue = productPrise.value;

        let obj = {
            id: myProducts.length + 1,
            title: nameValue,
            imageUrl: productImage,
            price: parseFloat(priceValue),
            qnty: 1,
            description: descValue,
            isMe: "Y",
        };

        let newProducts = myProducts ? [...myProducts, obj] : [obj];
        localStorage.setItem("allProducts", JSON.stringify(newProducts));

        productName.value = "";
        productDesc.value = "";
        productPrise.value = "";

        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    }
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
