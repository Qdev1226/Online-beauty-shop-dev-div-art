import { createStore, applyMiddleware } from 'redux'
import reducer from 'reducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

export const history = createHistory()
const middleware = routerMiddleware(history)

const initialState = {}

export default createStore(reducer, initialState, applyMiddleware(middleware, thunk))