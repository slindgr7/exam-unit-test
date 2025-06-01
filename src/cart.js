import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002


function getCartItemCount() {
  return cart.length
}

// getItem's index utgår från cart-listan – hämtar objekt på angiven plats i arrayen
function getItem(index) {
  return cart[index]
}

// Från cart går den igenom varje objekt, tar price × amount och lägger det till total
function getTotalCartValue() {
  return cart.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.amount
  }, 0)
}

//idCounter startar på 2002 men behöver ökas för varje produkt som läggs till. 
function addToCart(newItem) {
	
  if (!isProduct(newItem)) {
    throw new Error("Ogiltig produkt")
  }

  const existingItem = cart.find(ci => ci.item.id === newItem.id)
  
  if (existingItem) {
    existingItem.amount++
  } else {
    const cartItem = { id: idCounter, amount: 1, item: newItem }
    idCounter++
    cart.push(cartItem)
  }
}

function removeFromCart(itemId) {
  const initialLength = cart.length

  cart = cart.filter(item => item.id !== itemId)

  if (cart.length === initialLength) {
    throw new Error("Produkten finns inte i kundkorgen")
  }
}

// måste leta upp rätt produkt i varukogen, uppdaterar mängden på produkt till nya värdet/ ändra antalet
function editCart(itemId, newValues) {

  const item = cart.find(i => i.id === itemId)

  if (!item) throw new Error("Produkt hittades inte")
  if (typeof newValues.amount !== 'number') {
    throw new Error("Ogiltigt antal")
  }

  item.amount = newValues.amount
}

function clearCart() {
  cart = []
  idCounter = 2002
}

export {getCartItemCount, getItem, getTotalCartValue, addToCart, removeFromCart, editCart, clearCart}



