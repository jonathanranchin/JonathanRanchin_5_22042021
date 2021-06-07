//Onload to process the data we need to give to the user
window.onload = () => {
    var orderRecap = localStorage.getItem('orderKey');
    window.location.hash = orderRecap;
    if (false !== document.getElementsByClassName("article")) {
        orderRecapSectionCreator(orderRecap, sessionStorage.getItem("TotalPrice"));
    }
};

//Gives the id and total price of the order dynamically 
function orderRecapSectionCreator(orderRecap, orderPrice) {
    let article = document.createElement("article");
    article.appendChild(createElementPart("p", "L'identifiant de votre commande : " + orderRecap));
    article.appendChild(createElementPart("p", "Le prix total de votre commande est : " + orderPrice +'€'));
    document.getElementById("order-recap").appendChild(article);
}