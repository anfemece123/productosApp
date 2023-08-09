import { View, Text, Image } from 'react-native'
import React from 'react'

export default function WhiteLogo() {
  return (
    <View style={{
        alignItems:'center',

    }}>
        <Image 
        source={require('../assets/funko-logo-1-2.png')}
        style={{
            width:295,
            height:100,
            tintColor:'#04a4a4', //color del logo
            marginBottom:30
        }}
        />
     
    </View>
  )
}