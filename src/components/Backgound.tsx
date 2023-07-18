import { View, Text } from 'react-native'
import React from 'react'

const Backgound = () => {
  return (
    <View style={{
        position: 'absolute',
        backgroundColor: '#5856D6',
        top:-250,
        width:1000,
        height:1200,
        transform:[
            {rotate: '-70deg'}
        ]
    }}/>
      
  )
}

export default Backgound