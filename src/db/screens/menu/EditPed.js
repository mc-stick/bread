import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput, Alert } from "react-native";
import Hyperlink from "react-native-hyperlink";

import styles from "./style";
import MenuImage from "../maps/MenuImage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import db from "../../fire_config";

import { collection, onSnapshot, addDoc} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";




export default function EditPed({ navigation }) {

  const [docprod, setDocprod]=useState([])
  const [docprodadd, setDocprodadd]=useState([])
  
  const route= useRoute();
  const p=route.params;
  //console.log(route.params.ingrediente, 'Ingredientes de hamburguesa.....')
  let mensaje = route.params.extra;
  console.log(mensaje);
  let arr = mensaje.split(' ');
  const of=[];


  

    useEffect( () => {
      onSnapshot(collection(db,"receta"), (querysnapshot) => {
        
        
        querysnapshot.forEach((doc) => {
          let color_itm='green'
          let col_txt='sticker-check-outline'
          const {nombre, imagen}= doc.data();

          arr.forEach(element => {
            
            if(nombre.toLowerCase() ==element.toLowerCase()){
            //console.log(element, nombre,);
            of.push({
            id: doc.id,
            nombre,
            imagen,
            color_itm,
            col_txt

            })
          }
            
          });
          

        });
        
        setDocprodadd(of)
        setDocprod(of)
      })

    }, [])

   function Changes(x){
    let filterDp = docprod.filter((item) => item !== x)
    let fil = docprod.filter((item) => item === x)
    console.log(fil)

    fil[0].color_itm==='red' ? fil[0].color_itm='green' : fil[0].color_itm='red'
    fil[0].col_txt==='sticker-check-outline' ? fil[0].color_txt='sticker-remove-outline' : fil[0].color_txt='sticker-remove-outline'
    
    let color_itm=fil[0].color_itm
    let col_txt=fil[0].color_txt
     let nombre= fil[0].nombre
     let id= fil[0].id
     let imagen= fil[0].imagen
    filterDp.push({
      color_itm,
      col_txt,
      id,
      nombre,
      imagen
    })
    setDocprod(filterDp)
     

  console.log(filterDp,'.............................')
    //console.log(filterDp, fil)
        //of[x].color_itm='lightgreen'
        //setDocprod(of)
        //funciona 
    }

    function pressbut(){
      let extra=""
      let ex=''
      docprod.forEach((it)=>{
      if (it.color_itm==='green') {
        let x=it.nombre
        extra=extra+it.nombre+' '
        ex=x.substr(0,3)+', '+ex
      }
    })
    let nombre=p.nombre+' >  Ex: '+ex
    let precio=p.precio
    let categoria=p.categoria
    let cant=1
    
      let estado="carrito"
      let iddoc="/Pedidos_n"
      addDoc(collection(db, iddoc), { nombre, cant, precio, estado, extra, categoria });
      navigation.navigate('Carrito')
       //navigation.replace('HomeScr')
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
    // <Suspense fallback={<Text style={{fontSize:40, fontWeight:"bold", alignSelf:"center", backgroundColor:'lightgreen', color:'black'}}>load</Text>}> 
    
    <TouchableHighlight underlayColor="white" onPress={()=> Changes(item)}>
    <View style={{flexDirection:'row',marginHorizontal:5, marginVertical:1, borderRadius:10, borderBottomWidth:1, borderColor:'black', height:40, }}>
      <Image style={{height:30, width:30, marginVertical:5, marginHorizontal:10}} source={{ uri: item.imagen }} />
      {/* <Text style={styleshs.title}> nombre</Text> */}
      <Text style={{fontSize:20, flex:1, fontWeight:'500', color:'black', alignSelf:"center"}}> {item.nombre}</Text>
      <Icon 
      style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={30} color={item.color_itm} name={item.col_txt}  />

    </View>
  </TouchableHighlight>

    // </Suspense> 
  );

  function T(){
    return(
      <View>
       <FlatList 
      style={{marginBottom:1}}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />

  <View style={{backgroundColor:'lightgray', margin:10, borderRadius:5}}>
    <Text style={{fontSize:16,alignSelf:'center', marginTop:10, fontWeight:'bold', color:'black',backgroundColor:'lightgray'}}>
        Extra</Text>

     <FlatList 
      style={{marginBottom:1}}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />      
       </View>
</View>
        
    )
  }



  return (
    
      <View style={{flex:1, backgroundColor:'white'}}> 
       <View style={{flexDirection:'row', backgroundColor:'green',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('HomeScr') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:26, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white', margin:5 }}>Editar...</Text>
      
      </View>
      
      <View style={{ borderColor:'gray', borderWidth:1}}>
        {/* <View style={{flexDirection:'row', alignSelf:'center'}}>
        <Image style={{height:100, width:100, margin:10, borderRadius:10}} source={{uri: route.params.imagen }}/>
      <Text style={{fontSize:25,alignSelf:'center',marginVertical:10, fontWeight:'bold', color:'gray',}}></Text>
      
     </View> */}
      
      <Text style={{fontSize:16,alignSelf:'center',marginTop:10, marginHorizontal:10, fontWeight:'bold', color:'black',}}>
        Opciones</Text>
      
             
     </View>

     <T/>
    
     
     <View style={{backgroundColor:'white',borderTopColor:'black', borderTopWidth:1}}>
          <TouchableOpacity
          style={{backgroundColor:'#E57373', marginHorizontal:10,marginVertical:10, paddingVertical:10,
        borderRadius:10, borderWidth:2,borderColor:'orange'}}
        onPress={()=>pressbut()}
          >
            <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}>Agregar al pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
      
  );
}
