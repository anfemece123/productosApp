import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../screens/admin/ProductsScreen'
import ProductScreen from '../screens/admin/ProductScreen';
import CategoriesScreen from '../screens/user/CategoriesScreen'
import ProductosUserScreen from '../screens/user/ProductosUserScreen';
import DetailProductScreen from '../screens/user/DetailProductScreen';

export type ProductsStackParams ={
    CategoriesScreen:undefined,
    ProductosUserScreen: undefined,
    DetailProductScreen: object
}

const Stack = createStackNavigator<ProductsStackParams>();


const ProductsNavigator = () => {
  return (
   <Stack.Navigator
    screenOptions={{
        cardStyle:{
            backgroundColor:'#080c14'
        },
        headerShown:false    
    }}
   >
    <Stack.Screen
            name="CategoriesScreen"
            component={CategoriesScreen}
            
           
        />
        <Stack.Screen 
            name="ProductosUserScreen"
            component={ProductosUserScreen}
           
        />

        <Stack.Screen  
            name="DetailProductScreen"
            component={DetailProductScreen}
        />

   </Stack.Navigator>
  )
}

export default ProductsNavigator