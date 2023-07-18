import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';


const AppState= ({children}:any)=> {
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
  
      <NavigationContainer>
        <AppState>
          <Navigator/>
        </AppState>
      </NavigationContainer>

  )
}

export default App