import { Platform, StyleSheet, Text, View , Image} from 'react-native'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { DrawerScreenProps } from '@react-navigation/drawer'
import ProductsNavigator, { ProductsStackParams } from '../navigator/ProductsNavigator'
import { useNavigationContainerRef } from '@react-navigation/native';


interface Props{
    navigation:any  
    title: string
    display:'flex'| 'none'
};

const HeaderPage = ({navigation, title, display}: Props) => {

  console.log(ProductsNavigator)
  return (
    <View style={[      
        (Platform.OS==='ios')? styles.containerHeaderIos: styles.containerHeaderAndroid,
      ]}>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:40}}>
          

          <View style={{width:40}}>
            <TouchableOpacity 
            style={{ marginLeft:10, width:40, display:display}}
            onPress={() => navigation.pop()}
          
            >
              <Icon name="chevron-back-outline" size={40} color='white'/>
            </TouchableOpacity>
          </View>

          <View style={{ marginRight:15,width:40}}>
            <TouchableOpacity  
            onPress={()=> navigation.toggleDrawer()}
            >
                <Icon name="menu-outline" size={40} color='white'/>
            </TouchableOpacity>
          </View>
        </View>

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
        <Text 
          style={{
            marginTop: 15,
            fontSize:30,
            color:'white',
            alignSelf: 'center',
            fontFamily:'Impact', 
            textTransform: 'capitalize'
          }}> 
        {title} 
        </Text>
      
      </View>
  )
}

export default HeaderPage

const styles = StyleSheet.create({
    containerHeaderAndroid:{
        width:'100%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
        paddingTop: '5%'
       
          },
      containerHeaderIos:{
        width:'100%', 
        height:'30%', 
        backgroundColor:'#04a4a4',
        position: 'absolute',
        // marginTop: top
        paddingTop:'5%',
      }
})