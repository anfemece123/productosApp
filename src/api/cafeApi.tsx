import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://192.168.0.52:8080/api';

const cafeApi= axios.create({baseURL});

cafeApi.interceptors.request.use( //* middleware para que siempre este el token en las peticiones 
    async(config)=> {
        const token= await AsyncStorage.getItem('token');
        if(token){
            config.headers['x-token']=token;
        }
        return config;
    }
)

export default cafeApi; 