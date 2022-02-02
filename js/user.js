// select the elements on the home page
let userInfo = document.querySelector("#user-info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#log-out");
let userImg = document.querySelector("#user-info img");

let username = localStorage.getItem("username");
// chick if local storage hava data or not
if (username) {
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = username;
    userImg.src =
        localStorage.getItem("profile-image") ||
        "imgs/blank-profile-picture-973460_1280.png";
}

// clear date when click on log out button
logOutBtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html";
    }, 500);
});
