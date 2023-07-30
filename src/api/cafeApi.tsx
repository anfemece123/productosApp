import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'https://cafe-react-native-06c4edc97252.herokuapp.com/api';

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