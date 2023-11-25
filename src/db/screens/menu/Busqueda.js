import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import {Keyboard, FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
  
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Busqueda({ navigation }) {
  
  const [docprod, setDocprod]=useState([])
  const [list, setList]=useState([])
  const [vista,setVista]=useState(false)

  const [Busq, setBusq]=useState('')
  

    useEffect( () => {
      
      onSnapshot(collection(db,"producto"), (querysnapshot) => {
        const prod = [];
        
        querysnapshot.forEach((doc) => {
          const {nombre, descripcion, imagen, precio, disp, categoria,ingrediente}= doc.data();

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
        setDocprod(prod)
        
      })

    }, [])

    function filtro(){
      
      Keyboard.dismiss()
      let not =[];

      let expresion = new RegExp(`${Busq}.*`, "i");
        let Filtro_nom = docprod.filter(prod => expresion.test(prod.nombre));
        let filtro_desc = docprod.filter(prod => expresion.test(prod.descripcion));
        let filtro_cat = docprod.filter(prod => expresion.test(prod.categoria));

        Filtro_nom.map( (xtem)=>{
          let id=xtem['id'];
          let nombre=xtem['nombre'];
          let descripcion=xtem['descripcion'];
          let imagen=xtem['imagen'];
          let precio=xtem['precio'];
          let categoria=xtem['categoria'];
          let ingrediente=xtem['ingrediente'];

          if (not.length===0){
            not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
          }else{

            let tof= not.find(function(c){
              return c.id===id;
            })
            if(tof){
              //console.log('funciona');
            }
            else{
              not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
              //console.log(not,'this is else not');
            }
          }
        })
        filtro_cat.map( (xtem)=>{
          let id=xtem['id'];
          let nombre=xtem['nombre'];
          let descripcion=xtem['descripcion'];
          let imagen=xtem['imagen'];
          let precio=xtem['precio'];
          let categoria=xtem['categoria'];
          let ingrediente=xtem['ingrediente'];

          if (not.length===0){
            not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
          }else{

            let tof= not.find(function(c){
              return c.id===id;
            })
            if(tof){
              //console.log('funciona');
            }
            else{
              not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
              //console.log(not,'this is else not');
            }
          }
        })
        filtro_desc.map( (xtem)=>{
          let id=xtem['id'];
          let nombre=xtem['nombre'];
          let descripcion=xtem['descripcion'];
          let imagen=xtem['imagen'];
          let precio=xtem['precio'];
          let categoria=xtem['categoria'];
          let ingrediente=xtem['ingrediente'];

          if (not.length===0){
            not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
          }else{

            let tof= not.find(function(c){
              return c.id===id;
            })
            if(tof){
              //console.log('funciona');
            }
            else{
              not.push({id,nombre,imagen,descripcion, precio, categoria, ingrediente});
              //console.log(not,'this is else not');
            }
          }
        })

        not.length===0? setVista(false) : setVista(true);
        setList(not)
    }

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
    if(vista){
      return(
      <FlatList 
      style={{marginBottom:1}}
      vertical
      showsVerticalScrollIndicator={true}
      numColumns={2}
      data={list}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      )
    }else{
      if(Busq===''){
        return(
          <View>
            <Image style={{height:100, width:100, alignSelf:"center", margin:20}}
              source={{uri: 'https://cdn.icon-icons.com/icons2/39/PNG/128/search_locate_find_6278.png'}}
            />
            <Text style={{alignSelf:'center', fontSize:20, color:'black'}}>Escribe una palabra o frase para comenzar con la busqueda.
           
          </Text>
            
          </View>
        )
      }else{
      return(
        <View>
          <Image style={{height:100, width:100, alignSelf:"center", margin:20}}
            source={{uri: 'https://cdn.icon-icons.com/icons2/39/PNG/128/search_locate_find_6278.png'}}
          />
          <Text style={{alignSelf:'center', fontSize:20, color:'black'}}>Toca el boton buscar para mostrar los resultados.</Text>
          
        </View>
      )}
    }
    
  }

  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
      <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:30, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>Buscar un producto</Text>
      </View>
       <View style={{backgroundColor:'white',borderColor:'black', borderWidth:2, margin:5, borderRadius:20, flexDirection:'row'}}>
          <TextInput style={{flex:1, marginHorizontal:15,}} placeholder="Buscar item" onChangeText={val=>setBusq(val) } ></TextInput>
          <TouchableOpacity
          onPress={()=>filtro()}
          style={{ }}>
            <Text style={{borderWidth:1,fontSize:15, borderRadius:15,color:'black', borderColor:'black',backgroundColor:'lightgray',
          margin:1, padding:10, right:2,top:1 }}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex:1, alignSelf:"center", justifyContent:"center"}}>
        <Texttab/>
      
      
        </View>
      </View>
    
  );
}
