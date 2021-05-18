window.onload = () => {
    var productId = sessionStorage.getItem('productId');
    var productName = sessionStorage.getItem('productName');
    let url = window.location.href;
    productName = productName.toLowerCase();
    window.location.hash = '/teddies/' + productName + '/' + productId;
    
    callApiForProduct(productId).then(teddy => createChosenProductPageElements (teddy));
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
            teddy._id);
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
