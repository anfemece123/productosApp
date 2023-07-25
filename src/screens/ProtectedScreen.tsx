import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedScreen = () => {

  const {user, token, logout}= useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <Button 
      title='logout'
      color='#5856D6'
      onPress={logout}
      />
      <Text>
        {JSON.stringify(user,null,5)}
      </Text>
      <Text>
        {token}
      </Text>
    </View>
  )
}

export default ProtectedScreen;


const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:20,
    marginBottom:20
  }
})