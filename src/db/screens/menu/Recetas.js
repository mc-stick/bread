import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput, Alert } from "react-native";
import Hyperlink from "react-native-hyperlink";

import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";



export default function Recetas({ navigation }) {

  const [docprod, setDocprod]=useState([])
  
  const route= useRoute();
  //console.log(route.params.ingrediente, 'Ingredientes de hamburguesa.....')
  let mensaje = route.params.ingrediente;
  let arr = mensaje.split(' ');


  

    useEffect( () => {
      onSnapshot(collection(db,"receta"), (querysnapshot) => {
        const of=[];
        
        querysnapshot.forEach((doc) => {
          const {nombre, imagen}= doc.data();

          arr.forEach(element => {
            
            if(nombre.toLowerCase() ==element.toLowerCase()){
            //console.log(element, nombre,);
            of.push({
            id: doc.id,
            nombre,
            imagen,

            })
          }
            
          });
          

        });

        setDocprod(of)
        
      })

    }, [])

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
    


  const renderRecipes = ({item}) => (
    // <Suspense fallback={<Text style={{fontSize:40, fontWeight:"bold", alignSelf:"center", backgroundColor:'red', color:'black'}}>load</Text>}> 
    
    <TouchableHighlight underlayColor="white" onPress={()=> navigation.navigate("BuscRecetas", item)}>
      <View style={{margin:10, borderRadius:10, borderWidth:1, borderColor:'black', height:100, width:110, justifyContent:'center'}}>
        <Image style={{height:75, width:75, alignSelf:'center'}} source={{ uri: item.imagen }} />
        {/* <Text style={styleshs.title}> nombre</Text> */}
        <Text style={{fontSize:20, fontWeight:'400', color:'black', alignSelf:'center',  margin:5}}> {item.nombre}</Text>
      </View>
    </TouchableHighlight>

    // </Suspense> 
  );




  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
       <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:30, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>Ingredientes</Text>
      </View>
      <View style={{flexDirection:'row', alignSelf:'center'}}>
        <Image style={{height:100, width:100, margin:10, borderRadius:10}} source={{uri: route.params.imagen }}/>
      <Text style={{fontSize:25,alignSelf:'center',marginVertical:10, fontWeight:'bold', color:'gray',}}>{route.params.nombre}</Text>
      
     </View>
     <FlatList 
      style={{marginBottom:1}}
      vertical  
      numColumns={3}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
        
      </View>
      
  );
}
