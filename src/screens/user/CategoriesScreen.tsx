import { View, Text, Image, FlatList, ScrollView, Button, Platform, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProductsStackParams } from '../../navigator/ProductsNavigator'
import { useCategories } from '../../hooks/useCategories'
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProductsContext } from '../../context/ProductsContext';


import HeaderPage from '../../components/HeaderPage';



interface Props extends DrawerScreenProps<ProductsStackParams,'CategoriesScreen'>{}



const CategoriesScreen = ({navigation}:Props) => {
  
  // const {top} = useSafeAreaInsets() //* para colocar la separacion de la parte de arriba del celular.

    const {categories} = useCategories();
    const {loadProductsByCategory, productsCategory}= useContext(ProductsContext);

    

    useEffect(() => {
      navigation.setOptions({
        headerLeft:()=> <Text style={{fontSize: 30}}> MENU</Text>
      })
    }, [])

    const idCategory = (id:string) => { 
      loadProductsByCategory(id)
      navigation.navigate('ProductosUserScreen')
    };
    

  return (
    <>
      <HeaderPage 
        navigation={navigation}
        title='Categorias'
     />  
    
      <View style={{  
          flex:1,
          width:'100%',
          marginTop:180,
          borderRadius: 50,
          backgroundColor:'#080c14'
          }}>

          <FlatList
          keyExtractor={(p)=>p._id}
          data={categories}

          renderItem={({item})=>(
            

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> idCategory(item._id)}
                >

              <Image 
              source={{uri:item.img}} 
              
              style={{
                  
                  width:'80%',
                  height:150,
                  marginTop:20,
                  borderRadius:50,
                  alignSelf:'center'
                  }}/>
            </TouchableOpacity>
          )}
          
          />
      </View>
    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({


})