const section = document.getElementById("object-container");
const productSection = document.getElementById("chosen-product");
const main = document.querySelector("main");
const apiUrl = "http://localhost:3000/api/teddies";
var tab = null;
var cart = [];

window.onload = () => {
    callApi();      
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
            addButtonListenersAdder(tab[i]._id, tab[i].name);
        }
    } else if(String(data)) {
        console.log(data);    
    } else {
        console.log("Failure to load data.");
    } 
}

//Function  to create the article which will fill the dynamic section
function createNewFlexbox (name, url, colors, price, description,id) {
    let article = document.createElement("article");
    //Adding image elements
    article.appendChild(createElementImg(url));
    
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
function createElementPart (type, content, id) {
    //Create basic elements
    let aElement = document.createElement("a");
    let element = document.createElement(type);
    element.textContent = content;

    //Special element creato for differentited buttons
    if (type == "button") {
        element.classList.add("button");

        element.setAttribute("id", id);
        if (id == "cart-button"){
            aElement.setAttribute("href","cart.html");
        } else if (id == "home") {
            aElement.setAttribute("href","index.html");
        } else if (id == content) {
            content = '';
            let color = String(id);
            color = color.toLowerCase();
            for (let i = 0; i < color.length; i++) {
                if(color.charAt(i) == ' ') {
                    var index = i;
                    color = color.substring(index + 1)
                }
            }
            element.setAttribute("class", "color");
            element.setAttribute("style", "background:" + color+';' + "border: "+color +" solid 10px;"+ " padding: 10px");
            element.textContent = '';
        }
    }
    aElement.appendChild(element);
    return aElement;
}

//Function to build image elements
function createElementImg (url) {
    let img = document.createElement("img");
    if (url !== undefined){
        img.setAttribute("src", url);
    } else {
        img.setAttribute("placeholder", "image not found");
    }

    return img;
}

//Function to add events to buttons on index's buttons
function addButtonListenersAdder (id,name) {
    document.getElementById(id).addEventListener('click', ($event) => {
        $event.preventDefault();
        sessionStorage.setItem('productId', id);
        sessionStorage.setItem('productName', name);
        window.location = ("./products.html");
    });          
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
    let colorSpan = document.createElement("span");
    let colorArray = [];
    for (let j = 0; j < colors.length; j++) {
        colorSpan.appendChild(createElementPart("button", colors[j], colors[j]));
        colorArray.push(colors[j]);
    }
    for (let i ; i < colorArray.length; i++) {
        console.log(colorArray[i]);
        addListenerForColorToCartStatus(colorArray[i]);
    }
    //Adds color to the created buttons
    divElement.appendChild(createElementPart("p","Veuillez bien choisir une couleur :"));
    divElement.appendChild(colorSpan);

    //Building the different other product elements
    divElement.appendChild(createElementPart("p", "Description : " + description));
    price /=100; price = price+ '€';
    divElement.appendChild(createElementPart("p", "Prix : " + price));
    divElement.appendChild(createElementPart("button","Ajouter cet article à votre panier",id));
    divElement.appendChild(createElementPart("button","Revenir au menu principal","home"));
    
    article.appendChild(divElement);

    return article;
}

//Adds buttons to the page with a chosen product
function addButtonListenersAdderCart (name, colors, price, description, id) {
    document.getElementById(id).addEventListener('click', ($event) => {
        $event.preventDefault();
        console.log("Reached button on product page");
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
    }); 
}


