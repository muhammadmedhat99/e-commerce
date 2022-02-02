// get variabales from local storage
let localUsername = localStorage.getItem("username");
let localEmail = localStorage.getItem("email");
let product = JSON.parse(localStorage.getItem("allProducts")) || productDB;
let myProducts = product.filter((i) => i.isMe == "Y");

// dom variabales
let domUser = document.querySelector(".profile-username");
let domEmail = document.querySelector(".profile-email");
let domImage = document.querySelector(".profile-image");
let numberOfMyProducts = document.querySelector(".products-number span");

domUser.innerHTML = `User Name : ${localUsername}`;
domEmail.innerHTML = `E-mail : ${localEmail}`;
if (myProducts.length != 0) {
    numberOfMyProducts.innerHTML = myProducts.length;
} else {
    numberOfMyProducts.parentElement.remove();
}
if (localStorage.getItem("profile-image")) {
    domImage.src = `${localStorage.getItem("profile-image")}`;
} else {
    domImage.src = "imgs/blank-profile-picture-973460_1280.png";
}
localStorage.setItem("profile-image", domImage.src);
