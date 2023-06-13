const ORDER_BY_RELEVANCE_PROD = "Relevancia";
const ORDER_ASC_BY_COST = "$^";
const ORDER_DESC_BY_COST = "$";
let currentSortProd = undefined;
let productsArray = [];

let minCost = undefined;
let maxCost = undefined;

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}


// showAutosList recibe un array con los datos del JSON de autos en .products ,y los muestra en pantalla a través del DOM

function showProductsList(array) {
  let htmlContent = "";
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
    ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
      htmlContent += `
      <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
          <div class="list-group">
            <div class="list-group-item list-group-item-action cursor-active">
              <div class="row">
                <div class="col-3">
                  <img src="${product.image}" alt="car-image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                      <h3> ${product.name}  - ${product.currency} ${product.cost}</h3>
                      <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    document.getElementById("product-container").innerHTML = htmlContent;
    }
  }
}

/* Escribir nombre de la categoría en "prodParagraph" (debajo del h1: products) */

function writeProductName() {
  let htmlContentName = document.getElementById("prodParagraph");
  htmlContentName.innerHTML = `Verás aquí la lista de productos de la categoría ${productsArray.catName}`;
}

function sortProducts(criteria, array) {
  let result = [];

  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_RELEVANCE_PROD) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);
      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  }
  return result;
};

function sortAndShowProducts(sortCriteria, array) {
  currentSortProd = sortCriteria;

  if (array != undefined) {
    productsArray = array;
  }

  productsArray.products = sortProducts(currentSortProd, productsArray.products);
  
  showProductsList(productsArray.products);
}

/* llama getJSONData()
Se crea variable en base a la categoría seleccionada, se recurre almacenamiento local y obtiene el catID guardado
Se verifica el estado del objeto con if y si es correcto se cargan los datos en forma de array al catProdArray
Se llama a showProductsList con el parámetro de la lista catProdArray.products
...
 */

 document.addEventListener("DOMContentLoaded", (e) => {
     let urlProd = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
     getJSONData(urlProd).then(function (resultObj) {
       if (resultObj.status === "ok") {
         productsArray = resultObj.data;
         showProductsList(productsArray.products);
         writeProductName();
       }
     });

     document.getElementById("sortAsc").addEventListener("click", function () {
       sortAndShowProducts(ORDER_ASC_BY_COST);
     });

     document.getElementById("sortDesc").addEventListener("click", function () {
       sortAndShowProducts(ORDER_DESC_BY_COST);
     });

     document.getElementById("sortByCount").addEventListener("click", function () {
       sortAndShowProducts(ORDER_BY_RELEVANCE_PROD);
     });

     document.getElementById("clearRangeFilter").addEventListener("click", function () {
       document.getElementById("rangeFilterCostMin").value = "";
       document.getElementById("rangeFilterCostMax").value = "";

       minCost = undefined;
       maxCost = undefined;

       showProductsList(productsArray.products);
     });

     document.getElementById("rangeFilterCount").addEventListener("click", function () {
       //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
       //de productos por categoría.
       minCost = document.getElementById("rangeFilterCostMin").value;
       maxCost = document.getElementById("rangeFilterCostMax").value;

       if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
         minCost = parseInt(minCost);
       }
       else {
         minCost = undefined;
       }

       if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
         maxCost = parseInt(maxCost);
       }
       else {
         maxCost = undefined;
       }

       showProductsList(productsArray.products);
     });

   });
