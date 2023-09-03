import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ProductsContext } from '../../context/ProductsContext';
import HeaderPage from '../../components/HeaderPage';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProductsStackParams } from '../../navigator/ProductsNavigator';

interface Props extends DrawerScreenProps<ProductsStackParams, 'ProductosUserScreen'> {}

const ProductosUserScreen = ({ navigation }: Props) => {
  const { productsCategory, clearProductsCategory, isLoading} = useContext(ProductsContext);

  console.log(isLoading); 

  useEffect(() => {
    return () => {
      clearProductsCategory();
    }
  }, [])

  return (
    <>
  
    {
      isLoading ? (
        <>
      <HeaderPage title={productsCategory[0]?.categoria.nombre} navigation={navigation} display='flex'/>
      <View style={ styles.loadingIndicator}>

        <ActivityIndicator color='white' size={50} />
      </View>
        </>
      ) : (
    <>
        <View style={{flex:1, backgroundColor:'#04a4a4'}}>
      <HeaderPage title={productsCategory[0]?.categoria.nombre} navigation={navigation} display='flex'/>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          marginTop: 180,
          borderRadius: 50,
          backgroundColor:'#080c14',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <View style={styles.container}>    
              {productsCategory.map((item) => (
                <View key={item._id} style={styles.cardContainer}>
                  <View style={styles.circleContainer}>

                  <View style={styles.circle}/>
                  </View>
                  <Text style={styles.text}>{item?.nombre}</Text>
                  <Image source={{ uri: item?.img }} style={styles.images} />
                </View>
              ))}      
        </View>
      </ScrollView>
    </View>
    </>
      )
    }
    </>
  );
};

export default ProductosUserScreen;

const styles = StyleSheet.create({

  cardContainer:{
    width:350,
    height:300,
    marginVertical:20,
    borderRadius:50,
    borderBottomLeftRadius:50,
    backgroundColor: 'rgba(35,35,35,35)'
  },
  images: {
    width: 280,
    height: 200,
    marginTop:20,
    alignSelf:'center',
  },
  container: {
    flex:1,
    marginVertical: 20,
    alignItems: 'center',
    marginBottom: 20, // Adjust spacing between rows
    marginHorizontal:30
  
  },
  text: {
    color: 'white',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:20,
    marginTop:10,
    textTransform: 'capitalize',
    fontFamily:'Impact'
  },
  // *loading 
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 180,
    borderRadius: 50,
    backgroundColor:'#080c14'
  },
  circle:{
    position:'absolute',
    width: 250,
    height:250,
    backgroundColor:'#04a4a4',
    borderRadius: 100,
    top:150,
    right:-40,
  },
  circleContainer:{
    position:'absolute',
    bottom: 0,
    right: 0,
    width: 250,
    height:250,
    overflow: 'hidden',
    borderRadius:50
  }
});
