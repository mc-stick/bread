import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import {Keyboard, FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
  
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";



export default function Busqueda({ navigation }) {

  const route=useRoute()
  
  const [docprod, setDocprod]=useState([])

  const [Busq, setBusq]=useState(route.params.nombre)


    useEffect( () => { 
      
      
      onSnapshot(collection(db,"producto"), (querysnapshot) => {
        const prod = [];
        
        querysnapshot.forEach((doc) => {
          const {nombre, descripcion, categoria, imagen, precio, disp, ingrediente}= doc.data();

          if(disp=="Disponible"){
            
            prod.push({
            id: doc.id,
            nombre,
            descripcion,
            imagen,
            precio,
            categoria,
            ingrediente

          })}

        });
        

        let expresion = new RegExp(`${Busq}.*`, "i");
        let Filtro_nom = prod.filter(prod => expresion.test(prod.ingrediente));
       // console.log('this is filtro item',Filtro_nom)
        
        setDocprod(Filtro_nom)

        
      })
      
      //fil()

    }, [])

    // function fil(){

        

    //     Filtro_nom.map( (xtem)=>{
    //       let id=xtem['id'];
    //       let nombre=xtem['nombre'];
    //       let descripcion=xtem['descripcion'];
    //       let imagen=xtem['imagen'];
    //       let precio=xtem['precio'];

    //       if (not.length===0){
    //         not.push({id,nombre,imagen,descripcion, precio});
    //       }else{

    //         let tof= not.find(function(c){
    //           return c.id===id;
    //         })
    //         if(tof){
    //           //console.log('funciona');
    //         }
    //         else{
    //           not.push({id,nombre,imagen,descripcion, precio});
    //           //console.log(not,'this is else not');
    //         }
    //       }
    //     })
    //     setList(not)
    //     console.log(Busq, docprod, not)
    // }
      
        
    

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
    
    <TouchableHighlight underlayColor="white" onPress={()=> navigation.navigate("DetPedido", item)}>
      <View style={styleshs.container}>
        <Image style={styleshs.photo} source={{ uri: item.imagen }} />
        {/* <Text style={styleshs.title}> nombre</Text> */}
        <Text style={[styleshs.category,{fontSize:20, fontWeight:'400', color:'black'}]}> {item.nombre}</Text>
      </View>
    </TouchableHighlight>

    // </Suspense> 
  );

  function Texttab() {
    
      return(
      <FlatList 
      style={{marginBottom:1}}
      vertical
      showsVerticalScrollIndicator={true}
      numColumns={2}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      )
    
    }
    
  

  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
      <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="home"  />
        </TouchableOpacity>
        <Text  style={{fontSize:25, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>Recetas con</Text>
      
      </View>
       <Text style={{fontSize:30, justifyContent:'center', alignSelf:'center', padding:5,
      fontWeight:'bold', color:'#616161', margin:3 }}>" {Busq} "</Text>
        <View style={{ flex:1, alignSelf:"center", justifyContent:"center"}}>
        <Texttab/>
      
      
        </View>
      </View>
    
  );
}
