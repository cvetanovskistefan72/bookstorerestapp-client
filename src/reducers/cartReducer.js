



const initialState= {
      
   cart:[],
   booksInCart:[]
     
}


export default function(state = initialState,action){
   switch(action.type){
      
        case "GET_CART_BY_STATUS":
            return{
                ...state,
                cart:action.payload
            }
            case "BOOKS_IN_CART_ZERO":
            return{
                ...state,
                booksInCart:[]
            }
            case "DELETE_BOOK_IN_CART":
            return{
                ...state,
                booksInCart:state.booksInCart.filter((book)=>{
                    return book.id != action.payload
                })
            }
            case "BOOKS_IN_CART":
            return{
                ...state,
                booksInCart:[...state.booksInCart,action.payload]
            }
     
       default:
           return state;
   }
}