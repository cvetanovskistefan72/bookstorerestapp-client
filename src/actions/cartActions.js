import axios from 'axios'

export const createCart=(cart)=> async dispatch =>{
  
    console.log(cart)
 const res = await axios.post("http://localhost:8080/cart",cart)

  
    
  
   
}


export const getCartByStatus=(user)=> async dispatch =>{
  
    
    const res = await axios.get("http://localhost:8080/cart/status/"+user)
   
    dispatch({
        type:"GET_CART_BY_STATUS",
        payload:res.data
    })
       
     
      
   } 

   export const addBookToCart=(book)=> async dispatch =>{
  
    
    dispatch({
        type:"BOOKS_IN_CART",
        payload:book
    })
    
   }
   export const deleteBookFromCart=(bookId)=> async dispatch =>{
  
    
  dispatch({
      type:"DELETE_BOOK_IN_CART",
      payload:bookId
  })
  
 }

   export const  setBooksZero=()=> async dispatch =>{
  
    
  dispatch({
      type:"BOOKS_IN_CART_ZERO" 
  })
  
 }