import { View, Text, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'


import { FlatList } from 'react-native-gesture-handler';
import db from "../../fire_config";

import { collection, onSnapshot} from "firebase/firestore";

const Notificaciones = ({navigation}) => 
  {
    
    const [docnot, setDocnot]=useState([])

    useEffect( () => {
      onSnapshot(collection(db,"notificaciones"), (querysnapshot) => {
        const not = [];

        querysnapshot.forEach((doc) => {
          const {title, description}= doc.data();
            
          not.push({
            id: doc.id,
           title,
           description
          })

        });

        setDocnot(not)

      })

    }, [])
    

    return(
      <ScrollView>
        {docnot.map(notifi => {
          return(
            <FlatList
            onPress={() => {navigation.navigate('notifydet', notifi)}}
            bottomDivider 
            key={notifi.id}
            style={{
              borderTopWidth:2,
              borderTopColor:"#303F9F",
              height:80
            }}
            ><FlatList/>
            <FlatList>
              <FlatList style={{fontSize:20, fontWeight:"bold", marginTop:5}}>{notifi.title}</FlatList>
              <FlatList style={{fontSize:16, margin:5}}>Toca para mas información</FlatList>
              </FlatList>

            </FlatList>
          )
        })}
      </ScrollView>
    )
    
};
export default Notificaciones
