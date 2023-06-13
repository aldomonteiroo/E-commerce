const costoSubtotalGral = document.getElementById("spanSubtotal");
const costoDeEnvio = document.getElementById("spanCostoEnvio");
const costoTotal = document.getElementById("spanTotal");
const cartContainer = document.getElementById("cart-container");

const radioCard = document.getElementById("flexRadioCard");
const categoryCard = document.querySelectorAll('input[name="categoryCard"]');
const accountNumber = document.getElementById("accNumb");
const radioBank = document.querySelector('input[id="flexRadioBank"]');

const cardInfoOne = document.getElementById('cardInfo1');
const cardInfoTwo = document.getElementById('cardInfo2');
const cardInfoThree = document.getElementById('cardInfo3');


let cartID25801Array = [];

function showCart(array){
    let {name, unitCost, count, currency, image} = array;

    HTMLContent = `
    <table class="table table-striped">
        <tr>
            <th></th>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
        <tr>
            <th><image src="${image}"  class="img-thumbnail" width="200px"></th>
            <th>${name}</th>
            <th>${currency} ${unitCost}</th>
            <th><input value="${count}" id="countValue" type="text" placeholder="Digite aquí" name="cantidad"/></th>
            <th id="subTotal">${currency} ${unitCost} <hr></th>
        </tr>       
    `
    cartContainer.innerHTML += HTMLContent;
    costoSubtotalGral.innerHTML = `${currency} ${unitCost}`;
}

/* Petición web a https://japceibal.github.io/emercado-api/user_cart/25801.json
Mostrar id 25801
Calcular subtotal en base a cantidad
subtotal, costo de envío, total
 */
document.addEventListener("DOMContentLoaded", ()=>{
    let cartID25801 = CART_INFO_URL + "25801" + EXT_TYPE;

    getJSONData(cartID25801).then((resultObj) =>{
        if(resultObj.status === "ok"){
            cartID25801Array = resultObj.data.articles[0];
            showCart(cartID25801Array);

            
            const subt = document.getElementById("subTotal");
            const input = document.querySelector('input');

            input.addEventListener('input', calcSubTotal);

            function calcSubTotal() {
                let subtotal = 0;
                subtotal += input.value * parseInt(cartID25801Array.unitCost);
                subt.innerHTML = `${cartID25801Array.currency}` + " " + subtotal + `<hr>`;
                return costoSubtotalGral.innerHTML = `${cartID25801Array.currency}` + " " + subtotal;
            }

            /* subtotal general, costo de envío, total a pagar (FORM) */

                /* subtotal general */
            function calcSubTotalValue() {
                subtotal = 0;
                return subtotal += input.value * parseInt(cartID25801Array.unitCost);
            }
                /* costo de envío */
            
            function calcCostoEnvio(value) {
                costoEnvio = parseInt(calcSubTotalValue());
                return costoEnvio *= value;
            }

            let radioPercent = document.querySelectorAll("input[name='radioFormPercent']");
            let selected = ()=>{
                let radioChecked = document.querySelector("input[name='radioFormPercent']:checked")
                costoDeEnvio.innerHTML = `${cartID25801Array.currency} ` + calcCostoEnvio(radioChecked.value);
                costoTotal.innerHTML = `${cartID25801Array.currency} ` + calcTotal(calcCostoEnvio(radioChecked.value));
            }
            radioPercent.forEach(radioBtn =>{
                radioBtn.addEventListener('change', selected);
            });
            selected;

                /* total a pagar */
            function calcTotal(value) {
                let total = parseInt(calcSubTotalValue());
                return total += value;
            }
        }
    })
});

function modalDisabled(){

    let cardFunction = () => {
        document.getElementById("selectedPayMethod").innerHTML = `Transferencia bancaria`;
        categoryCard.forEach(infoCard => {
            infoCard.disabled = true;
        });
        accountNumber.disabled = false;
    }
    let bankAccountFunc = () => {
        document.getElementById("selectedPayMethod").innerHTML = `Tarjeta de crédito`;
        categoryCard.forEach(infoCard => {
            infoCard.disabled = false;
        });
        accountNumber.disabled = true;
    }

    if (radioBank.addEventListener('change', cardFunction)) {    
    } else if (radioCard.addEventListener('change', bankAccountFunc)){}
}
modalDisabled();

/* Form.js */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                modalValidate();
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    
                }
                form.classList.add('was-validated')
                if(form.checkValidity()){
                    
                    document.getElementById('alertSuccess').innerHTML = 
                    `<div class="alert alert-success" role="alert">
                    ¡Compra exitosa!
                    </div>`}         
            }, false)
        })
})()

function modalValidate(){
    const radioBankAcc = document.getElementById('flexRadioBank');
    const falseTerms = document.getElementById('termsFalse');
    const terms = document.getElementById('terms');
    const checkbutton = document.getElementById('checkBtn');

    if (radioCard.checked || radioBankAcc.checked){
        terms.style.color = " #008000";
        falseTerms.style.display = "none";
    } else {
        falseTerms.style.display = "block";
        terms.style.color = " #ff0000 ";
        checkbutton.addEventListener('click', ()=> {
            if ((cardInfoOne.value !== "" && cardInfoTwo.value !== "" && cardInfoThree.value !== "") || accountNumber.value!== ""){
                terms.style.color = " #008000";
                falseTerms.style.display = "none";
            } else {
                falseTerms.style.display = "block";
                terms.style.color = " #ff0000 ";
            }

        }); 
    }
}
