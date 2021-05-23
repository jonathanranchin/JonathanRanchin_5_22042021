var cartArea = document.getElementById("cart-area");
let quantity;
var totalPrice = document.getElementById("total-price");

window.onload = () => {
  console.log(Cart);
  var productInCart = localStorage.getItem('productIds');
  var productsdeletor = productInCart;
  var idval = null;

  if(productInCart == null) {
    console.log("Vous n'avez pas encore selectionné d'article");
    cartArea.appendChild(createElementPart("h3", "Vous n'avez pas encore selectionné d'article!"));
  } else {
    for (let i = 1; i < (productInCart.length + 1); i++) {
      if (productsdeletor.charAt(i) == ',') {
        var index = i;
        idval = productsdeletor.substring(0 , index)
        productsdeletor = productsdeletor.substring(index + 1);
        i = 0;
        }
      if (idval != null) {
        callApiForProductCart(idval).then(teddy => createChosenProductCartAppearence (teddy));  
        if (productsdeletor.length == 24) {
          idval = productsdeletor;
          callApiForProductCart(idval).then(teddy => createChosenProductCartAppearence (teddy));                              
        }
      idval= null;
    }
  }
  }
  totalPrice.appendChild(createElementPart("h3", " Prix Total de votre commande : " + Cart.getTotalPrice()+ "€"));
}

//Creates the cart objects
function createChosenProductCartAppearence (teddy) {
  if (document.getElementById(teddy._id) == null) {
    quantity = Cart.getProductQuantity(teddy._id);
    cartArea.appendChild(createNewCartItem(
              teddy.name, 
              teddy.imageUrl,  
              teddy.price, 
              teddy._id,
              quantity
    ));
    //  addButtonListenersCartItems(teddy.name, teddy.price, teddy._id);
  } 
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

//This function creates the different cart elements
function createNewCartItem(name, imageUrl, price, id, quantity) {
  //Building the core elements for the cart product
  let article = document.createElement("article");
  article.setAttribute("id", id);
  let divElement = document.createElement("span");
  divElement.setAttribute("id", "span");
  article.appendChild(createElementImg(imageUrl)); 
  divElement.appendChild(createElementPart("h3", name+' '));

  price /=100; price = price+ '€ ';
  divElement.appendChild(createElementPart("p", " Prix : " + price));
  divElement.appendChild(createElementPart("p"," Quantité : " + quantity));
  divElement.appendChild(createElementPart("p", " Référence : " + id));
  
  article.appendChild(divElement);

  return article;
}

