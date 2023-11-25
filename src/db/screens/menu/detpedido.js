import { View, Text, TouchableOpacity, Button, TextInput,Image, AsyncStorage, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './style'
import { Fab } from '../../../component/Fab'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from 'react-native-gesture-handler'
import { collection, addDoc} from "firebase/firestore";
import db from '../../fire_config'

const Detpedido = ({navigation}) => {

  const route= useRoute();

  const [cant, setCant] = useState(1)

   const longpresrest=()=>{
    if(cant>10){
    let newcant = parseInt(cant)
    setCant(newcant-10)
    }
    else{
      restar()
    }
   }
   const restar=()=>{     //funcion de restar elementos
    if(cant>1){
      let newcant = parseInt(cant-1)
    setCant(newcant)
    }
   }


    const id=route.params.id.toString()
    const imagen=route.params.imagen.toString()
    const precio=route.params.precio.toString()
    const nombre=route.params.nombre.toString()
    const categoria=route.params.categoria.toString()
    //const sub=precio*cant;


    // deleteDoc(doc(db, 'producto', id));    borrar doc
    // updateDoc(doc(db, "producto", id), newFields);  actualizar doc
   function edit(){
    Alert.alert(
      "Aviso",
      "Deseas hacer algún cambio en tu "+nombre+' ?',
      [
        {
          text: "volver",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Si", onPress: () => navigation.navigate('EditPed', route.params)  },
        { text: "No", onPress: () => pressbut()},
      ]
    );
   }
    
   function pressbut(){ //al presional el btn te manda al carrito
     setCant(1)
     let estado="carrito"
     let iddoc="/Pedidos_n"
     addDoc(collection(db, iddoc), { nombre, cant, imagen, precio, categoria, estado  });
     navigation.navigate('Carrito')
      //navigation.replace('HomeScr')
    }
  return (
    <ScrollView style={{flex: 1, backgroundColor:'#2e7d32'}}>
      <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:30, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>{route.params.nombre}</Text>
      </View>
      
      
      <Image style={{height:200}} source={{uri: route.params.imagen}}/>
      <Text style={[styles.title_det_ped]}>RD$ {route.params.precio}  </Text>
      
      <Text style={[styles.vista_contador,{color:'white', padding:10, alignSelf:'center', borderRadius:10,
    marginHorizontal:10, marginBottom:20}]}>{route.params.descripcion}</Text>

    <TouchableOpacity
    onPress={()=>navigation.navigate('Recetas',route.params)}
    style={{ alignSelf:'center', borderBottomWidth:2,borderColor:'orange', 
    marginHorizontal:10, marginBottom:20, } }>
      <Text style={{color:'white', fontWeight:'bold', fontSize:20, margin:10}}>Ver ingredientes</Text>
    </TouchableOpacity>

<View style={{flexDirection:'row', alignSelf:'center', margin:10}}>
  <Text style={{fontWeight:'bold',fontSize:20, color:'white'}}>Categoria: </Text>
    <TouchableOpacity
    onPress={()=>navigation.replace('DetCat', route.params.categoria)}
    style={{ alignSelf:'center',  borderBottomWidth:1, borderColor:'orange', 
    marginHorizontal:10, marginBottom:20} }>
      <Text style={{color:'white', fontWeight:'bold', fontSize:18, marginBottom:5}}>{route.params.categoria}</Text>
    </TouchableOpacity>
      </View>
      {/* <Text style={{textAlign:'center', marginTop:10, marginBottom:5, fontWeight: 'bold',
       color:'white' , fontSize:20}}>Cantidad</Text>
  */}
      {/* <View style={styles.vista_contador}>
        
        <Fab
            title='+1'
            position='btn_r'
            onPress={ ()=> setCant (cant+1)}
            onLprss={()=> setCant(cant+10)}
        />                              
        <Text style={{textAlign:'center', fontSize:45, color:'white'}}>
        {cant} </Text>

        <Fab
            title='-1'
            position='btn_l'
            onPress={ ()=> restar()}
            onLprss={()=> longpresrest()}
        />
      </View> */}
            
      
      <View style={{flexDirection:'row',marginTop:"10%", bottom:20}}>
{/*         
      <TouchableOpacity
        style={[styles.button_plus,{flex:1,backgroundColor:'gray', borderColor:'white', borderWidth:1}]}
        onPress={() => edit()}
        
        >
                  
        <Text style={styles.buttonText}>  Editar antes de:  </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.button_plus,{flex:1}]}
        onPress={ () => edit()}
        
        > 
        <Icon  size={40} color="white" name="cart-plus"  />
                  
        <Text style={[styles.buttonText,{}]}> 
       
         Agregar al pedido  </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
 
}

export default Detpedido