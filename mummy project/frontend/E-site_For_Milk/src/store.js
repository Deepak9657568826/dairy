import { applyMiddleware, createStore } from 'redux'
import {thunk} from 'redux-thunk'
import { loginReducer } from './redux/reducer'


export const store = createStore( loginReducer,   applyMiddleware(thunk))


