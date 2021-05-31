//Onload to process the data we need to give to the user
var orderRecapSection = document.getElementById("order-recap"); 
window.onload = () => {
    var orderRecap = localStorage.getItem('orderKey');
    window.location.hash = orderRecap;
    console.log(orderRecap);
    if (document.getElementsByClassName("article")!=false) {
    orderRecapSectionCreator(orderRecap);
    }
}

//Gives the id of the order dynamically 
function orderRecapSectionCreator(orderRecap) {
    let article = document.createElement("article");
    article.appendChild(createElementPart("p", "L'identifiant de votre commande : " + orderRecap));
    orderRecapSection.appendChild(article);
}