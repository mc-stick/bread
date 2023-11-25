
import { Text, View, TouchableOpacity, StyleSheet, Modal, Pressable} from 'react-native'
import React, { useState, Component } from 'react'

import styles from './style'
import { TextInput } from 'react-native-gesture-handler';


function Vent_cant({navigation}) {
    return (
      <View style={styles.mod_centeredView}>
        <Modal
          animationType="slide"
          transparent={true}>
            
          <View style={styles.mod_centeredView}>
            <View style={styles.mod_modalView}>
              <Text style={styles.mod_modalText}>Hello World!</Text>
                <TextInput keyboardType='numeric' placeholder='cantidad'></TextInput>
              <Pressable
                style={[styles.mod_button, styles.mod_buttonOpen]}
                onPress={() => navigation.navigate('Cantidad')}
                >
                <Text style={styles.mod_textStyle}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.mod_button, styles.mod_buttonClose]}
                onPress={() => navigation.navigate('Pedido')}
                >
                <Text style={styles.mod_textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  export default Vent_cant