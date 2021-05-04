const myList= document.createElement("section");
const section = document.getElementById("object-container");
const main = document.querySelector("main");
window.onload = () => {
    callApi();
}
function callApi () {
    fetch('http://localhost:3000/api/teddies')
        .then(response => response.json())
        .then(data => {
            objectCreator(data);
        }
    );
}

//Comentary for this function
function objectCreator (data) {
    console.log("Function");
    if (Array.isArray(data)) {
        console.log("sucess1");
        var tab = Array.from(data);
        console.log("pass");
        for (var i = 0; i < tab.length; i++) {
            console.log("success2");
            section.appendChild(createNewFlexbox(
                tab[i].name, 
                tab[i].imageUrl, 
                tab[i].colors, 
                tab[i].price, 
                tab[i].description
            ));
        }
    } else {
        console.log("fail at 2");
    } 
}

//Comentary for this function
function createNewFlexbox(name, url, colors, price, description) {
    let article = document.createElement("article");

    //Adding text elements
    article.appendChild(createElementPart("h3", name));
    article.appendChild(createElementPart("p", colors));
    article.appendChild(createElementPart("p", description));
    article.appendChild(createElementPart("p", price));

    //Adding image element
    article.appendChild(createElementImg(url))

    return article;
}

//Function to build text elements
function createElementPart(type, content) {
    let element = document.createElement(type);
    element.textContent = content;

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