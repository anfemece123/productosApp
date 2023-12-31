import { View, Text, StyleSheet, TouchableOpacity,RefreshControl,FlatList} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../navigator/ProductsNavigator';
import HeaderPage from '../../components/HeaderPage';

interface Props extends StackScreenProps<ProductsStackParams,'ProductsScreen'>{}

export default function ProductsScreen({navigation}:Props) {

  const [isRefreshing, setIsRefreshing] = useState(false)
    const {products, loadProducts} = useContext(ProductsContext);

    useEffect(() => {
      navigation.setOptions({
        headerRight: ()=> (
          <TouchableOpacity 
            activeOpacity={0.8}
            style={{marginRight:10}}
            onPress={()=> navigation.navigate('ProductScreen', {})}
          >
            <Text>Agregar</Text>

          </TouchableOpacity>
        )
      })
    }, [])
    

    //TODO : PULL TO REFRESH
    const loadProductsFromBackend = async () => { // *REFRESHING del flat-list
      setIsRefreshing(true);
      await loadProducts();
      setIsRefreshing(false);

    }
  return (
    <View style={{flex:1,marginHorizontal:10}}>
           <HeaderPage  
            navigation={navigation}
            title='Productos'
            display='none'
            />
      
        <FlatList
        style={{marginTop:400}}
        data={products}
        keyExtractor={(p)=>p._id}
        
        renderItem={({item})=>(
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>navigation.navigate('ProductScreen', {
              id:item._id,
              name:item.nombre
            })}
          >

            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={()=>(
          <View style={styles.itemSeprartor} />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  productName:{ 
    fontSize:20,
  },
  itemSeprartor:{
    borderBottomWidth:2,
    marginVertical:5,
    borderBottomColor:'rgba(0,0,0,0.1)'
  }
})