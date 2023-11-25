import React from 'react';
import { View, Text } from 'react-native';

export default function Background() {
  return (
    <View
    style={{
        position: 'absolute',
        backgroundColor:'#12950F',
        width: 600,
        height: 1000,
        left:-50,
        top:-200,
        transform:[
            {rotate: '45deg'}
        ]
    }}
    >
      
     </View>
  );
}
