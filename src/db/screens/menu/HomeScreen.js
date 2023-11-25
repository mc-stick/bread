import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput, Alert } from "react-native";
import Hyperlink from "react-native-hyperlink";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";

import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";



export default function HomeScreen({ navigation }) {

  const [esp_on, setEsp_on]=useState(false)
  const [lok, setlok]=useState(false)
  const [docprod, setDocprod]=useState([])
  const [docof, setDocof]=useState([])
  

  

    useEffect( () => {
      onSnapshot(collection(db,"producto"), (querysnapshot) => {
        const prod = [];
        const of=[];

        onSnapshot(collection(db,"Categoria"), (querysnapshot) => {
          const prod = [];
          
          querysnapshot.forEach((doc) => {
            
            const {nombre, descripcion, imagen, precio}= doc.data();
              // console.log('exect');
            
              if(prod.length<9){
                prod.push({
                id: doc.id,
                nombre,
                imagen,
                precio,
                  })
              }
              
  
          });
  
          setDocprod(prod)
          setlok(true)
        })
        
        querysnapshot.forEach((doc) => {
          const {nombre, descripcion, imagen, precio, disp, oferta, categoria,ingrediente}= doc.data();

          if(oferta=="true"){
            
            of.push({
            id: doc.id,
            nombre,
            descripcion,
            categoria,
            imagen,
            precio,
            ingrediente

          })}

        });

//         //mascotas... find

//         let mascotas = [{
//           nombre: "Roa",
//           edad: 15,
//       },
//       {
//           nombre: "Maggie",
//           edad: 2,
//       },
//       {
//           nombre: "Cuco",
//           edad: 5
//       }
//   ];
//   let busqueda = "a";
//   let expresion = new RegExp(`${busqueda}.*`, "i");
//   let mascotasFiltradas = mascotas.filter(mascota => expresion.test(mascota.nombre));

//   //console.log(mascotasFiltradas)

// ///end mascotas find

        setDocprod(prod)
        setDocof(of)
        
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
    
    <TouchableHighlight underlayColor="white" onPress={()=> navigation.navigate("DetCat", item.nombre)}>
      <View style={styleshs.container}>
        <Image style={styleshs.photo} source={{ uri: item.imagen }} />
        {/* <Text style={styleshs.title}> nombre</Text> */}
        <Text style={[styleshs.title,{}]}> {item.nombre}</Text>
      </View>
    </TouchableHighlight>

    // </Suspense> 
  );

  const renderOfertas = ({item}) => (
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
    
    if(esp_on){
    return (
      <View >
        <View style={{backgroundColor:'white',borderColor:'black', borderWidth:2, margin:2, borderRadius:20}}>
          <Text style={{fontSize:20,color:'black', alignSelf:'center', fontWeight:'bold'}}>Oferta de hoy</Text>
          {/* <TextInput style={{marginHorizontal:15, marginVertical:-8}} placeholder="Buscar item" ></TextInput> */}
          <View style={{height:200, margin:10,}}>
      <FlatList 
      style={{marginBottom:1}}
      horizontal
      data={docof}
      renderItem={renderOfertas}
      keyExtractor={(item) => `${item.id}`} />
    </View>
        </View>
        
      </View>
      
    );}
  }

  function TextView(){
    if(lok===true){
    return(
      
      <FlatList 
      style={{marginBottom:10}}
      vertical
      showsVerticalScrollIndicator={true}
      numColumns={2} 
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      
    )}else{
      return(
        <View style={{flex:1,alignSelf:'center', justifyContent:'center'}}>
          <Image style={{height:100, width:100, alignSelf:"center", margin:20}}
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png'}}
          />
          <Text style={{alignSelf:'center', fontSize:20, color:'black', fontWeight:'bold'}}>
                     Cargando contenido...
        </Text>
          
        </View>
      )
    }

  }

  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
      <View style={{flexDirection:'row', backgroundColor:'green',}}>
        <Icon style={{margin:5}} size={40} color="white" name="bread-slice-outline"  />
        <Text  style={{flex:1,fontSize:26, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>
        
        Bread</Text>
      <TouchableOpacity
      style={{marginLeft:30}}>
         <Icon onPress={()=> navigation.replace('Busqueda') } style={{right:10}} size={50} color="white" name="card-search"  />
        </TouchableOpacity>
      </View>
     
        <Texttab/>

        <View style={{backgroundColor:'white',borderTopColor:'black', borderTopWidth:1}}>
          <TouchableOpacity
            style={{backgroundColor:'black', marginHorizontal:10,marginVertical:10, paddingVertical:10,
            borderRadius:10, borderWidth:2,borderColor:'orange'}}
            onPress={()=>navigation.navigate('Categoria')}
            >
            <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}>Ver todas las Categorias</Text>
          </TouchableOpacity>
      </View>
      
      
        <TextView/>
      
      {/* <View style={{flexDirection:'row', flex:1, position:'absolute', bottom:0}}>
       <View style={{backgroundColor:'#ffc77d',flex:1,borderTopColor:'black', borderWidth:1, margin:5,
      alignSelf:'center', borderRadius:10, }}>
            <Image style={{height:25, width:25, alignSelf:'center'}} source={{uri: 'https://cdn.icon-icons.com/icons2/317/PNG/512/map-map-marker-icon_34394.png'}}/>
            <Hyperlink
            linkDefault={true}
            linkStyle={{color:'green', fontSize:22,}}
            linkText={ (url)=> url==='https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248' ? 'Ver ubicación' : url}
            >
              <Text style={{fontSize:25, margin:5, fontWeight:'bold',textAlign:'center'}}>https://www.google.com/maps/place/Monumento+a+los+H%C3%A9roes+de+la+Restauraci%C3%B3n/@19.4509303,-70.6889436,14.45z/data=!4m5!3m4!1s0x8eb1cf5ddf76a483:0x1eee2f130a34921b!8m2!3d19.4509085!4d-70.6947248</Text>
            </Hyperlink>
        </View>
       <View style={{flex:1,backgroundColor:'#ffc77d',borderTopColor:'black', borderWidth:1, margin:5,alignSelf:'center', borderRadius:10, }}>

          <TouchableOpacity
          onPress={()=>navigation.navigate('Categoria')}
          >
            <Image style={{height:50, width:50, alignSelf:'center'}} source={{uri: 'https://cdn.icon-icons.com/icons2/1603/PNG/512/news-newspaper-media-paper-press-article_108607.png'}}/>
            <Text style={{fontSize:12, margin:5, fontWeight:'bold',textAlign:'center'}}>Noticias</Text>
          </TouchableOpacity>

        </View> 
       
      </View>*/}

      </View>
      
  );
}
