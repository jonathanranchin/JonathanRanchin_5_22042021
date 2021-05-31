//DOM needed sections references
var cartArea = document.getElementById("cart-area");
let quantity;
var totalPrice = document.getElementById("total-price");

//Dynamic page onload
window.onload = () => {
  console.log(Cart);
  var productInCart = localStorage.getItem('productIds');
  var productsdeletor = productInCart;
  var idval = null;

  //Fills the cart page with carted objects or tells the user that the cart is still empty  
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

//Function which calls others to create the cart objects
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

//This function creates the different cart elements and gives them the listeners they will need
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
  
  //Adds quantities closer to the one chosen, to a drag down menu
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
  
  //updates the page if the quantity of a product is changed
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

  //Minimal checks to see if the fields have been filled
  if (!(
    firstname.length > 1
    && lastname.length > 1
    && validateEmail(email)==true
    && adress.length > 6
    && city.length > 1
  )) {
    alert("Veuillez remplir les champs correctements avant de procéder au paiement")

    return
  }

  //Standard function to check if the given email address is a valid address
  function validateEmail(value) {
    var input = document.createElement('input');
  
    input.type = 'email';
    input.required = true;
    input.value = value;
  
    return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(value);
  }

  //Creates order we are going to post
  let products = Object.values(Cart.products).map((product) => {
    return product._id
  })

  //Checks if there are products in the cart before going onto the post-order page
  console.log(products);
  if (products.length==0) {

    alert("Veuillez ajouter des produits avant de procéder au paiement")

    return
  }

  contact = {
    firstName: firstname,
    lastName: lastname,
    address: adress,
    city: city,
    email: email,
  },
  
  console.log(contact);

  //Post the contact object and the products array to the API
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      contact: contact, //User information
      products: products, //Object containing all the productIds from the order
  }),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  fetch(apiUrl + '/order', requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      sessionStorage.setItem("TotalPrice", Cart.getTotalPrice())
      localStorage.setItem("orderKey",json.orderId);
      localStorage.removeItem('shoppingCart');
      localStorage.removeItem('productIds');
      window.location = ("./post-order.html");
    })
    .catch(() => {
      alert(error)
  })
}

//Adds the event listener to allow the order function to be launched
function addEventListeners() {
  // Purchase button
  document.getElementById('confirmPurchase').onclick = ($event) => {
    $event.preventDefault();
    orderButtonPost();
  }
}
