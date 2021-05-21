var cartArea = document.getElementById("cart-area");
var totalCost = 0;
let map = new Map();  
console.log(map);
let mapnumber = 0;
window.onload = () => {
  
var productInCart = localStorage.getItem('productIds');
var productsdeletor = productInCart;
var color = null;

  if(productInCart == null) {
    console.log("Vous n'avez pas encore selectionné d'article");
    cartArea.appendChild(createElementPart("h3", "Vous n'avez pas encore selectionné d'article!"));
  } else {
    for (let i = 1; i < (productInCart.length+1); i++) {
      if (productsdeletor.charAt(i) == ',') {
        var index = i;
        color = productsdeletor.substring(0 , index)
        productsdeletor = productsdeletor.substring(index + 1);
        i = 0;
        }
      if (i == productInCart.length) {
        color = productsdeletor[i];
        
      }
      if (color != null) {
        callApiForProductCart(color).then(teddy => createChosenProductCartAppearence (teddy));   
        if (productsdeletor.length == 24) {
          callApiForProductCart(color).then(teddy => createChosenProductCartAppearence (teddy));                              
        }
      color= null;
    }
  }
  }
}

//sets the quantity not fully built
function quantityParameter(map, color) {
  map.set(color, mapnumber)
        mapnumber++;
        console.log(mapnumber+'D');
}
let quantity;
//Creates the cart objects
function createChosenProductCartAppearence (teddy) {
  //  if(document.getElementById(teddy._id) == null) {
    quantity = 1;
    cartArea.appendChild(createNewCartItem(
              teddy.name, 
              teddy.imageUrl,  
              teddy.price, 
              teddy._id,
              quantity
    ));
    //  addButtonListenersCartItems(teddy.name, teddy.price, teddy._id);
      // } 
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

function addButtonListenersCartItems (name, price, id) {
  document.getElementById(id).addEventListener('click', ($event) => {
      $event.preventDefault();
      console.log("Reached button on cart page");
      localStorage.clear();
      /*
      if(localStorage.getItem('productIds')!=null){
          cart.push(localStorage.getItem('productIds'));
      }
      cart.push(id);
      localStorage.setItem('productIds', cart);
      localStorage.setItem('productNames', name);
      console.log(cart);
      if (!document.getElementById("cart-button")){
          let divElement = document.getElementById("span");
          divElement.appendChild(createElementPart("button", "Aller au Panier", "cart-button"));
      } 
      */
  }); 
}

function createNewCartItem(name, imageUrl, price, id, quantity) {
  //Building the core elements for the chosen product
  let article = document.createElement("article");
  article.setAttribute("id", imageUrl);
  let divElement = document.createElement("span");
  divElement.setAttribute("id", "span");
  article.appendChild(createElementImg(imageUrl)); 
  divElement.appendChild(createElementPart("h3", name+' '));
  

  //Building the different other product elements
  price /=100; price = price+ '€ ';
  divElement.appendChild(createElementPart("p", " Prix : " + price));
  divElement.appendChild(createElementPart("p"," Quantité : " + quantity));
  divElement.appendChild(createElementPart("p", " Référence : " + id));
  
  article.appendChild(divElement);

  return article;
}