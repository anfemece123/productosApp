import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    backgound:{
        flex: 1,
        // resizeMode: 'cover',
      }, 
      overlay:{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    formContainer:{
      flex:1,
      paddingHorizontal:30,
      justifyContent:"center",
      height:600,
      marginBottom:50

    },
    title:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        marginTop:20
    },
    label:{
        fontSize:20,
        marginTop:25,
        color:'white',
        fontWeight:'bold'
    },
    inputField:{
        color:"white",
        fontSize:20,

    },
    inputFieldIOS:{
        borderBottomColor:"#04a4a4",
        borderBottomWidth:2,
        paddingBottom:4
    },
    buttonContainer:{
        alignItems:"center",
        marginTop:50
    },
    button:{
        borderWidth:2,
        backgroundColor:'#04a4a4',
        borderColor:"#04a4a4",
        paddingHorizontal:100,
        paddingVertical:10,
        borderRadius:100
    },
    
    buttonText:{
        fontSize:20,
        color:"white",
        fontWeight:'bold'
    },
    newUserContainer:{
        alignItems:"flex-end",
        marginTop:30,
        fontWeight:'100 '
    },
    buttonReturn:{
        position:'absolute',
        top:50,
        left:20,
        borderWidth:1,
        borderColor:'white',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:100
    }

});
