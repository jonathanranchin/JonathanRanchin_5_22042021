const myList= document.createElement("section");
const section = document.getElementById("object-container");
const main = document.querySelector("main");

window.onload = () => {
    callApi();    
    setUpStorage();
}

function callApi () {
    fetch('http://localhost:3000/api/teddies')
        .then(response => response.json())
        .then(data => {
            objectCreator(data);
        }
    );
}

// Function to take the Json element and breaks them into single enteties
function objectCreator (data) {
    if (Array.isArray(data)) {
        var tab = Array.from(data);
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
    } else {
        console.log("Failure to load data.");
    } 
}

//Function  to create the article which will fill the dynamic section
function createNewFlexbox(name, url, colors, price, description,id) {
    let article = document.createElement("article");
    //Adding image elements
    article.appendChild(createElementImg(url))
    //Adding the unique index to each product article
    let pageLink = String(id)+".html";
    article.setAttribute("href", pageLink);
    //Adding text elements
    price /= 100;
    article.appendChild(createElementPart("h3", name));
    article.appendChild(createElementPart("p", colors));
    article.appendChild(createElementPart("p", description));
    article.appendChild(createElementPart("p", price));

    article.appendChild(createElementPart("button","Commander",id));

    return article;
}

//Function to build text elements
function createElementPart(type, content,id) {
    let element = document.createElement(type);
    element.textContent = content;
    if(type=="button") {
        element.classList.add("button");
        element.setAttribute("id", id);
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

function addButtonListenersAdder(id) {
    document.getElementById(id).addEventListener('click', ($event) => {
        $event.preventDefault();
        productWindowOpen(id)   
      });        
}

function productWindowOpen(id) {
    let pageName =  "product.html"+id;
    window.open(pageName);
}

function setUpStorage() {
    myStorage = window.sessionStorage;
    var cartValue = 0;
    sessionStorage.setItem('cartValueKey', cartValue);
}

function order() {
    Window.open();
    Window.close();
}