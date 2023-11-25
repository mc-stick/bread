import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {

const { top } =  useSafeAreaInsets();

  return (
    <View>
      <Text style={{...Style.title, top: top+20}}> Homescreen</Text>
     </View>
  );
}

const Style = StyleSheet.create({

  Text:{

  },
  title:{
    fontSize:20, 
    fontWeight:'bold',
    borderColor:'black',
    borderBottomWidth:1,
    paddingBottom:10
  }

})


