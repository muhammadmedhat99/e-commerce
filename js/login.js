// get elements from dom
let username = document.querySelector("#username");
let password = document.querySelector("#password");

let signInBtn = document.querySelector("#sign-in");

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

// onclick the button we take actions
signInBtn.addEventListener("click", logIn);

// login function
function logIn(e) {
    // to stop the auto reload
    e.preventDefault();

    // check if he wrote a data or not
    if (username.value === "" || password.value === "") {
        alert("Please enter valid data");
    } else {
        if (
            getUser &&
            getUser.trim() === username.value.trim() &&
            getPassword &&
            getPassword === password.value
        ) {
            setTimeout(() => {
                window.location = "index.html";
            }, 500);
        } else {
            let notValid = document.querySelector(".center");
            let errorMsg = document.createElement("div");
            errorMsg.className = "error-msg";
            errorMsg.textContent = "Wrong Username or Password";
            notValid.appendChild(errorMsg);
        }
    }
}
