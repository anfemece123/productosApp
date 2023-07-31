import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

import {Picker} from '@react-native-picker/picker';
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';




interface Props extends StackScreenProps<ProductsStackParams,'ProductScreen'>{}

const ProductScreen = ({navigation,route}:Props) => {

  const {id='', name = ''}= route.params;

  const [tempUri, setTempUri] = useState<Asset>({});

  const {categories}=useCategories();

  const {loadProductById,updateProduct,addProduct,uploadImage}= useContext(ProductsContext);

  
  
  const {_id,categoriaId,nombre,img,form, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId:'',
    nombre: name,
    img: ''
  });
  useEffect(() => {
    navigation.setOptions({
      title:(nombre)? nombre :'Colocar nombre ' //* cambiar el titulo del header por el nombre del producto
    })
  }, [nombre])
  
  useEffect(() => {
    loadProduct();
  }, [])
  
  const loadProduct= async()=> {
    if(id.length===0) return;
    const product= await loadProductById(id);
    setFormValue({
      _id:id,
      categoriaId:product.categoria._id,
      img :product.img || '',
      nombre:nombre
    })
  }


  const saveOrUpdate = async()=>{
    if(id.length>0){
      updateProduct(categoriaId,nombre,id)
    }else{
    
      const tempCategoriaiD=  categoriaId || categories[0]._id; // * para que se renderice la categoria de la primera posicion y no un arreglo vacio o undefined
      const newProduct = await addProduct(tempCategoriaiD,nombre);
      onChange(newProduct._id, '_id')
    }
 

        uploadImage(tempUri,id);
  };

  const takePhoto= ()=> {
    launchCamera({
      mediaType: 'photo', quality: 0.5}, 
      (resp)=>{

        console.log(resp)
        if(resp.didCancel)return;
        if(!resp.assets)return; 

        setTempUri(resp.assets[0]);

      }
      );
  }

  const takePhotoFromGallery=()=>{
    launchImageLibrary({
      mediaType: 'photo', quality: 0.5}, 
      (resp)=>{

        console.log(resp)
        if(resp.didCancel)return;
        if(!resp.assets)return; 

        setTempUri(resp.assets[0]);

      }
      );
  }

  return (
    <View style={styles.container }>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput 
          placeholder='Producto'
     
          value={nombre}
          onChangeText={(value)=>onChange(value,'nombre')}
          style= {styles.textInput}
        />

        {/* Picker / selector */}
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(value) => onChange(value, 'categoriaId')}>
            {
              categories.map(c=> (

                <Picker.Item label={c.nombre} value={c._id}  key={c._id}/>
              ))
            }

        </Picker>


        <Button 
          title='Guardar'
          onPress={saveOrUpdate}
          color="#5856D6" 
        />

        {
          (_id.length>0)&& 
        <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}> 
        <Button 
          title='Camara'
          onPress={takePhoto}
          color="#5856D6" 
        />
        <View style={{width:10}}/>
        <Button 
          title='Galeria'
          onPress={takePhotoFromGallery}
          color="#5856D6" 
        />

        </View>
        }


        {
          (img.length > 0 && !tempUri.uri)&&
          <Image 
          source={{ uri: img}}
          style={{
            width:'100%',
            height:250,
            marginTop:20
          }}
          /> 
        }

        {/* TODO : Mostrar imagen temporal */}

        {
          (tempUri )&&
          <Image 
          source={{ uri: tempUri.uri}}
          style={{
            width:'100%',
            height:250,
            marginTop:20
          }}
          /> 
        }

        {/* <Text> {JSON.stringify(form,null,5)}</Text> */}

      </ScrollView>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10,
    marginHorizontal:20
  },
  label:{
    fontSize: 20
  },
  textInput:{
    borderWidth:1,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:20,
    borderColor: 'rgba(0,0,0,0.2)',
    height:45,
    marginTop:10,
    marginBottom:15
  }
})