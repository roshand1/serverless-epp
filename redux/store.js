import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// let finalCreateStore = compose(
//   applyMiddleware(logger(),thunk)
// )(createStore)

const middleware =  applyMiddleware(thunk, logger())

const store = createStore(reducer, middleware)
console.log(store);
export default store;

// export default function configureStore(initialState = { todos: [] }) {
//   return finalCreateStore(reducer, middleware)
// }

