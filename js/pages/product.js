window.onload = () => {
    var productId = sessionStorage.getItem('productId');
    var productName = sessionStorage.getItem('productName');
    productName = productName.toLowerCase();
    window.location.hash = '/teddies/' + productName + '/' + productId;
    
    callApiForProduct(productId).then(teddy => createChosenProductPageElements (teddy));
}

//Adds things to a chosen product's section
function createNewPage(name, imageUrl, colors, price, description, id) {
    //Building the core elements for the chosen product
    let article = document.createElement("article");
    let divElement = document.createElement("span");
    divElement.setAttribute("id", "span");
    article.appendChild(createElementImg(imageUrl)); 
    divElement.appendChild(createElementPart("h3", name));
    
    //Creates the particular trait for the product (here it is a color for the teddies)
    let colorArray = [];
    let selectElement = document.createElement("select");
    selectElement.id = "mySelect";
    divElement.appendChild(selectElement);
    for (let j = 0; j < colors.length; j++) {
        var option = document.createElement("option");
        option.value = colors[j];
        option.text = colors[j];
        selectElement.appendChild(option);  
        colorArray.push(colors[j]);
    }
    for (let i = 0; i < colorArray.length; i++) {
        console.log(colorArray[i]);
        addListenerForColorToCartStatus(colorArray[i]);
    }  

    //Adds color to the created buttons
    divElement.appendChild(createElementPart("p","Veuillez bien choisir une couleur :"));
    divElement.appendChild(selectElement);

    //Building the different other product elements
    divElement.appendChild(createElementPart("p", "Description : " + description));
    price /=100; price = price+ '€';
    divElement.appendChild(createElementPart("p", "Prix : " + price));
    divElement.appendChild(createElementPart("button","Ajouter cet article à votre panier",id));
    divElement.appendChild(createElementPart("button","Revenir au menu principal","home"));
    
    article.appendChild(divElement);

    return article;
}

//Adds the listener for color selection for the chosen product
function addListenerForColorToCartStatus (id) {
    console.log("This has launched");
    var el = document.getElementById(id);
    if(el){
    document.getElementById(id).addEventListener('click', ($event) => {
    $event.preventDefault();
    console.log("This has worked");
    
    //return document.getElementById(id);
    });
}   
console.log("This has not worked");
}

//Creates a section for a chosen product on the product page hashtag
function createChosenProductPageElements (teddy) {
    productSection.appendChild(createNewPage(
                teddy.name, 
                teddy.imageUrl, 
                teddy.colors, 
                teddy.price, 
                teddy.description,
                teddy._id
        ));
        addButtonListenersAdderCart(teddy.name,     
            teddy.colors, 
            teddy.price, 
            teddy.description,
            teddy._id, 
            teddy);
}  

//Fetches a single productused on product hashes
function callApiForProduct (id) {

    return fetch(`${apiUrl}/${id}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}
