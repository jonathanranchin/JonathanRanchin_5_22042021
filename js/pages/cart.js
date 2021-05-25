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
  totalPrice.appendChild(createElementPart("h3", " Prix Total de votre commande : " + Cart.getTotalPrice()+ '.00€'));
  addEventListeners();
}

//Creates the cart objects
function createChosenProductCartAppearence (teddy) {
  if (document.getElementById(teddy._id) == null) {
    if (Cart.getProductQuantity(teddy._id)!=0) {
    quantity = Cart.getProductQuantity(teddy._id);
    if (quantity) {
    cartArea.appendChild(createNewCartItem(
              teddy.name, 
              teddy.imageUrl,  
              teddy.price, 
              teddy._id,
              quantity
    ));
    }
    }
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

  price /= 100;
  divElement.appendChild(createElementPart("p", " Prix : " + price + '.00€'));
  divElement.appendChild(createElementPart("p", " Quantité : " + quantity));
  let selectElement = document.createElement("select");
  divElement.appendChild(selectElement);
  
  for (let j = 0; j < (quantity + 5); j++) {
      var option = document.createElement("option");
      option.value = j;
      option.text = j;
      if (j == quantity) {
        option.setAttribute("selected", quantity);
      }
      selectElement.appendChild(option);  
      if ( j == quantity + 5) {
        j = 0; 
      }
  }
  
  selectElement.addEventListener('change', function() {
    Cart.updateProductQuantity(id, this.value);
    location.reload();
    });

  divElement.appendChild(createElementPart("p", " Référence : " + id));
  
  article.appendChild(divElement);

  return article;
}

//Function to use the POST API parameter
function orderButtonPost() {

  //Creates the elements from the html submit-sheet
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const adress = document.getElementById('adress').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;

  //Creates order we are going to post
  let products = Object.values(Cart.products).map((product) => {
    return product._id
  })
  console.log(products);
 // products = products.toString()
  
  contact = {
    firstName: firstname,
    lastName: lastname,
    address: adress,
    city: city,
    email: email,
  },
  
  console.log(contact)
  
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      contact: contact, //Données de l'utilisateur sous forme d'objet
      products: products, //Tableau des productId
  }),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  fetch(apiUrl + '/order', requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      localStorage.setItem("orderKey",json.orderId);
      localStorage.removeItem('shoppingCart')
      window.location = ("./post-order.html");
    })
    .catch(() => {
      alert(error)
  })
}

function addEventListeners() {
  // Purchase button
  document.getElementById('confirmPurchase').onclick = ($event) => {
    $event.preventDefault();
    orderButtonPost();
  }
}
