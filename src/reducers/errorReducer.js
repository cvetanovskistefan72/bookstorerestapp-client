
const initialState = {
  errors:{}
    
}



export default function(state = initialState,action){
    switch(action.type){

        case "GET_ERRORS_CREATE":
            return {
                errors:action.payload
            }
        default:
            return state;
    }
}
