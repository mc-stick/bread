import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props{
    title: string;
    onPress: ()=> void;
    onLprss?: ()=> void;
    position?: 'btn_l' | 'btn_r' // el signo de interrogacion significa opcional.
                                  // sin el ? significa obligatorio.
}


export const Fab = ({title, onPress, onLprss, position='btn_l'}: Props)=> {

   

  return (

    <TouchableOpacity
        style={
                (position==='btn_r')
                ? style.butlocat_R
                : style.butlocat_L
                
            }

        onPress={ onPress}
        onLongPress={onLprss}
        >
            <View style={[style.but,{backgroundColor:'white'}]}>
            
            <Text style={style.butText}
         >{title}</Text> 
         
          </View>

    </TouchableOpacity>
  );
}

export const Norm_Fab = ({title, onPress}: Props)=> {

   

    return (
  
      <TouchableOpacity
          style={{}}
  
          onPress={ onPress}
          >
              <View style={[{width: 40, height:40,
        borderRadius:100,
        borderWidth:2,
        borderColor:'orange',backgroundColor:'white', alignItems:'center'}]}>
              
        <Text style={{fontSize:30, justifyContent:'center', margin:1, top:-5}}
           >{title}</Text> 
           
            </View>
  
      </TouchableOpacity>
    );
  }

const style = StyleSheet.create({

    but: {
        width: 60,
        height:60,
        borderRadius:100,
        borderWidth:2,
        borderColor:'orange',
        
    },
    butText:{
        fontSize: 40,
        fontWeight:'bold',
        alignSelf:'center',
        shadowColor: '#000',
        color:'black'
    },
    butlocat_R:{
        position: 'absolute',
        right:0,
        
    },
    butlocat_L:{
        position: 'absolute',
        left:0,
    }


    })
