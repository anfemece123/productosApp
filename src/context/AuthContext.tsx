import React, { createContext, useReducer} from 'react';
import { LoginData, LoginResponse, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps={
    errorMessage: string;
    token:string| null;
    user:Usuario| null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp:()=>void;
    singIn:(loginData: LoginData)=>void;
    logout:()=>void;
    removeError:()=>void;

}

const authInicialState : AuthState ={
    status:'checking',
    token:null,
    user:null,
    errorMessage:''
}

export const AuthContext= createContext({} as AuthContextProps);


export const AuthProvider = ({children}:any)=>{

const [state, dispatch] = useReducer(authReducer, authInicialState);

const singUp=()=>{};

const singIn= async({correo,password}:LoginData)=>{
try {
    
const resp = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
dispatch({
    type:'singUp',
    payload:{
        token:resp.data.token,
        user:resp.data.usuario
    }

})

} catch (error:any) {
    console.log(error.response.data.msg);
    
}

};
const logout=()=>{};
const removeError=()=>{};

    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logout,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}