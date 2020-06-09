import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import bookreducer from './bookReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'

 



export default combineReducers({
    errors:errorReducer,
    books:bookreducer,
    user:userReducer,
    cart: cartReducer
   
})