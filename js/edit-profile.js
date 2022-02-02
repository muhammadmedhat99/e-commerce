// get variabales from local storage
let localUsername = localStorage.getItem("username");
let localEmail = localStorage.getItem("email");
let localProfileImage = localStorage.getItem("profile-image");

// dom variabales
let domUserEdit = document.getElementById("change-name");
let domEmailEdit = document.getElementById("change-email");
let editProfileForm = document.getElementById("edit-profile-form");
let chosenImage = document.getElementById("profile-image-file");
let profileImage;

// we upload the image
chosenImage.addEventListener("change", uploadImage);

// setting values
domUserEdit.value = localUsername;
domEmailEdit.value = localEmail;

editProfileForm.addEventListener("submit", editProfileData);

// edit profile function
function editProfileData(e) {
    if (profileImage == undefined) {
        profileImage = "imgs/blank-profile-picture-973460_1280.png";
    }
    e.preventDefault();
    localStorage.setItem("username", domUserEdit.value);
    localStorage.setItem("email", domEmailEdit.value);
    localStorage.setItem("profile-image", profileImage);
    setTimeout(() => {
        window.location = "profile.html";
    }, 500);
}

// uploadImage
function uploadImage() {
    let file = this.files[0];

    let types = ["image/png", "image/jpeg"];

    if (types.indexOf(file.type) == -1) {
        alert("type of photo doesent exist");
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
        profileImage = reader.result;
    };

    reader.onerror = function () {
        alert("Error !!!");
    };
}
