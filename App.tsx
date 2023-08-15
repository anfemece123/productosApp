import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { MenuLateralBasico } from './src/navigator/MenuLateralBasico';


const AppState= ({children}:any)=> {
  return(
    <AuthProvider>
      <ProductsProvider>
      {children}
      </ProductsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
  
      <NavigationContainer>
        <AppState>
          <MenuLateralBasico/>
          {/* <Navigator/> */}
        </AppState>
      </NavigationContainer>

  )
}

export default App