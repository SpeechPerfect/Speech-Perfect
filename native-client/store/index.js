import { createStore, combineReducers, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loading from './loading-redux'
import url from './url-redux'
import speech from './speech-redux'
import user from './user-redux'

const reducer = combineReducers({ loading, url, speech, user })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

// const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined
// const store = createStore(reducer, initialState, middleware)

// Save the current store state to localStorage whenever it changes.
// store.subscribe(() => {
//   localStorage.state = JSON.stringify(store.getState())
// });

export default store = createStore(reducer, middleware)

export * from './loading-redux'
export * from './url-redux'
export * from './speech-redux'
export * from './user-redux'

