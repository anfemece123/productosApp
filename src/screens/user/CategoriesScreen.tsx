import { View, Text, Image, FlatList, ScrollView, Button } from 'react-native';
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../../navigator/ProductsNavigator'
import { useCategories } from '../../hooks/useCategories'
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props extends DrawerScreenProps<ProductsStackParams,'CategoriesScreen'>{}

const CategoriesScreen = ({navigation}:Props) => {

    const {categories} = useCategories()

    useEffect(() => {
      navigation.setOptions({
        headerLeft:()=> <Text style={{fontSize: 30}}> MENU</Text>
      })
    }, [])
    

  return (
    <>
      <View style={{
        width:'100%', 
        height:'33%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
        paddingTop:'15%',
        alignItems:'center'
        
      }}>
         <Button 
         
         title='menu'
         onPress={()=> navigation.toggleDrawer()}
         
         />

        <Image

          source={require('../../assets/funko-logo-1-2.png')}
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
              onPress={()=>navigation.navigate('ProductosUserScreen')}
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