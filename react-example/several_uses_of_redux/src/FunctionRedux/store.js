import { createStore, combineReducers, applyMiddleware } from 'redux'
import todoReducer from './todoReducer'
import thunk from 'redux-thunk'

const mainReducer = combineReducers({
  todo: todoReducer,
})

const store = createStore(mainReducer, applyMiddleware(thunk))

export default store