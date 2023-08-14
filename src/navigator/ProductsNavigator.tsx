import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../screens/admin/ProductsScreen'
import ProductScreen from '../screens/admin/ProductScreen';
import CategoriesScreen from '../screens/CategoriesScreen'

export type ProductsStackParams ={
    ProductsScreen: object,
    ProductScreen : {id? : string, name?:string},
    CategoriesScreen:undefined
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
            name="ProductsScreen"
            component={ProductsScreen}
            options={{
                title:'Productos'
            }}
        />

        <Stack.Screen  
            name="ProductScreen"
            component={ProductScreen}
        />

   </Stack.Navigator>
  )
}

export default ProductsNavigator