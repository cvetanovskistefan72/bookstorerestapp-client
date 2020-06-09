



const initialState= {
    booksList:[],
    categoriesList:[] 
}


export default function(state = initialState,action){
    switch(action.type){

        case "GET_BOOKS":
            
           return{
               ...state,
               booksList: action.books
           } 

         

           case "GET_CATEGORIES":
            
           return{
               ...state,
               categoriesList: action.categories
           } 

           case "DELETE_BOOK":
               return{
                   ...state,
                   booksList:  state.booksList.filter((book)=>{
                       return book.id != action.payload
                })
               }

        default:
            return state;
    }
}