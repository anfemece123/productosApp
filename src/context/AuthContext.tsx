import React, { createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps={
    errorMessage: string;
    token:string| null;
    user:Usuario| null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp:(registerdata: RegisterData)=>void;
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

useEffect(() => {
    checkToken()
}, [])

const checkToken = async ()=>{   
    const token = AsyncStorage.getItem('token');
    // No token,  no autenticado
    if(!token) return dispatch({type: 'notAuthenticated'});
    //hay token
    const resp = await cafeApi.get('/auth');

    if(resp.status !== 200){
        return dispatch({type : 'notAuthenticated'})
    }
    dispatch({
        type:'singUp',
        payload:{
            token:resp.data.token,
            user:resp.data.usuario
        }
    
    });
}


const singUp=async({nombre,correo,password}: RegisterData)=>{
    try {
           
    const resp = await cafeApi.post<LoginResponse>('/usuarios', {nombre,correo, password});
    dispatch({
        type:'singUp',
        payload:{
            token:resp.data.token,
            user:resp.data.usuario
    }

});

await AsyncStorage.setItem('token', resp.data.token)
        
        
    } catch (error:any) {
        // console.log(error.response.data.msg);
        dispatch({type:'addError', payload:error.response.data.errors[0].msg || 'Revise la informacion suministrada'})
        
    }
};

const singIn= async({correo,password}:LoginData)=>{
try {
    
const resp = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
dispatch({
    type:'singUp',
    payload:{
        token:resp.data.token,
        user:resp.data.usuario
    }

});

await AsyncStorage.setItem('token', resp.data.token)

} catch (error:any) {
    // console.log(error.response.data.msg);
    dispatch({type:'addError', payload:error.response.data.msg || 'informacion incorrecta'})
    
}

};
const logout=async()=>{
    await AsyncStorage.removeItem('token');
    dispatch({type:'logout'})
};
const removeError=()=>{
    dispatch ({type: 'removeError'})
};

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