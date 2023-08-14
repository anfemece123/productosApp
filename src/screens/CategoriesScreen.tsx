import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'
import { useCategories } from '../hooks/useCategories'

interface Props extends StackScreenProps<ProductsStackParams,'CategoriesScreen'>{}

const CategoriesScreen = ({navigation}:Props) => {

    const {categories} = useCategories()

    const imagen = categories.map((item)=>
    item.img
    )
   
    console.log(imagen)

  return (
    <>
      <View style={{
        width:'100%', 
        height:'25%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center'
      
       }}>

        <Image

          source={require('../assets/funko-logo-1-2.png')}
          style={{
            width: 155, 
            height:53, 
            tintColor:'white', 
            justifyContent:'center'}}
        />
        <Text style={{
          marginTop: 15,
          fontSize:30,
          color:'white',
          
        }}> Categorias </Text>
      
      </View>
   
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
              onPress={()=>navigation.navigate('ProductsScreen', {
                  id:item._id,
                  name:item.nombre
                })}
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