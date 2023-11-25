import React, { useLayoutEffect,useEffect, useState, Suspense,  } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, TouchableOpacity, ImageBackground,StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native'
import styleshs from "../maps/styles";
import MenuImage from "../maps/MenuImage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";
import { App_tab } from "../../../Nav/NavScreen";



export default function DetCategoria({ navigation }) {

  const route= useRoute();
  const title_get= route.params;


  const [docprod, setDocprod]=useState([])

    useEffect( () => {
      onSnapshot(collection(db,"producto"), (querysnapshot) => {
        const prod = [];
        
        querysnapshot.forEach((doc) => {
          const {nombre, descripcion, imagen, categoria, precio, ingrediente, extra}= doc.data();
            
            if (categoria==title_get){

               prod.push({
                  id: doc.id,
                  nombre,
                  descripcion,
                  imagen,
                  precio,
                  categoria,
                  ingrediente,
                  extra
                })

            } 
            
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
    
    <TouchableHighlight underlayColor="green" onPress={()=> navigation.navigate("DetPedido", item)}>
      <View style={{borderWidth:1, borderColor:'black', marginVertical:5, marginTop:10, backgroundColor:'#ffecb3'}}>
      <View style={{flex:1, flexDirection:"row"}}>
        <View style={[styles.quizAttrLeft,{ margin:10,marginLeft:10}]}>
          <Image style={{height:100, width:100, borderRadius: 20, borderWidth:1, borderColor:'black' }} source={{ uri: item.imagen }} />
        </View>
        <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
          <Text style={[{fontSize:25, fontWeight:'bold', color:'black'}]}>{item.nombre}</Text>
          <Text style={[{fontSize:25, fontWeight:'bold', color:'green'}]}>RD$ {item.precio}</Text>
        </View>
        
      </View>
      {/* <View style={styles.quizAttrContent}>
                 <View style={styles.quizAttrLeft}>
                    
                    <Text style={styles.infoText}>tl</Text>
                </View>
                 <View style={styles.quizAttrMid}>
                    
                    <Text style={styles.infoText}>tx</Text>
                </View>
                <View style={styles.quizAttrRight}>
                    
                    <Text style={styles.infoText}>tr</Text>
                </View>
            </View> */}
</View>
    </TouchableHighlight>
    
    // </Suspense> 
  );

  return (
    
      <View style={{flex:1, backgroundColor:'#fff'}}> 
      <View style={{flexDirection:'row', backgroundColor:'#3DAF00',}}>
        <TouchableOpacity>
         <Icon onPress={()=>navigation.replace('Categoria') } style={{left:5, top:5, fontWeight:'bold', marginRight:30}} size={40} color="white" name="arrow-left"  />
        </TouchableOpacity>
        <Text  style={{fontSize:30, justifyContent:'center', padding:5,
      fontWeight:'bold', color:'white' }}>{title_get}</Text>
      </View>
      
      <FlatList 
      vertical
      showsVerticalScrollIndicator={true}
      data={docprod}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      
      </View>  
  );
}

const styles = StyleSheet.create({
  quizAttrContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    margin: 5,
    paddingTop: 3
  },
  quizAttrLeft:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 2
  },
  quizAttrMid:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quizAttrRight:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 2
  },
  infoText:{
    color: '#676767',
    fontSize: 15
  },
  infoIcon:{
    color: "#676767",
    marginRight: 5
  }
});
