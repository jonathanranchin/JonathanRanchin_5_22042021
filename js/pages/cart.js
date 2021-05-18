var cartArea = document.getElementById("cart-area");

window.onload = () => {
  var productInCart = localStorage.getItem('productIds');
  var productsdeletor = productInCart;
  //console.log(productsdeletor);
  var color = null;
  for (let i = 0; i < productInCart.length; i++) {
    if(productsdeletor!= null) {
    if (productsdeletor.charAt(i) == ',') {
        var index = i;
        color = productsdeletor.substring(0 , index)
        productsdeletor = productsdeletor.substring(index + 1);
        //console.log(color);
        //console.log(productsdeletor);
        i = 0;
    }
    if(productsdeletor.length=== 24) {
      color = productsdeletor;
      productsdeletor = null;
      console.log("launched recovery");
    }
    console.log(color);
    //console.log(productsdeletor);
    if(color !=null) {
      console.log("Load an object");
      callApiForProductCart(color).then(teddy => createChosenProductCartAppearence (teddy));   
      color= null;

    }
  }
}
  //productInCart.forEach(element => callApiForProductCart(element));  
  console.log(productInCart);
  console.log(typeof(productInCart[1]));
  //callApiForProductCart().then(teddy => createChosenProductCartAppearence (teddy));
}
function createChosenProductCartAppearence (teddy) {
  cartArea.appendChild(createNewPage(
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

//Fetches a single product used for products in the cart
function callApiForProductCart (id) {

  return fetch(`${apiUrl}/${id}`)
  .catch((error) => {
    console.log(error)
  })
  .then((httpBodyResponse) => httpBodyResponse.json())
  .then((productData) => productData)
}