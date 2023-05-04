import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalPrice = 0
      cartList.forEach(eachCartItem => {
        totalPrice += eachCartItem.price * eachCartItem.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="order-total">
            Order Total: <span className="total-price"> Rs {totalPrice} </span>
          </h1>
          <p className="no-of-cart-items"> {cartList.length} items in cart </p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
