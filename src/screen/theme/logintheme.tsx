import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    formcontainer:{
        flex:1,
        paddingHorizontal:30,
        justifyContent:'center',
        height:600,
        marginBottom:40,
    },
    title: {
        color:'white',
        fontSize: 30,
        fontWeight:'bold',
        marginTop:20,

    },
    label: {
        marginLeft:10,
        marginTop: 15 ,
        color:'white',
        fontWeight:'bold',
        marginHorizontal:'20%'
    },
    inputfiel:{
        color:'white',
        fontSize:20
    },
    butoncontainer:{
        alignItems:'center',
        marginTop:20
        
    },
    buton:{
        borderWidth:1,
        borderColor:'white',
        borderRadius:100,
        paddingHorizontal:30,
        paddingVertical:5,
        alignSelf: 'center',
    },
    text:{
        fontSize:22,
        color: 'white',
        fontWeight:'bold',
        
    },
    viewlog:{
        marginHorizontal:30,
        alignContent:'center'
    },
    butonreturn:{
        position:'absolute',
        top:10,
        left:10,
        borderWidth:1,
        borderColor:'white',
        paddingHorizontal: 8,
        paddingVertical:4,
        borderRadius:100,
    }

})