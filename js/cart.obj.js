class CartObject {
    
    get products() {
      
        return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
    }
  
    set products(products) {
      localStorage.setItem('shoppingCart', JSON.stringify(products))
    }
    
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
  
    getProductQuantity(productId) {
      const products = this.products
        if (products[productId]) {
        return products[productId].quantity
        }
        return false;
    }
  
    updateProductQuantity(productId, quantity) {
      let products = this.products
      products[productId].quantity = quantity
      if (quantity == 0) {
        delete products[productId]
        cartArea.removeChild(document.getElementById(productId))
        location.reload()
      }
      console.log(products)
      this.products = products
    }
  
    getTotalPrice() {
      const products = this.products
      const totalPrice = Object.values(products).reduce((acc, curr) => {
        
        return acc + (curr.price * curr.quantity) / 100
      }, 0)
      
      return totalPrice
    }
  }
  
  const Cart = new CartObject();