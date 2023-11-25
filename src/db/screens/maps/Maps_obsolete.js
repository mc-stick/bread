import * as React from 'react';
import { Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import *as Location from 'expo-location'
import { useRoute } from '@react-navigation/native'
import {  Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'
const pin_logo = require('../../assets/pin_map.png')

import db from "../../db/fire_config";
import { collection, addDoc } from 'firebase/firestore';

import styles from '../menu/style';





const Map_onsolete=({navigation})=> {
  var subirdet="";
  var subirdir="";
  var totalfact=0;

  const getroute = useRoute();
  const p=getroute.params;


       
    p.map((gettem)=>{
      const nom= gettem['tit_get']
      const cant= parseInt (gettem['cant_get'])
      subirdet= subirdet+cant+' '+ nom+", ";
      
      const pre= parseInt(gettem['pre_get'])
      const total=(pre*cant)
      totalfact=totalfact+total;
    })

    

  

  const [ubic, setUbic]=React.useState({
      latitude: 19.3970491,
      longitude: -70.6257463,
  })

  function configtocero(){
    p.splice(0, p.length);
    navigation.navigate('Inicio')
  }
  

  React.useEffect(()=>{
    getlocatpermiso();
  },[]) 

  async function getlocatpermiso(){
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){

      Alert.alert('Sin acceso a la ubicación',
      '\n#ERROR: Permiso denegado')
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      
    });
      const userubic = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      setUbic(userubic)

      
      
      
  }
  subirdir='https://www.google.com/maps/search/?api=1&query='+ubic.latitude+'%2C'+ubic.longitude
   

  const confirped=()=>{

    if("user"=='Usuario no registrado'){
      Alert.alert(
        "AVISO.",
        "Debes iniciar sesión para confirmar tu pedido.",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),   
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]
      );
    }else{
      console.log("user")
      Alert.alert('DISFRUTA TU PEDIDO '+"user",
      '\nLa orden se enviará a la ubicación indicada.')
      save();
    }

    
  }

  const save = async()=>{
   var date = new Date();
   var now = date.toLocaleDateString('en-US')+"   "+date.toLocaleTimeString('en-US');
    await addDoc(collection(db, "pedidos"),{
      detalle: subirdet,
      direccion: subirdir,
      id_cli: "user",
      total: totalfact,
      fecha: "  "+now,
    });

    await addDoc(collection(db, "total de pedidos"),{
      detalle: subirdet,
      direccion: subirdir,
      id_cli: "user",
      total: totalfact,
      fecha: date,
    });

    configtocero();
  }

  return (
    <View style={{flex: 1}}>
      
    <View >
      <MapView style={styles.map}
      initialRegion={{
        latitude: ubic.latitude,
        longitude: ubic.longitude,
        latitudeDelta: 0.1,
        longitudeDelta:0.1,
        }}
      >
        <Marker 
        
        image={pin_logo}
        
        draggable
        coordinate={ubic}
        onDragEnd={(direc)=>setUbic(direc.nativeEvent.coordinate)}
        />
          
      </MapView>
      
    </View>

    <View style={styles.map_warn}>
    <Text style={styles.map_warn_text}>

# Activa el GPS para actualizar tu ubicacion.

</Text>
        <Text style={styles.map_warn_text}>

          # Presiona el marcador para arrastrarlo.

        </Text>
        <Text style={styles.map_warn_text}>
          # Suelta el marcador para colocarlo.

        </Text>
        
    </View>

    <View style={[styles.button_down,{flex: 1,}]}>
        
        <TouchableOpacity
          style={[styles.button,{borderWidth:2,borderColor:'blue'}]}
          
           onPress={() => confirped()} 
          
         >
              
          <Text style={[styles.buttonText,{fontSize:20}]}>  Confirmar pedido </Text>
          <FontAwesome name='check' size={40} color='#00B205' ></FontAwesome>
        </TouchableOpacity>
      </View>
    </View>
  );
  
}



export default Map

 