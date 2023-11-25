import { Alert, Text, View, Dimensions, TouchableOpacity,Image, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { n } from './detpedido'


 var not=[];

  const Cantidad = ({ navigation}) => {

  const [lista, setLista]=useState([]);
  
  const getroute = useRoute();
  
  useEffect(() => {

  let n=getroute.params
  console.log(n,'this is route');

    if(n===undefined){
      console.log('n no funciona');
    }else{

      n.map( (xtem)=>{
        let id=xtem['id'];
        let nombre=xtem['nombre'];
        let precio=xtem['precio'];
        let sub=xtem['sub'];
        let cant=xtem['cant']

        if (not.length===0){
          not.push({id,nombre,precio,sub,cant});
        }else{

          let tof= not.find(function(c){
            return c.id===id;
          })
          if(tof){
            console.log('funciona');
          }
          else{
            not.push({id,nombre,precio,sub,cant});
            console.log(not,'this is else not');
          }
        }
      })
    }
  
        // hacer que la lista guarde mas de un elemento
   setLista(not)
  }, [])

  function functionDelet(x){

    let newlist=[]

    if(not.length==1){
      not.pop()
    } else{
      newlist=not.filter(not => not.id !== x)
      not=newlist
    }
    setLista(newlist)
    
  }

  

  // function longpress(i,t,c){
  //   Alert.alert(
  //     "ELIMINAR:",
  //     '\n('+c+') '+t,
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => functionDelet(i) }
  //     ]
  //   );
  // }

  // function funtCont(){

  //   if (lista=='') {
  //     Alert.alert('AVISO.',
  //     'Debes pedir por lo menos 1 producto para continuar.',
  //     [
  //       { text: " AÑADIR + ", onPress: () => navigation.navigate('DetCat') }
  //     ])
  //   }else{
  //     navigation.navigate('Confirmar', lista)
  //   }
  // }



  const renderRecipes = ({item}) => (
    // <Suspense fallback={<Text style={{fontSize:40, fontWeight:"bold", alignSelf:"center", backgroundColor:'red', color:'black'}}>load</Text>}> 
      
    
      <View style={{backgroundColor:'white', borderBottomWidth:2, borderColor:'black', flex:1, marginVertical:5 }} >
        {/* <Text style={styleshs.title}> nombre</Text> */}
        <View style={{flexDirection:'row', margin:5}}>
          <Text style={[{flex:1,left:5,top:5,fontSize:25, fontWeight:'bold', color:'black'}]}> {item.nombre}</Text>
          <TouchableOpacity
          onPress={()=>functionDelet(item.id)}
          style={{ position:'absolute',right:5,top:5,backgroundColor:'red', borderRadius:100, borderWidth:1, borderColor:'red', paddingHorizontal:7, paddingVertical:1}}
          >
          <Text style={{fontSize:15,fontWeight:'bold',color:'white',}}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', flex:1, margin:10}}>
          <View style={{flex:1}}>
            <Text style={[{fontSize:20, fontWeight:'bold', color:'black'}]}> Precio</Text>
            <Text style={[{fontSize:20, fontWeight:'400', color:'blue'}]}> RD$ {item.precio}</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={[{textAlign:'center',fontSize:20, fontWeight:'bold', color:'black'}]}> Cantidad</Text>
            <Text style={[{textAlign:'center',fontSize:20, fontWeight:'400', color:'blue'}]}>X {item.cant}</Text>
          </View>
          <View style={{ flex:1}}>
            <Text style={[{textAlign:'right',fontSize:20, fontWeight:'bold', color:'black'}]}> Subtotal</Text>
            
            <Text style={[{textAlign:'right',fontSize:20, fontWeight:'400', color:'blue'}]}>RD$ {item.sub}</Text>
          </View>
        
        </View>
      </View>
    

    // </Suspense> 
  );
  
  
  return(
        
    <View style={{flex:1, backgroundColor:'#ffecb3'}}> 
        
      <FlatList 
      vertical
      showsVerticalScrollIndicator={true}
      data={lista}
      renderItem={renderRecipes}
      keyExtractor={(item) => `${item.id}`} />
      
      <View style={{backgroundColor:'white',borderTopColor:'black', borderTopWidth:1}}>
        <TouchableOpacity
        style={{backgroundColor:'black', marginHorizontal:10,marginVertical:10, paddingVertical:10,
      borderRadius:5, borderWidth:2,borderColor:'orange'}}
      onPress={()=>navigation.navigate('Home')}
        >
          <Text style={{fontSize:25, fontWeight:'bold',textAlign:'center', color:'white'}}>Procesar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
  

};


export default Cantidad

