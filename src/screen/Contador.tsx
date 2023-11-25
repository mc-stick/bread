import React, { useState } from 'react';
import { StyleSheet,View, Text, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Fab } from '../component/Fab';

export const Contador = () => {

    const [contador, setContador] = useState(10);

  return (
    <View style={{
        backgroundColor:'gray', flex:1,
        justifyContent:'center'}}>
            
      <Text style={{textAlign:'center', fontSize:45}}>
        contador: {contador} </Text>
        
        <Fab
            title='+1'
            position='btn_r'
            onPress={ ()=> setContador (contador+1)}
        />

        <Fab
            title='-1'
            onPress={ ()=> setContador (contador-1)}
        />

        {/* <TouchableOpacity
        style={style.butlocat_R}
        onPress={ ()=> setContador( contador + 1)}
        >
            <View style={[style.but,{backgroundColor:'green'}]}>
            <Text style={style.butText}
         >+</Text></View>

        </TouchableOpacity>

        <TouchableOpacity
        style={style.butlocat_L}
        onPress={ ()=> setContador( contador - 1)}
        >
            <View style={[style.but,{backgroundColor:'red'}]}>
            <Text style={style.butText}
         >-</Text></View>

        </TouchableOpacity> */}
     </View>
  );
}

const style = StyleSheet.create({

    but: {
        width: 60,
        height:60,
        borderRadius:100,
        borderWidth:2,
        borderColor:'black',
        
    },
    butText:{
        color: 'white',
        fontSize: 40,
        fontWeight:'bold',
        alignSelf:'center',
    },
    butlocat_R:{
        position: 'absolute',
        right:25,
        bottom: 25
    },
    butlocat_L:{
        position: 'absolute',
        left:25,
        bottom: 25
    }


    })

