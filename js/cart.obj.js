//Cart object which the user will add to and delete at his convinience
class CartObject {
    
    //Simple getter and setter
    get products() {
      
        return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
    }
    
    set products(products) {
      localStorage.setItem('shoppingCart', JSON.stringify(products))
    }
    
    //Modifier to add things to the cart
    addProduct(productObject) {
      let products = this.products
  
      const productAlreadyInCarte = !!products[productObject._id]
  
      if (productAlreadyInCarte) {
        // Increases the quantity of a product that's already there
        products[productObject._id].quantity++
      } else {
        // Adds a product
        products[productObject._id] = {
          quantity: 1,
          ...productObject,
        }
      }
  
      this.products = products
    }
    
    //Function to get teh quantity of a product with its id
    getProductQuantity(productId) {
      const products = this.products
        if (products[productId]) {
        return products[productId].quantity
        }
        return false;
    }
    
    //Function to update quantity dynamically
    updateProductQuantity(productId, quantity) {
      let products = this.products
      products[productId].quantity = quantity
      if (quantity == 0) {
        delete products[productId]
        cartArea.removeChild(document.getElementById(productId))
        location.reload()
      }
      this.products = products
    }
    
    //Function to find the total cart price
    getTotalPrice() {
      const products = this.products
      const totalPrice = Object.values(products).reduce((acc, curr) => {
        
        return acc + (curr.price * curr.quantity) / 100
      }, 0)
      
      return totalPrice
    }
  }
  
  //The cart object we will be using
  const Cart = new CartObject();