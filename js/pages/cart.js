var cartArea = document.getElementById("cart-area");

window.onload = () => {
  var productInCart = localStorage.getItem('productIds');
  var productsdeletor = productInCart;
  var color = null; 
  for (let i = 1; i < (productInCart.length+1); i++) {
      if (productsdeletor.charAt(i) == ',') {
        var index = i;
        color = productsdeletor.substring(0 , index)
        productsdeletor = productsdeletor.substring(index + 1);
        console.log(i);
        i = 0;
    }
    if (i==productInCart.length) {
      color = productsdeletor[i];
    }
    if (color !=null) {
      console.log(productsdeletor);
      console.log("Load an object");
      callApiForProductCart(color).then(teddy => createChosenProductCartAppearence (teddy));   
      if(productsdeletor.length==24) {
        color = productsdeletor;
        console.log("Load an object");
        callApiForProductCart(color).then(teddy => createChosenProductCartAppearence (teddy));
      }
      color= null;
    }
  }
}
//Creates the cart objects
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