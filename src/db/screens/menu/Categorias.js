import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground } from "react-native";
  
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";

import db from "../../fire_config";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { collection, onSnapshot} from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { App_tab } from "../../../Nav/NavScreen"; 



export default function Categoria({ navigation }) {

  const [docprod, setDocprod]=useState([])
  const [busq, setbusq]=useState([])

    useEffect( () => {
      onSnapshot(collection(db,"Categoria"), (querysnapshot) => {
        const prod = [];
        
        querysnapshot.forEach((doc) => {
          const {nombre, descripcion, imagen}= doc.data();
            
          
            
            prod.push({
            id: doc.id,
            nombre,
            imagen,

          })

          

        });

        setDocprod(prod)
        
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
    
    <TouchableHighlight underlayColor="yellow" onPress={()=> navigation.navigate("DetCat", item.nombre)}>
      <View style={{flex:1, flexDirection:'row',backgroundColor:'#FFF', margin:5, borderWidth:1, borderColor:'black',
    borderRadius:10}}>
        <Image style={{flex:1,borderRadius:10,height:100, width:100, marginVertical:10, marginHorizontal:5}} source={{ uri: item.imagen }} />
        <Text style={[{flex:1,left:'30%',fontSize:25, fontWeight:'bold', color:'gray', alignSelf:'center'}]}>{item.nombre}</Text>
        <Text style={[{flex:1,left:80,alignSelf:'center'}]}>
          <Icon style={{alignSelf:'center' }} size={40} color="gray" name="chevron-right"  />
          </Text>
        
          
        
      </View>
    </TouchableHighlight>
    
    // </Suspense> 
  );

  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
      {/* <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:30, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>Categorias</Text>
      </View> */}
              {/* <View style={{backgroundColor:'#ffecb3',borderColor:'black', borderWidth:1}}>
                  <TouchableOpacity
                  style={{backgroundColor:'gray', marginHorizontal:10,marginVertical:10, paddingVertical:10,
                borderRadius:10, borderWidth:2,borderColor:'green'}}
                onPress={()=>navigation.replace('Busqueda')}
                  >
                    <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}>Buscar un articulo</Text>
                  </TouchableOpacity>
                </View> */}
      {/* <View>
          <View style={{backgroundColor:'white',borderColor:'black', borderWidth:2, margin:5, borderRadius:20}}>
          <TextInput style={{marginHorizontal:15, marginVertical:-8}} placeholder="Buscar item" ></TextInput>
          
        </View>
      </View> */}
      <FlatList 
      vertical
      showsVerticalScrollIndicator={true}
      numColumns={1}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      
      </View>  
  );
}
