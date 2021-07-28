import { startLogin } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true, // Para saber si esta verificando con la API o ya termino
    //uid: null,
    //name: null,
}

describe('Pruebas en authReducer', () => {
    
    test('debe retornar el estado por defecto', () => {
        
        const action = {};
        const state = authReducer( initialState, action );
        expect( state ).toEqual( initialState );

    })

    test('debe autenticar al usuario', async () => {
        
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Martin',
            },
        }

        const state = authReducer( initialState, action );

        expect( state ).toEqual( { checking: false, uid: '123', name: 'Martin' } );

    })
    
    
})
