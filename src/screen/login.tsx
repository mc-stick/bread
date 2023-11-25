import { StackScreenProps } from "@react-navigation/stack";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Background from "../component/backgroound";
import Logo from "../component/logo";
import { useForm } from "../hooks/useForms";
import { loginStyle } from "./theme/logintheme";

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen =({navigation}: Props)=>{

    const {email, pass, onChange} = useForm({
        email:'',
        pass:''
    });

    const onLogin = () =>{
        console.log({email, pass});
        Keyboard.dismiss()
        navigation.replace('HomeScr')
        
    }

    return(
        <ScrollView style={{backgroundColor:"#12950F"}}>
        <Background/>

        <KeyboardAvoidingView
        style={{
            flex: 1,
        }}
        behavior={(Platform.OS === 'ios' ? 'padding': 'height')}
        >


        <View style={loginStyle.formcontainer}>
        <Logo/>

        <Text style={[loginStyle.title,{alignSelf:'center'}]}>Iniciar sesión</Text>
        
        
        <Text style={loginStyle.label}>Usuario</Text>
        <TextInput
            placeholder="Usuario"
            placeholderTextColor='lightgray'
            keyboardType='email-address'
            underlineColorAndroid='black'
            selectionColor='white'

            onChangeText={(value)=> onChange(value, 'email')}
            value={email}
            
            style={{color:'white'}}
            autoCapitalize="none"
            autoCorrect={false}

            
        />

        <Text style={loginStyle.label}>Contraseña</Text>
        <TextInput
            placeholder="Contraseña"
            placeholderTextColor='lightgray'
            underlineColorAndroid='black'
            selectionColor='white'
            secureTextEntry={true}
            style={{color:'white'}} 
            onChangeText={(value)=> onChange(value, 'pass')}
            value={pass}
            onSubmitEditing={onLogin}
        />
         
        <View style={loginStyle.butoncontainer}></View>            
        

            <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyle.buton}
            onPress={onLogin}
            >
                <Text style={loginStyle.text}>
                    Iniciar Sesión
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={ ()=> navigation.replace('Register')}
            style={[loginStyle.buton,{marginTop:20,}]}
            >
                <Text style={[loginStyle.text]}>
                    Registrarse
                </Text>

            </TouchableOpacity>
        </View> 
        </KeyboardAvoidingView>
        </ScrollView>
    )
}