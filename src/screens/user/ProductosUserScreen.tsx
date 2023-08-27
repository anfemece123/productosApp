import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import HeaderPage from '../../components/HeaderPage';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProductsStackParams } from '../../navigator/ProductsNavigator';

interface Props extends DrawerScreenProps<ProductsStackParams, 'ProductosUserScreen'> {}

const ProductosUserScreen = ({ navigation }: Props) => {
  const { productsCategory, clearProductsCategory } = useContext(ProductsContext);

  useEffect(() => {
    
  
    return () => {
      clearProductsCategory()
    }
  }, [])
  

  // Divide los productos en grupos de dos
  const groupedProducts = [];
  for (let i = 0; i < productsCategory.length; i += 2) {
    groupedProducts.push(productsCategory.slice(i, i + 2));
  }

  return (
    <>
      <HeaderPage title={productsCategory[0]?.categoria.nombre} navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          marginTop: 200,
          borderRadius: 50,
          backgroundColor: 'white',
        }}>
        <View style={styles.container}>
          {groupedProducts.map((row, rowIndex) => (
            <View style={styles.rowContainer} key={rowIndex}>
              {row.map((item) => (
                <View style={styles.column} key={item._id}>
                  <Image source={{ uri: item.img }} style={styles.images} />
                  <Text style={styles.text}>{item?.nombre}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ProductosUserScreen;

const styles = StyleSheet.create({
  images: {
    width: 145,
    height: 95,
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Adjust spacing between rows
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
});
