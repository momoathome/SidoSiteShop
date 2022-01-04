const cartButtonRemove = document.getElementsByClassName('btn-remove')
const cartQuantityInput = document.getElementsByClassName('cart-quantity-input')
const cartButtonAdd = document.getElementsByClassName('shop-item-button')
const shopItems = document.querySelector('.shop-items')
const tickets = document.querySelector('.ticket-section')
document.querySelector('.btn-purchase').addEventListener('click', purchasedClicked)
document.querySelector('.btn-merch').addEventListener('click', showMerch)
document.querySelector('.btn-ticket').addEventListener('click', showTicket)
showMerch()

function showMerch() {
  tickets.style.display = 'none'
  shopItems.style.display = null
}

function showTicket() {
  shopItems.style.display = 'none'
  tickets.style.display = null
}

for (const e of cartButtonRemove) {
  e.addEventListener('click', event => event.target.parentElement.remove())
}
for (const e of cartQuantityInput) {
  e.addEventListener('change', quantityChange)
}
for (const e of cartButtonAdd) {
  e.addEventListener('click', addToCartClicked)
}

function purchasedClicked() {
  alert('Thank you for the purchase')
  let cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0]
  const cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0
  for (const e of cartRows) {
    let priceElement = e.getElementsByClassName('cart-price')[0]
    let quantityElement = e.getElementsByClassName('cart-quantity-input')[0]
    let price = parseFloat(priceElement.innerText.replace(',', '.'))
    let quantity = quantityElement.value
    total = total + price * quantity
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText =
    total.toString().replace('.', ',') + '€'
}

function quantityChange(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  const shopItem = event.target.parentElement.parentElement
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  const imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div')
  cartRow.className = 'cart-row'

  // check if Item already exists, if so increase by one
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const check = cartItems.getElementsByClassName('cart-item-title')
  for (const e of check) {
    if (e.innerText == title) {
      let cartQuantity = e.parentElement.parentElement
      let currentValue = cartQuantity.getElementsByClassName('cart-quantity-input')[0]
      let newValue = parseFloat(currentValue.value) + 1
      currentValue.value = newValue
      return
    }
  }

  const cartRowContent = `
        <div class="cart-item cart-column">
            <div class="cart-item-title">${title}</div>
            <img class="cart-item-img" src="${imageSrc}" />
        </div>

        <div class="cart-value">
        <span class="cart-price">${price}</span>
        <span class="cart-quantity">
            <input class="cart-quantity-input" type="number" value="1" /></span>
        </div>
        <button class="btn-remove" role="button">ENTFERNEN</button>
        `

  cartRow.innerHTML = cartRowContent
  cartItems.append(cartRow)
  cartRow
    .getElementsByClassName('btn-remove')[0]
    .addEventListener('click', event => event.target.parentElement.remove())
  cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', quantityChange)
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChange)
}
