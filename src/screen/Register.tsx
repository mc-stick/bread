import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Logo from '../component/logo';
import { useForm } from '../hooks/useForms';
import { loginStyle } from './theme/logintheme';

interface Props extends StackScreenProps<any, any>{}

export const Register =({navigation}: Props)=>{


    const {nomb, email, pass, onChange} = useForm({
        nomb:'',
        email:'',
        pass:''
    });

    const onRegister = () =>{
        console.log({email, pass});
        Keyboard.dismiss()
        navigation.replace('Login')
        
        
    }

    return(
        <ScrollView style={{backgroundColor:'#0470C8'}}>
        <KeyboardAvoidingView
        style={{
            flex: 1, backgroundColor:'#0470C8'
        }}
        behavior={(Platform.OS === 'ios' ? 'padding': 'height')}
        >


        <View style={loginStyle.formcontainer}>
        

        <Text style={[loginStyle.title,{alignSelf:'center'}]}>Registro</Text>
        
        
        <Text style={loginStyle.label}>Nombre</Text>
        <TextInput
            placeholder="Ingresa tu nombre"
            placeholderTextColor='lightgray'
            keyboardType='default'
            underlineColorAndroid='black'
            selectionColor='white'

            onChangeText={(value)=> onChange(value, 'nomb')}
            value={nomb}
            

            autoCapitalize="words"
            autoCorrect={false}

            style={{color:'white'}}
        />
        <Text style={loginStyle.label}>Usuario</Text>
        <TextInput
            placeholder="Usuario"
            placeholderTextColor='lightgray'
            keyboardType='email-address'
            underlineColorAndroid='black'
            selectionColor='white'
            

            onChangeText={(value)=> onChange(value, 'email')}
            value={email}
            

            autoCapitalize="words"
            autoCorrect={false}

            style={{color:'white'}}
        />

        <Text style={loginStyle.label}>Contraseña</Text>
        <TextInput
            placeholder="Contraseña"
            placeholderTextColor='lightgray'
            underlineColorAndroid='black'
            selectionColor='white'
            secureTextEntry={true}

            onChangeText={(value)=> onChange(value, 'pass')}
            value={pass}

            style={{color:'white'}}
        />
        <Text style={loginStyle.label}>Confirmar Contraseña</Text>
        <TextInput
            placeholder="Ingresa de nuevo tu Contraseña"
            placeholderTextColor='lightgray'
            underlineColorAndroid='black'
            selectionColor='white'
            secureTextEntry={true}

            onChangeText={(value)=> onChange(value, 'pass')}
            value={pass}
            onSubmitEditing={onRegister}

            style={{color:'white'}}
        />
         
        <View style={loginStyle.butoncontainer}></View>            
        

            <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyle.buton}
            onPress={onRegister}
            >
                <Text style={loginStyle.text}>
                    Registrar
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={ ()=> navigation.replace('Login')}
            style={[loginStyle.butonreturn,{backgroundColor:'#1086E6'}]}
            >
                <Text style={{color:'white', fontWeight:'bold'}}>
                    
                    🍕 Volver
                </Text>

            </TouchableOpacity>
        </View> 
        </KeyboardAvoidingView>
        </ScrollView>
    )
}
