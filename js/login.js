/* document.getElementById("idLogin").addEventListener("click", function iniciarSesion() {
    window.location.href = "index.html";
}); */

let email = document.getElementById("emailInput");
let password = document.getElementById("emailInput");

function iniciarSesion() {
    if (email.value && password.value) {
        location.href = "index.html";
        localStorage.setItem("email", email.value);
    } else {
        window.alert("Requisitos inválidos, vuelva a intentarlo");
    }
};

function cerrarSesion() {
    localStorage.removeItem("email");
    window.location = "login.html";
}






