import { types } from "../types/types";

const initialState = {
    checking: true, // Para saber si esta verificando con la API o ya termino
    //uid: null,
    //name: null,
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload,
            }
        
        case types.authCheckingFinisih:
            return {
                ...state,
                checking: false,
            }

        case types.authLogout:
            return {
                checking: false,
            }
        
        default:
           return state;
    }

}