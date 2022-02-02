// get the values from the input
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let signUpBtn = document.querySelector("#sign-up");

// when click the sign up button we take the actions
signUpBtn.addEventListener("click", register);

// register function

function register(e) {
    // to stop the auto reload
    e.preventDefault();

    // check if he wrote a data or not
    var mailformat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
        username.value === "" ||
        email.value === "" ||
        password.value.length < 6 ||
        password.value.length > 32
    ) {
        let notValid = document.querySelector(".center");
        let errorMsg = document.createElement("div");
        errorMsg.className = "error-msg";
        errorMsg.textContent =
            "Please Enter username & Email & Password 6-32 character";
        notValid.appendChild(errorMsg);
    } else {
        if (email.value.match(mailformat)) {
            localStorage.setItem("username", username.value);
            localStorage.setItem("email", email.value);
            localStorage.setItem("password", password.value);
            setTimeout(() => {
                window.location = "login.html";
            }, 500);
        } else {
            let notValid = document.querySelector(".center");
            let errorMsg = document.createElement("div");
            errorMsg.className = "error-msg";
            errorMsg.textContent = "Please Enter Valid Email";
            console.log("no");
            notValid.appendChild(errorMsg);
        }
    }
}
