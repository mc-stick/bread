import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import {Keyboard, FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
  import Hyperlink from "react-native-hyperlink";
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Noticias({ navigation }) {
  
    useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  function Tview(){
    return (
      
      
      <View style={{flex:1, backgroundColor:'white'}}> 
      <View style={{flex:1, justifyContent:"center"}}>
        
      
      <Image
      source={ {uri: 'https://cdn.icon-icons.com/icons2/1675/PNG/512/3890941-market-news-newspaper-stock_111181.png'}}
      style={{
        alignSelf:"center",
        borderRadius:10,
        margin:20,
          width: 300,
          height:300,
      }}
      />
        <Text style={{alignSelf: 'center'}}>
          Aqui verás todas las noticias y notificaciones de la semana.</Text>
      </View>
      
      
        
        {/* <Hyperlink
            linkDefault={true}
            linkStyle={{color:'white', fontSize:22,}}
            linkText={ (url)=> url==='https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248' ? 'Ver ubicación' : url}
            ><View style={{backgroundColor:'green', marginHorizontal:10,marginVertical:10, paddingVertical:10,
            borderRadius:10, borderWidth:2,borderColor:'orange'}}>
              <Text style={{fontSize:25, margin:5, fontWeight:'bold',textAlign:'center'}}>https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248</Text>
            </View></Hyperlink> */}
        
      
      </View>   
  );
  }
    
  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
        <Tview/>
      </View>
    
  );
}
