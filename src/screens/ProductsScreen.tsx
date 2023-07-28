import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ProductsContext } from '../context/ProductsContext'

export default function ProductsScreen() {
    const {products} = useContext(ProductsContext);

  return (
    <View style={{flex:1,marginHorizontal:10}}>
        <FlatList
        data={products}
        keyExtractor={(p)=>p._id}
        renderItem={({item})=>(
            <Text>{item.nombre}</Text>
        )}

        />
    </View>
  )
}