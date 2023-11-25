import { View, Text, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'


const NotifyDetalle = () => {
    const getroute = useRoute();
  
    const n=getroute.params

   
  return (
    <ImageBackground
      resizeMode='cover'
      style={{flex:1, paddingVertical: 15,}}
      >
      
      <ScrollView>
          <View style={{alignItems:'center', marginVertical: 30,opacity:0.7, backgroundColor:'yellow',borderWidth:2, borderColor:'orange' }}>
              <Text style={{fontSize:20, fontWeight:"bold", margin:10}}>{n['title']}</Text>
          </View>
          <View style={{ backgroundColor:"#ffecb3",opacity:0.8, borderWidth:2, borderColor:'green'}}>
              <Text style={{fontSize:16, margin:'5%'}}>{n['description']}</Text>
          </View>
          
              
      </ScrollView>
    </ImageBackground>
  )
}

export default NotifyDetalle