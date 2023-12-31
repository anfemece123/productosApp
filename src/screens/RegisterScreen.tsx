import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity,TextInput, Keyboard, Alert, ImageBackground } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { loginStyles } from '../theme/loginTheme'

import WhiteLogo from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'


interface Props extends StackScreenProps<any,any>{}

const RegisterScreen = ({navigation}:Props) => {

  const {singUp, errorMessage,removeError} = useContext(AuthContext);

  const {email, password,name, onChange}=useForm({
    name:'',
    email:'',
    password:''
  });
  useEffect(() => {
    if(errorMessage.length===0){
      return
    }
    Alert.alert('Registro incorrecto', errorMessage,
    [{
      text:'Ok',
      onPress:removeError
    }])
  

  }, [errorMessage])
  
  const onRegister=()=>{
    console.log({email,password,name})
    singUp({nombre:name,correo:email,password})
    Keyboard.dismiss(); // cuando se sale aprieta en login se va el teclado
  }
  return (
    <>
      <ImageBackground source={require('../assets/funko-2.jpg')} style={loginStyles.backgound}>

      <View style={loginStyles.overlay}>
      <KeyboardAvoidingView
      style={{flex:1}}
      behavior={Platform.OS==="ios"? "padding":"height"}
      >

      
        <View style={loginStyles.formContainer}>

          {/* keyboard avoid view */}
          <WhiteLogo/>

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre: </Text>
          <TextInput
            placeholder="Ingrese su nombre:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"//la linea blanca debajo del input ... SOLO PARA ANDROID 
            style={[
              loginStyles.inputField,
              (Platform.OS==='ios') && loginStyles.inputFieldIOS// condicionamos para que se utilice solo en IOS
              
            ]}
            selectionColor="white" //Color cursor dentro del input 
            
            onChangeText={(value)=> onChange(value,'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize='words' // no se autocorrijan las minusculas a mayusculas
            autoCorrect={false}// se autocorrijan las palabras en general
            />

          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"//la linea blanca debajo del input ... SOLO PARA ANDROID 
            style={[
              loginStyles.inputField,
              (Platform.OS==='ios') && loginStyles.inputFieldIOS// condicionamos para que se utilice solo en IOS
              
            ]}
            selectionColor="white" //Color cursor dentro del input 
            
            onChangeText={(value)=> onChange(value,'email')}
            value={email}
            onSubmitEditing={onRegister}
            autoCapitalize='none' // no se autocorrijan las minusculas a mayusculas
            autoCorrect={false}// se autocorrijan las palabras en general
            />

          <Text style={loginStyles.label}>Contraseña: </Text>
          <TextInput
            placeholder="********"
            secureTextEntry={true}//se coloca en incognito el password
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"

            style={[
              loginStyles.inputField,
              (Platform.OS==='ios') && loginStyles.inputFieldIOS// condicionamos para que se utilice solo en IOS
              
            ]}
            selectionColor="white" //Color cursor dentro del input 
            
            onChangeText={(value)=> onChange(value,'password')}
            value={password}
            onSubmitEditing={onRegister}
            autoCapitalize='none' // no se autocorrijan las minusculas a mayusculas
            autoCorrect={false}// se autocorrijan las palabras en general
            />

          {/* BOTON Crear cuenta */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
              >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

          </View>

          {/* Crear una nueva cuenta */}

          <TouchableOpacity
          onPress={()=>navigation.replace('LoginScreen')}
          activeOpacity={0.8}
          style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.buttonText}> Login </Text>

          </TouchableOpacity>
        </View>
     </KeyboardAvoidingView>
     </View>
     </ImageBackground>
     

    </>
  )
}

export default RegisterScreen