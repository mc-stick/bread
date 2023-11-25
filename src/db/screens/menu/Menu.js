import {  Text, View,  Button,TouchableOpacity } from 'react-native'
import React ,{ useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'   
import styles from './style'

import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import db from "../../db/fire_config";

import { collection, getDocs} from "firebase/firestore";




const Menu = ({navigation}) => {
  
  const [users, setUsers] = useState([]);



  const colect2 = async () =>{
    try{ 
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
    catch(error){console.log(error)}
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
              // onPress={() => {
              //   navigation.navigation.navigate("DetUser", {
              //     userId: user.id,
              //   });
              // }}
            >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
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

      <View style={[styles.button_down,{flex: 1,}]}>


    
       

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
         >
              
          <Text style={styles.buttonText}>  Ordenar ahora  </Text>
          <FontAwesome name='arrow-right' size={23} color='#fff' ></FontAwesome>
        </TouchableOpacity>
     
      </View>
  </View>
)
}

export default Menu

