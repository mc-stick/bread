import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import {Keyboard, FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
  import Hyperlink from "react-native-hyperlink";
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Usuario({ navigation }) {
  

  const save = async () =>{
    try {
      await AsyncStorage.setItem('UserKey', 'varsaved');
    } catch (e) {
      console.log('error saving data',e);
    }
    load();
  };

    const load = async () => {
    try {
      const value = await AsyncStorage.getItem('stringKey');
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log('Error retrieving data', error);
    }
  }

  function Tview(){
    return (
      
      
      <View style={{flex:1, backgroundColor:'white'}}> 
      <View style={{flex:1, justifyContent:"center"}}>
        <Text style={{alignSelf: 'center', fontSize:25, fontWeight:'bold', backgroundColor:'red', paddingHorizontal:10,
         borderRadius:50, color:'white', paddingVertical:5}}>
          Aviso.</Text>
      
      <Image
      source={ {uri: 'https://cdn.icon-icons.com/icons2/2104/PNG/512/code_icon_129141.png'}}
      style={{
        alignSelf:"center",
        borderRadius:10,
        margin:20,
          width: 300,
          height:300,
      }}
      />
        <Text style={{alignSelf: 'center'}}>
          Esta pagina está en construccion.</Text>
      </View>
      
      
        
        <Hyperlink
            linkDefault={true}
            linkStyle={{color:'white', fontSize:22,}}
            linkText={ (url)=> url==='https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248' ? 'Ver ubicación' : url}
            ><View style={{backgroundColor:'green', marginHorizontal:10,marginVertical:10, paddingVertical:10,
            borderRadius:10, borderWidth:2,borderColor:'orange'}}>
              <Text style={{fontSize:25, margin:5, fontWeight:'bold',textAlign:'center'}}>https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248</Text>
            </View></Hyperlink>
        
        <TouchableOpacity
        onPress={()=> save()}
        style={{height:10, flex:0.2, backgroundColor:'red' }}>
          <View >
            <Text >hola</Text>
          </View>
        </TouchableOpacity>
      
      </View>   
  );
  }
    
  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
        <Tview/>
      </View>
    
  );
}
