import { Text, View, TouchableOpacity, StyleSheet, Modal, Pressable} from 'react-native'
import React, { useState, Component } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome' 

import styles from './style'
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import db from "../../db/fire_config";

import { collection, getDocs} from "firebase/firestore";



const Pedido = ({navigation}) => {
    const [users, setUsers] = useState([]);



    const colect2 = async () =>{
      const users = [];
      const querySnapshot = await getDocs(collection(db, "user"));
      querySnapshot.forEach((doc) => {
        const { name, email, phone } = doc.data();
          users.push({
          id: doc.id,
          name,
          email,
        });
      });
      setUsers(users);
    }
    colect2();
  
     return (
        <View style={{flex: 1,}}>
        
        <View style={{flex:1,}}>
          <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 20,}}>aqui hay text</Text>
          <ScrollView>
            
  
            {users.map((user) => {
              return (
              <ListItem style={styles.container}
               key={user.id}
                bottomDivider
                onPress={() => {
                  navigation.navigate("DetPedido", {
                    userId: user.id,
                  });
                }}
              >
              <ListItem.Chevron />
              <Avatar
                source={{
                  uri:
                    "https://img.freepik.com/foto-gratis/tacos-mexicanos-carne-res-salsa-tomate-salsa_2829-14221.jpg?w=740&t=st=1659314594~exp=1659315194~hmac=b07bb63b723ca5ec437f899e8d0c896dbe4f6d9e404a3af9c7011a25ac2fe595",
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
  
        </View>
  
        
    </View>
  )
    
    };
    




export default Pedido

 

  
 