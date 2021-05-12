import Router from "./cart";
const router = new Router({  
    mode: history,
    root: './index.html'
});
    rooter.add('','11');
    console.log(flush(router));

const section = document.getElementById("object-container");
const productSection = document.getElementById("chosen-product");
const main = document.querySelector("main");
const apiUrl = "http://localhost:3000/api/teddies";
var tab = null;
var cart = [];

window.onload = () => {
    callApi();    
    setUpStorage(cart);
    objectCreator (useApi(null, "GET", apiUrl, null));
    objectCreator (useApi("5be9c8541c9d440000665243", "GET", apiUrl, '/'));
}


function callApi () {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            objectCreator(data);
        }
    );
}

// Function to take the Json element and breaks them into single enteties
function objectCreator (data) {
    if (Array.isArray(data)) {
        tab = Array.from(data);
        for (var i = 0; i < tab.length; i++) {
            section.appendChild(createNewFlexbox(
                tab[i].name, 
                tab[i].imageUrl, 
                tab[i].colors[0], 
                tab[i].price, 
                tab[i].description,
                tab[i]._id
            ));
            addButtonListenersAdder(tab[i]._id);
        }
    } else if(String(data)) {
        console.log(data);    
    } else {
        console.log("Failure to load data.");
    } 
}

//Function  to create the article which will fill the dynamic section
function createNewFlexbox(name, url, colors, price, description,id) {
    let article = document.createElement("article");
    //Adding image elements
    article.appendChild(createElementImg(url))
    
    //Adding text elements
    price /= 100;
    article.appendChild(createElementPart("h3", name));
    article.appendChild(createElementPart("p", colors));
    article.appendChild(createElementPart("p", description));
    article.appendChild(createElementPart("p", price));

    article.appendChild(createElementPart("button", "Voir les détails", id));

    return article;
}

//Function to build text elements
function createElementPart(type, content, id) {
    let element = document.createElement(type);
    element.textContent = content;
    if(type == "button") {
        element.classList.add("button");
        element.setAttribute("id", id);
        if(id=="cart-button"){
            element.setAttribute("href","cart.html");
        } else if (id=="home") {
            element.setAttribute("href","index.html");
        }
    }
    
    return element;
}

//Function to build image elements
function createElementImg(url) {
    let img = document.createElement("img");
    if (url !== undefined){
        img.setAttribute("src", url);
    } else {
        img.setAttribute("placeholder", "image not found");
    }

    return img;
}

//Function to add events to buttons on index's buttons
function addButtonListenersAdder(id) {
    document.getElementById(id).addEventListener('click', ($event) => {
        $event.preventDefault();
        //Create New Page Dynamically
        //window.location ... product/name/id ( name lower / utf16)
        // If product onload -> récup id spawn page (par 'router')
        window.location.replace("file:///C:/Users/abac/Documents/GitHub/JonathanRanchin_5_22042021/products.html"); 
        //var idString = String(id);
        //window.location.hash = idString;  
        document.getElementById("object-container")
            .classList
            .add("disappear");
        callApiForProduct(id).then(teddy => createChosenProductPageElements (teddy));
    });          
}

//Creates a section for a chosen product
function createChosenProductPageElements (teddy) {
    
    document.getElementById(teddy._id).removeAttribute("id",teddy._id);
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

//Adds things to a chosen product's section
function createNewPage(name,imageUrl,colors,price,description,id) {
    let article = document.createElement("article");
    let divElement = document.createElement("span");
    divElement.setAttribute("id", "span");
    
    article.appendChild(createElementImg(imageUrl)); 
    divElement.appendChild(createElementPart("h3", name));
    divElement.appendChild(createElementPart("p", colors));
    divElement.appendChild(createElementPart("p", description));
    price /=100; price = price+ '€';
    divElement.appendChild(createElementPart("p", price));
    divElement.appendChild(createElementPart("button","Ajouter cet article à votre panier",id));
    divElement.appendChild(createElementPart("button","Revenir au menu principal","home"));
    
    article.appendChild(divElement);

    return article;
}
//
function addButtonListenersAdderCart(name,colors,price,description,id) {
    document.getElementById(id).addEventListener('click', ($event) => {
        $event.preventDefault();
        cart.push(name,price);
        
        //cart = myStorage;
        console.log(cart);
        if (!document.getElementById("cart-button")){
            let divElement = document.getElementById("span");
            divElement.appendChild(createElementPart("button","Aller au Panier","cart-button"));
        } 
    }); 
}

//Fetches a single product
function callApiForProduct (id) {

    return fetch(`${apiUrl}/${id}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}

//sets up the local storage necessary to store the products
function setUpStorage(cart) {
    cart = window.localStorage;
    var cartValue = 0;
    localStorage.setItem('cartValueKey', cartValue);
}


function makeRequest(verb, url, data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(verb, url);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 200 || request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };
      if (verb === 'POST') {
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
      } else {
        request.send();
      }
    });
  }
    
    

  async function useApi(id,verb, url, car) {
        if (verb==="GET") {
            if (car ==='/' && id!=null) {
                let getOne = makeRequest('GET', url + '/'+id);
                getOne
                console.log(getOne);
                return getOne.then(token => { console.log(token) } )
            } else {
                let getAll = makeRequest('GET', url + '/');
                console.log(getAll);
                const getAllResponse = await getAll;
                return getAllResponse;
        }
        }
    
    
    /*
    const [uidResponse, titleResponse, loremResponse] = await Promise.all([uidPromise, titlePromise, loremPromise]);  
    
    const postPromise = makeRequest('POST', api + "/create-post-with-uid", {
      uid: uidResponse.uid,
      title: titleResponse.title,
      content: loremResponse.lorem
    });
    const postResponse = await postPromise;
    
    postTitle.textContent = postResponse.post.title;
    postId.textContent = postResponse.post.id;
    postContent.textContent = postResponse.post.content;
    */
  }
  
  //generateButton.addEventListener("click", () => {
  //    createPost();
  // });