import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminNavigator from './AdminNavigator';
import ProductsNavigator from './ProductsNavigator';
import { useWindowDimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';

 const Drawer = createDrawerNavigator();

 export const MenuLateralBasico= ()=> {

  const {width}= useWindowDimensions(); // * configurar cuando se pone el celular de lado

  const {user } = useContext( AuthContext)

  console.log(user?.rol)

  return (
    <Drawer.Navigator 
    screenOptions={{
      headerShown:false,
      drawerType: width >= 768 ? 'permanent' : 'front',
  }}
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