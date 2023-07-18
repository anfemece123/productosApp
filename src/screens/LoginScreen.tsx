import { View, Text, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import Backgound from '../components/Backgound'
import WhiteLogo from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any,any>{}

const {singIn} = useContext(AuthContext);

const LoginScreen = ({navigation}:Props) => {

const {email, password, onChange}=useForm({
  email:'',
  password:''
});

const onLogin=()=>{
  console.log({email,password})
  Keyboard.dismiss(); // cuando se sale aprieta en login se va el teclado

  singIn({correo:email,password});
}
  return (
    <>
      {/* Background */}
      <Backgound/>

      <KeyboardAvoidingView 
      style={{flex:1}}
      behavior={Platform.OS==="ios"? "padding":"height"}
      >

      
        <View style={loginStyles.formContainer}>

          {/* keyboard avoid view */}
          <WhiteLogo/>

          <Text style={loginStyles.title}>Login</Text>

          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder="Ingrese su email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              (Platform.OS==='ios') && loginStyles.inputFieldIOS// condicionamos para que se utilice solo en IOS
              
            ]}
            selectionColor="white" //Color cursor dentro del input 
            
            onChangeText={(value)=> onChange(value,'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize='none' // no se autocorrijan las minusculas a mayusculas
            autoCorrect={false}// se autocorrijan las palabras en general
            />

          <Text style={loginStyles.label}>Contraseña: </Text>
          <TextInput
            placeholder="********"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            secureTextEntry={true}//se coloca en incognito el password

            style={[
              loginStyles.inputField,
              (Platform.OS==='ios') && loginStyles.inputFieldIOS// condicionamos para que se utilice solo en IOS
              
            ]}
            selectionColor="white" //Color cursor dentro del input 
            
            onChangeText={(value)=> onChange(value,'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize='none' // no se autocorrijan las minusculas a mayusculas
            autoCorrect={false}// se autocorrijan las palabras en general
            />

          {/* BOTON LOGIN */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

          </View>

          {/* Crear una nueva cuenta */}

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>navigation.replace('RegisterScreen')} //replace: ya no se puede regresar a la pantalla de login.. la reemplaza por la nueva pantalla
              > 

              <Text style={loginStyles.buttonText}> Nueva cuenta </Text>

            </TouchableOpacity>
          </View>
        </View>
     </KeyboardAvoidingView>

    </>
  )
}

export default LoginScreen