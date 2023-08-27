import { Platform, StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props{
    navigation:any  
    title: string
};

const HeaderPage = ({navigation, title}: Props) => {
  return (
    <View style={[      
        (Platform.OS==='ios')? styles.containerHeaderIos: styles.containerHeaderAndroid,
      ]}>

        <TouchableOpacity  
        onPress={()=> navigation.toggleDrawer()}
        style={{ margin: 15 }}
        >
 
            <Icon name="menu-outline" size={40} color='white'/>
         </TouchableOpacity>

        <Image

          source={require('../assets/funko-logo-1-2.png')}
          style={{
            width: 155, 
            height:53, 
            tintColor:'white', 
            alignSelf: 'center',
            marginTop: -40
            
            }}
        />
        <Text style={{
          marginTop: 15,
          fontSize:30,
          color:'white',
          alignSelf: 'center'           
        }}> {title} </Text>
      
      </View>
  )
}

export default HeaderPage

const styles = StyleSheet.create({
    containerHeaderAndroid:{
        width:'100%', 
        height:'33%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
        paddingTop: '5%'
       
          },
      containerHeaderIos:{
        width:'100%', 
        height:'33%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
      
        // marginTop: top
        paddingTop:'10%',
      }
})