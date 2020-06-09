



const initialState= {
      
     userInfo:"",
      
}


export default function(state = initialState,action){
    switch(action.type){
       
            
        case "USER_INFO":
            return{
             
                userInfo:action.payload
            }
         

        default:
            return state;
    }
}