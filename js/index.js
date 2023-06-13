document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

/* Al cargar, función que guarda el mail de "login.html" en el almacenamiento local
emailContent incluye la variable emailIndex
se pega emailContent (menú desplegable) en el item dentro de la barra de navegación en "index.html" */

document.addEventListener("DOMContentLoaded", function () {
    let emailIndex = localStorage.getItem("email");
    let emailContent = `  
    <div class="dropdown">
        <a class="btn btn-secondary dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            ${emailIndex}
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
            <li><input class="dropdown-item" type="button" onclick="cerrarSesion()" value="Cerrar sesión"></li>
        </ul>
    </div>
    `;

    document.getElementById("userMenu").innerHTML += emailContent;
});

