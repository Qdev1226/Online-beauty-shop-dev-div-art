import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user.js'
import categories from './categories.js'
import design from './design.js'
import products from './products.js'
import services from './services.js'
import cart from './cart.js'
import search from './search.js'
import schedule_cart from './schedule_cart.js'

const reducer = combineReducers({
    routing: routerReducer,
    user,
    categories,
    design,
    products,
    services,
    cart,
    search,
    schedule_cart
})

export default reducer