import axios from 'axios'

export const logOut=(history)=> async dispatch =>{
         console.log(history)
        dispatch({
            type:"USER_INFO",
            payload:""
        })
         
   
}
export const updateStatus=(user,history,status)=> async dispatch =>{
  
    
        const res = await axios.post("http://localhost:8080/users/"+user+"/"+status)
      
       
}
export const createUser=(user,history)=> async dispatch =>{
  
    try {
        const res = await axios.post("http://localhost:8080/users",user)
        history.push("/signIn")
         
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

export const getUser=(username,history)=> async dispatch =>{
     
        try {
            const res = await axios.post("http://localhost:8080/users/api",username)
             
             
            dispatch({
                type:"USER_INFO",
                payload:res.data
            })
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
     
 