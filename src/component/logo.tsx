import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Logo() {
  return (
    <View style={{
        alignItems:'center'
    }}>
        <Image
        source={require('../assets/logo.png')}
        style={{
            marginTop:50,
            width: 100,
            height:100,
        }}
        />
      

     </View>
  );
}
