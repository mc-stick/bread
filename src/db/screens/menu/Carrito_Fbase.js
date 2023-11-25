import React, { useLayoutEffect,useEffect, useState, Suspense } from "react";
import { FlatList,Alert, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground, TextInput } from "react-native";
  
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";
import styles from './style'
import { Fab, Norm_Fab } from '../../../component/Fab'

import db from "../../fire_config";

import { collection, onSnapshot, deleteDoc, doc, updateDoc, addDoc} from "firebase/firestore";



export default function Carrito({ navigation }) {
  const [view,setView]=useState(false);
  const [docprod, setDocprod]=useState([]);
  const [cant, setCant]=useState();

    useEffect( () => {
      onSnapshot(collection(db,"Pedidos_n"), (querysnapshot) => {
        const prod = [];
        let c=0;
        
        querysnapshot.forEach((doc) => {
          const {nombre, cant, precio,imagen, estado, categoria}= doc.data();

          let sub=precio*cant;
          

          if(estado=='carrito'){
            prod.push({ id: doc.id, nombre,imagen, cant, sub, precio, estado, categoria })
            c=c+sub;
          }

        });

        setDocprod(prod)
        setCant(c);

        if(prod.length==0){
        setView(false)
      }else{
        setView(true)
      }
      })

      //docprod.length===0 ? setView(true): setView(false) ;

      

    }, [])

    function funUpdate(x,f){
      let id = x.id
      let cant=x.cant;
      f? cant--: cant++;
      
      if(cant===0){
        functionDelet(id)
      }else{
        updateDoc(doc(db, "Pedidos_n", id), {cant})
      }
    }

    function functionDelet(x){

      deleteDoc(doc(db, 'Pedidos_n', x));
      
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

  function Confirmar(){
    Alert.alert(
      "Mensaje del sistema.",
      "Confirmar pedido?",
      [
        {
          text: "Cancelar",
          onPress: () => Alert.alert("AVISO.","Tu pedido permanecerá en el carrito hasta que nos envies el pedido."),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => detect(),
          style: "cancel",
        },
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       "Tu pedido se mantendra en el carrito hasta que confirmes el envio."
      //     ),
      // }
      )
  }

  function detect(){
    let beer=false;
    docprod.forEach((item)=>{
      
      if(item.categoria.toLowerCase()==='bebidas'){
        beer=true;
      }
      
    })

    if(!beer){
      Alert.alert(
        "Aviso del pedido",
        "No hemos detectado ninguna bebida en tu pedido. Deseas agregar algo de beber?.",
        [
          {
            text: "No gracias",
            onPress: () => send(),
            style: "cancel",
          },
          {
            text: "Si, si quiero.",
            onPress: () => navigation.navigate('DetCat', 'Bebidas'),
            style: "cancel",
          },
        ],
        // {
        //   cancelable: true,
        //   onDismiss: () =>
        //     Alert.alert(
        //       "Tu pedido se mantendra en el carrito hasta que confirmes el envio."
        //     ),
        // }
        )
    }else{
      send()
    }

  }

  function send(){
    
    Alert.alert('GRACIAS POR PREFERIRNOS.',"Pronto atenderemos tu pedido.")

    var today = new Date();
 
    // obtener la fecha y la hora
    var fecha = today.toLocaleString();
    let fact=today.getDate().toString()+today.getMonth().toString()+today.getFullYear().toString()+
    today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString()

    let cliente='Juan Rodriguez'
    let id_ped=fact 
    let lista="";
    let total;
    let estado = 'cola'
      docprod.forEach(element => {
        
        lista=element.cant+" "+element.nombre+",  "+lista;
        total=cant;

        deleteDoc(doc(db, "Pedidos_n", element.id))
        
      });addDoc(collection(db, "pedidos"), { id_ped, cliente, lista, total, estado, fecha });
    
        navigation.navigate('Home')
  }
    


  const renderRecipes = ({item}) => (
    <View style={{flexDirection:'row',backgroundColor:'white', borderBottomWidth:1, borderColor:'gray', flex:1, marginVertical:5, marginHorizontal:10 }} >
        {/* <Text style={styleshs.title}> nombre</Text> */}
        <View style={{}}>
          <Image style={{height:100, width:100, margin:5, borderRadius:5}} source={{uri: item.imagen }}/>
        </View>
        <View style={{flex:1}}>
          
        
        <View style={{flexDirection:'row', margin:5}}>
          <Text style={[{flex:1,top:5,fontSize:20, fontWeight:'bold', color:'black'}]}> {item.nombre}</Text>
          <TouchableOpacity
          onPress={()=>functionDelet(item.id)}
          style={{ position:'absolute',right:0,top:0,backgroundColor:'red', borderRadius:100, borderWidth:1, borderColor:'red', paddingHorizontal:7, paddingVertical:1}}
          >
          <Text style={{fontSize:15,fontWeight:'bold',color:'white',}}>X</Text>
          </TouchableOpacity>
          
        </View>
        <Text style={[{left:10,fontSize:14, fontWeight:'400', color:'gray'}]}>Unidad RD$ {item.precio}</Text>
        <View style={{flexDirection:'row', flex:1, margin:10}}>
        <View style={{flexDirection: "row", borderWidth:2, borderRadius:100, padding:2, borderColor:'black', marginVertical:5}}>
        
        <Norm_Fab
            title='-'
            onPress={ ()=>  funUpdate(item,true)}
        />                              
        <Text style={{alignSelf:'center', fontSize:15, color:'black', marginHorizontal:10, fontWeight:'bold'}}>
         {item.cant}</Text>

        <Norm_Fab
            title='+'
            onPress={ ()=> funUpdate(item,false)}
        />
      </View>
          {/* <View style={{flex:1}}>
            <Text style={[{textAlign:'center',fontSize:20, fontWeight:'bold', color:'black'}]}> Cantidad</Text>
            <Text style={[{textAlign:'center',fontSize:20, fontWeight:'400', color:'blue'}]}>X {item.cant}</Text>
          </View> */}
          <View style={{ flex:1}}>
            <Text style={[{textAlign:'right',fontSize:20, fontWeight:'bold', color:'black'}]}> Subtotal</Text>
            
            <Text style={[{textAlign:'right',fontSize:15, fontWeight:'bold ', color:'gray'}]}>RD$ {item.sub}</Text>
          </View>
        
        </View>
        </View>
      </View>
  );

    
  if(view===true){

  return (
    
    
      <View style={{flex:1, backgroundColor:'white'}}> 
      
      <FlatList 
      vertical
      showsVerticalScrollIndicator={true}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />

      <View style={{backgroundColor:'white',borderTopColor:'black', borderTopWidth:1}}>
        <TouchableOpacity
        style={{backgroundColor:'#2E7D32', marginHorizontal:10,marginVertical:10, paddingVertical:10,
      borderRadius:10, borderWidth:2,borderColor:'orange'}}
      onPress={ ()=> Confirmar()
        //()=>navigation.navigate('Map')
      }
        >
          <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}> Confirmar Pedido ( RD${cant} )</Text>
        </TouchableOpacity>
      </View>
      </View>  
  );}
  
  else{

    return (
      
      
        <View style={{flex:1, backgroundColor:'white'}}> 
        <View style={{flex:1, justifyContent:"center"}}>
        <Image
        source={require('../../../assets/cartEmpty.png')}
        style={{
          alignSelf:"center",
          borderRadius:100,
          margin:20,
            width: 100,
            height:100,
        }}
        />
          <Text style={{alignSelf: 'center'}}>Aun no has agregado articulos al carrito.</Text>
        </View>
        
        <View style={{backgroundColor:'white',borderTopColor:'black', borderTopWidth:1}}>
          <TouchableOpacity
          style={{backgroundColor:'#E57373', marginHorizontal:10,marginVertical:10, paddingVertical:10,
        borderRadius:10, borderWidth:2,borderColor:'orange'}}
        onPress={()=>navigation.navigate('Home')}
          >
            <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}>Agregar Articulos</Text>
          </TouchableOpacity>
        </View>
        </View>  
    );}
}
