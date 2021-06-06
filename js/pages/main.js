//DOM needed sections references and variables (global)
const section = document.getElementById("object-container");
const productSection = document.getElementById("chosen-product");
const main = document.querySelector("main");
const apiUrl = "http://localhost:3000/api/teddies";
var tab = null;
var cart = [];

//Loads the page
window.onload = () => {
    callApi();      
}

//This calls the API to get the data to populate the page
function callApi () {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            objectCreator(data);
        }
    );
}

// Function which takes the Json element and breaks them into single enteties
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
    } else if (String(data)) {
        console.log(data);    
    } else {
        console.log("Failure to load data.");
    } 
}

//Function  to create the article which will fill the dynamic sections they need
function createNewFlexbox (name, url, colors, price, description,id) {
    let article = document.createElement("article");
    //Adding image elements
    article.appendChild(createElementImg(url));
    
    //Adding text elements
    price /= 100;
    article.appendChild(createElementPart("h3", name));

    article.appendChild(createElementPart("button", "Voir les détails", id));

    return article;
}

//Function to build text elements
function createElementPart (type, content, id) {
    //Create basic elements
    
    let element = document.createElement(type);
    element.textContent = content;

    //Special element creato for differentited buttons
    if (type == "button") {
        let aElement = document.createElement("a");
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
        aElement.appendChild(element);
        return aElement;
    }
    return element;
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


