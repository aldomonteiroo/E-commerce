let infoProdArray = [];
let commentArray= [];
let HTMLContent = "";

function relatedProd(id) {
    localStorage.removeItem("prodID")
    localStorage.setItem("prodID", id);


    let idURL = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;

    let idCommentURL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;

    getJSONData(idURL).then((resultObj) => {
        if (resultObj.status === "ok") {
            infoProdArray = resultObj.data;
            showProdInfoList(infoProdArray);
        }
    });
    getJSONData(idCommentURL).then((resultObj) => {
        if (resultObj.status === "ok") {
            commentArray = resultObj.data;
            showComment(commentArray);
        }
    });
}

function showProdInfoList(array) {

    let {name, currency, cost, description, category, soldCount, images, relatedProducts} = array;
    HTMLContent =
        `<br><br>
        <h1 class="text-muted">${name}</h1>
        <hr>

        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
            <h3>Precio</h3>
            </div>
            <p class="text-muted">${cost} ${currency}</p>
        </div>
        
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
            <h3>Descripción</h3>
            </div>
            <p class="text-muted">${description} </p>
        </div>
        
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
            <h3>Categoría</h3>
            </div>
            <p class="text-muted">${category}</p>
        </div>
        
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
            <h3>Cantidad de vendidos</h3>
            </div>
            <p class="text-muted">${soldCount}</p</div>
            </div>
        </div>
        <br>

        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
            <h3>Imágenes del producto</h3>
            </div>

            <div>
            <img class="img-edit" src="${images[0]}">
            <img class="img-edit" src="${images[1]}">
            <img class="img-edit" src="${images[2]}">
            <img class="img-edit" src="${images[3]}">
            </div>
        </div>
        <br>`
    document.getElementById("prod-info").innerHTML += HTMLContent;

    /* relatedProducts */
    HTMLContent =
        `<div class="d-flex w-100 justify-content-between">
    <h5>Productos relacionados</h5>
    </div>

    <div onclick="relatedProd(${relatedProducts[0].id})" class="list-group-item"><a href="product-info.html"><img class="img-edit" src="${relatedProducts[0].image}"></a>
    <p>${relatedProducts[0].name}</p>
    </div>
    <div onclick="relatedProd(${relatedProducts[1].id})" class="list-group-item"><a  href="product-info.html"><img class="img-edit" src="${relatedProducts[1].image}"></a>
    <p>${relatedProducts[1].name}</p>
    </div>`

    document.getElementById("prod-info-related").innerHTML += HTMLContent;
    }

function showComment(array) {;
    /* HTMLContent = `<h2 class="text-muted">Comentarios</h2><br>`; */

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        let {user, dateTime, description, score} = comments;
        let HTMLCont = "";
    HTMLCont = `
    <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="list-group">
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            <h5>${user} - <small class="text-muted">${dateTime} - ${score}
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            </small></h5>
                            </div>
                        <p>${description}</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById("prod-info-comments").innerHTML += HTMLCont;
    }
}

document.addEventListener("DOMContentLoaded", function() {
        let idURL = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;

        let idCommentURL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
        console.log(idURL);
        console.log(idCommentURL);

        getJSONData(idURL).then((resultObj) => {
            if (resultObj.status === "ok") {
                infoProdArray = resultObj.data;
                showProdInfoList(infoProdArray);
            }
        });
        getJSONData(idCommentURL).then((resultObj) => {
            if (resultObj.status === "ok") {
                commentArray = resultObj.data;
                showComment(commentArray);
            }
        });

    });