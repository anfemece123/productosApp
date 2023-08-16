import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { MenuLateral } from './src/navigator/MenuLateral';


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
          {/* <MenuLateral/> */}
          <Navigator/>
        </AppState>
      </NavigationContainer>

  )
}

export default App