import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'lightgreen',     /* BORRAR ESTA LINEA */
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
   
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 10
  },

    butcontleft:{
    textAlign:"center",
    backgroundColor: 'lightgray',
    marginHorizontal: '40%',
    alignContent: "center",
    marginVertical: 10,
    fontWeight:"bold",
    fontSize: 30,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 5,
    },

  button: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F15F05',
    margin: 20,
    height: 50,
    borderRadius: 50,
  },
  button_plus: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E67E22',
    margin: 20,
    height: 50,
    borderRadius: 50,
  },
  text_up:{
    justifyContent: 'center',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
  },
  button_down:{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewItemlist: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 1,
    margin: 0,
    
},
textlistInformation: {
    color: '#26A69A',
    marginTop: 10,
},
text_up_button:{
  position: "absolute",
  padding: 10,
  bottom: 70,
  left: 0,
  right: 0,
  backgroundColor: 'yellow',
  textAlign: "center"
},
list_item:{
  flex: 1,
  backgroundColor: 'lightgray',
  padding:20,
  margin: 0,
  borderRadius: 10,
},
fecha_list:{
  marginLeft: '70%',
},






mod_centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
mod_modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 50,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
mod_button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  marginBottom:10,
},
mod_buttonOpen: {
  backgroundColor: '#25BE00',
  marginTop: 20,
},
mod_buttonClose: {
  backgroundColor: '#BE1D00',
},
mod_textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
mod_modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
butons_plus_min:{
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "center",
  height: 65,
  width: 120,
  marginHorizontal: 20,
  marginBottom: -20,
  borderRadius: 50,
  borderColor:"black",
  borderWidth:1,
  elevation: 1,
},
title_det_ped: {
  flex: 1,
  fontSize:30,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  marginTop: 5,
  marginRight: 5,
  marginLeft: 5,
},
desc_det_ped:{
  textAlign:"center" ,
  borderColor: "black",
  borderWidth: 1,
  backgroundColor: "#e6ee9c",
  paddingHorizontal:25,
  paddingVertical:30,
  opacity:0.7
},
vista_contador:{
  flexDirection: "row",
  marginHorizontal: 65,
  justifyContent: 'center',
  paddingBottom: -55,
  borderWidth:2,
  borderRadius:100,
  borderColor:'white'

},
map_warn:{
  flex: 1,
  position:'absolute',
  top:50,
  left:0,
  right:0,
  backgroundColor:'green',
  opacity: 0.7,
},
map_warn_text:{

  color: 'white',
  fontSize:20,
  textAlign:'center',
  fontWeight:'bold',
  fontStyle: 'italic',
  position:'relative'
},
textBoxSign: {
  flexDirection: "row",
  height: 45,
  marginHorizontal: 60,
  marginTop: 5,
  marginBottom: 20,
  paddingHorizontal: 15,
  borderRadius: 15,
  backgroundColor: 'lightgray',
  elevation: 2,

},
textAbove: {fontSize: 14, marginLeft: 70,  fontWeight: 'bold', color:'white'},
button_square:{
flex: 1,
borderWidth:2,
borderColor:"orange"
},
button_sqtext:{
  textAlign:'center',
  fontSize: 30,
  fontWeight:"bold",
  color:'#fff',
  margin:10
}
  });

  

  export default styles