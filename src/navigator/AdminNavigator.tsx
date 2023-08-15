import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../screens/admin/ProductsScreen'
import ProductScreen from '../screens/admin/ProductScreen';
import CategoriesScreen from '../screens/user/CategoriesScreen'

export type AdminStackParams ={
    ProductsScreen: object,
    ProductScreen : {id? : string, name?:string},
    CategoriesScreen:undefined
}

const Stack = createStackNavigator<AdminStackParams>();

const AdminNavigator = () => {
  return (
   <Stack.Navigator
    screenOptions={{
        cardStyle:{
            backgroundColor:'white'
        },
        headerShown:false    
    }}
   >
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

export default AdminNavigator