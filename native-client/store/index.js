import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loading from './user'

const reducer = combineReducers({ loading })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

// const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined
// const store = createStore(reducer, initialState, middleware);

// Save the current store state to localStorage whenever it changes.
// store.subscribe(() => {
//   localStorage.state = JSON.stringify(store.getState())
// });

const store = createStore(reducer, middleware)
