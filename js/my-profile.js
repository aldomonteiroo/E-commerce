/* (function () {
    let forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated')
                if (form.checkValidity()) {}
            }, false)
        })
})() */

let inputEmailTxt = document.getElementById("email");
let form = document.getElementById("my-profile");
let name1 = document.getElementById("firstName");
let name2 = document.getElementById("secondName")
let surName1 = document.getElementById("fSurName");
let surName2 = document.getElementById("sSurName");
let phone = document.getElementById("contact");


form.addEventListener('submit', ()=>{
    /* required data */
    localStorage.setItem('firstName', name1.value);
    localStorage.setItem('firstSurName', surName1.value);

    /* optional data */
        localStorage.setItem('secondName', name2.value);
        localStorage.setItem('secondSurName', surName2.value);
        localStorage.setItem('phone', phone.value);
})


document.addEventListener('DOMContentLoaded', () => {
    /* required data */
    let itemEmail = localStorage.getItem('email');
    inputEmailTxt.value = itemEmail;
    let name1Item = localStorage.getItem('firstName');
    name1.value = name1Item;
    
    let surName1Item = localStorage.getItem('firstSurName');
    surName1.value = surName1Item;
    /* optional data */

    let name2Item = localStorage.getItem('secondName');
    name2.value = name2Item;
    let surName2Item = localStorage.getItem('secondSurName');
    surName2.value = surName2Item;
    let phoneItem = localStorage.getItem('phone');
    phone.value = phoneItem;
});