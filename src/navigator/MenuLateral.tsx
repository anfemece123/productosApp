import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import AdminNavigator from './AdminNavigator';
import ProductsNavigator from './ProductsNavigator';
import { Image, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';


 const Drawer = createDrawerNavigator();

 export const MenuLateral= ()=> {

  const {width}= useWindowDimensions(); // * configurar cuando se pone el celular de lado

  const {user, logout} = useContext( AuthContext);


  return (
    <Drawer.Navigator 
    screenOptions={{
      headerShown:false,
      drawerType: width >= 768 ? 'permanent' : 'front',
      drawerPosition:'right'
  }}
  drawerContent={(props)=> <MenuInterno {...props} />} //* Se le pasan las props para que funcione
    >
      {

        user?.rol === "ADMIN_ROLE" ? ( 
          <>
          <Drawer.Screen name="ProductsNavigator"  options={{title:'Categorias'}} component={ProductsNavigator} />
          
          <Drawer.Screen name="AdminNavigator" options={{title:'Administrador'}}  component={AdminNavigator} />
          </>
        ) :(
          <>
          <Drawer.Screen name="ProductsNavigator"  options={{title:'Categorias'}} component={ProductsNavigator} />
          </> 
        )
      }
    </Drawer.Navigator>
  );
}

const MenuInterno = ({navigation}: DrawerContentComponentProps) => {
  const {user, logout, status} = useContext( AuthContext); 

  return(
    <DrawerContentScrollView style={{ backgroundColor: '#080c14'}}>
      {/* Contenedor del avatar */}
      <View style={{
        alignItems: 'center',
      
      }}> 

        <Image 
        source={{
          uri:'https://aderezo.mx/wp-content/uploads/2021/03/jonathan-cooper-R8L1l9RN198-unsplash-1024x732.jpg'
        }}
        style={{borderRadius: 100,width:200, height:200, borderColor: '#04a4a4' , borderWidth:4 }}
        />

      <Text style={{color: 'white', fontSize:20, fontWeight:'bold', marginTop: 40}}>  Hola {user?.nombre} !</Text>

      </View>

      {/* Opciones del menu */}

      <View style = {{alignItems: 'center', marginVertical:30}}>

        {
          user?.rol === 'ADMIN_ROLE' ? (
            <>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('AdminNavigator')}
          > 
  
            <Text style={{
              color:'white',
              fontSize:20,
              marginVertical: 10
            }}>
              Administrador
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            onPress={()=>navigation.navigate('ProductsNavigator')}
          > 
  
            <Text style={{
              color:'white',
              fontSize: 20,
              marginVertical: 10
            }}>
              Productos
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
          onPress={logout}
          >
            <Text style={{
              color:'red',
              fontSize: 20,
              marginVertical: 10
            }}>
              Logout  <Icon name="log-out-outline" size={20} color='red'/>
            </Text> 
           
          </TouchableOpacity>
          </>
            
           ) : (
            <>
             <TouchableOpacity 
            onPress={()=>navigation.navigate('ProductsNavigator')}
          > 
  
            <Text style={{
              color:'white',
              fontSize: 20,
              marginVertical: 10
            }}>
              Categorias
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
          onPress={logout}
          >
            <Text style={{
              color:'red',
              fontSize: 20,
              marginVertical: 10
            }}>
              Logout <Icon name="log-out-outline" size={20} color='red'/>
            </Text> 
           
          </TouchableOpacity>
            </>
            )
        }
      
      </View>



    </DrawerContentScrollView>
  );
}