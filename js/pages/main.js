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

// Function to take the Json element and breaks them into single enteties
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
                tab[i].description,
                tab[i]._id
            ));
        }
    } else {
        console.log("fail at 2");
    } 
}

//Function  to create the article which will fill the dynamic section
function createNewFlexbox(name, url, colors, price, description,id) {
    let article = document.createElement("a");

    //Adding image elements
    article.appendChild(createElementImg(url))
    //Adding the unique index to each product article
    article.setAttribute("id", id);
    article.setAttribute("href", '#');
    //Adding text elements
    article.appendChild(createElementPart("h3", name));
    article.appendChild(createElementPart("p", colors));
    article.appendChild(createElementPart("p", description));
    article.appendChild(createElementPart("p", price));
    
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