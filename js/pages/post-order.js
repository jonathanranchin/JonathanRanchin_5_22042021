//Onload to process the data we need to give to the user
var orderRecapSection = document.getElementById("order-recap"); 
window.onload = () => {
    var orderRecap = localStorage.getItem('orderKey');
    var orderPrice = sessionStorage.getItem("TotalPrice");
    window.location.hash = orderRecap;
    console.log(orderRecap);
    console.log(orderPrice);
    if (document.getElementsByClassName("article")!=false) {
    orderRecapSectionCreator(orderRecap, orderPrice);
    }
}

//Gives the id and total price of the order dynamically 
function orderRecapSectionCreator(orderRecap, orderPrice) {
    let article = document.createElement("article");
    article.appendChild(createElementPart("p", "L'identifiant de votre commande : " + orderRecap));
    article.appendChild(createElementPart("p", "Le prix total de votre commande est : " + orderPrice +'€'));
    orderRecapSection.appendChild(article);
}