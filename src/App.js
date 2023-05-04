import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const updatedQuantity = each.quantity - 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartItems = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredCartItems})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
