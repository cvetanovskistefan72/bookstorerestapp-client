import axios from 'axios'


export const getBooks = (i) =>async dispatch=>{
    

    let result= await axios.get("http://localhost:8080/api/books?page="+i+"&size=3")
   
  
    dispatch({
        type:"GET_BOOKS",
        books: result.data._embedded.books
    })
}


export const getCategories = () => async dispatch =>{

    const result  = await axios.get("http://localhost:8080/categories")
    console.log("test")
      
    dispatch({
        type:"GET_CATEGORIES",
        categories: result.data 
    })
}


export const createBook = (book,prop) => async dispatch =>{

try {
    const res = await axios.post("http://localhost:8080/books",book)
   prop.history.push("/")
 
    dispatch({
        
        type:"GET_ERRORS_CREATE",
        payload:{}
        
        
    })
    
} catch (error) {
    dispatch({
        
        type:"GET_ERRORS_CREATE",
        payload:error.response.data
        
    })
}

 
 
}

export const deleteBook = (bookId)=>async disaptch=>{
    
    const res = await axios.delete("http://localhost:8080/books/"+bookId)

    disaptch({
        type:"DELETE_BOOK",
        payload:bookId
    })
}


export const updateBook = (book,history) => async dispatch =>{

    try {
        const res = await axios.post("http://localhost:8080/books",book)
        history.push("/")
        dispatch({
            
            type:"GET_ERRORS_CREATE",
            payload:{}
            
        })
        
    } catch (error) {
        dispatch({
            
            type:"GET_ERRORS_CREATE",
            payload:error.response.data
            
        })
    }
}

 
 

 