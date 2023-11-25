import { createStackNavigator } from '@react-navigation/stack';
import Detail from '../screen/Detail';
import Home from '../screen/Home';
import { LoginScreen } from '../screen/login';
import { Register } from '../screen/Register';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Text} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../db/screens/menu/HomeScreen';
import Detpedido from '../db/screens/menu/detpedido';
import Categoria from '../db/screens/menu/Categorias';
import DetCategoria from '../db/screens/menu/DetCategorias';
import DetProducto from '../db/screens/menu/DetProducto';
import Cantidad from '../db/screens/menu/Cantidad';
import Examp from '../db/screens/menu/exa';

import Carrito from '../db/screens/menu/Carrito_Fbase';
import Busqueda from '../db/screens/menu/Busqueda';
import Maps from '../db/screens/maps/Maps';
import Ubicacion from '../db/screens/menu/Noticias';
import Recetas from '../db/screens/menu/Recetas';
import Noticias from '../db/screens/menu/Noticias';
import Usuario from '../db/screens/menu/Usuario';
import BuscarReceta from '../db/screens/menu/buscarReceta';
import EditPed from '../db/screens/menu/EditPed';
import EditDeletPed from '../db/screens/menu/EditDeletPed';
// import PrinterScreen from '../db/bt';


export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();



export const Navigation=()=> {
  return (
    <Stack.Navigator
    
    screenOptions= {{
        headerShown: false,
        cardStyle: {
          backgroundColor:'lightblue'
        }
      }}
      >

      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeScr1" component={HomeScreen} />
      <Stack.Screen name="HomeScr" component={App_tab} />
      <Stack.Screen name="Categoria" component={Categoria} />
      <Stack.Screen name="DetCat" component={DetCategoria} />
      <Stack.Screen name="DetProducto" component={DetProducto} />
      <Stack.Screen name="DetPedido" component={Detpedido} />
      <Stack.Screen name="Busqueda" component={Busqueda} />
      <Stack.Screen name="examp" component={Examp} />
      <Stack.Screen name="Map" component={Maps} />
      <Stack.Screen name="Recetas" component={Recetas} />
      <Stack.Screen name="BuscRecetas" component={BuscarReceta} />
      <Stack.Screen name="EditPed" component={EditPed} />
      <Stack.Screen name="EditDeletPed" component={EditDeletPed} />
      
      
    </Stack.Navigator>
  );
}
export const load = async () => {
    try {
      const value = await AsyncStorage.getItem('UserKey');
      if (value !== null) {
          <App_tab/>
        console.log(value);
      }
    } catch (error) {
      console.log('Error retrieving data', error);
    }
  }

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({  color, size }) => {
        let iconName = 'menu';
        switch (route.name) {
          case 'Home':
            iconName = 'home'
            break;
          case 'Carrito':
            iconName = 'cart'
            break;
          case 'Categoria':
            iconName = 'menu'
            break;
          case 'Usuario':
            iconName = 'account'
            break;
        }
        return <Icon   size={32} color={color} name={iconName}  />
        ;
      },
      tabBarActiveTintColor: '#09af00',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel:false,      
      tabBarStyle: {
        height:50             
        
      }
      
    })}
    >
      <Tab.Screen
      
      options={{
        headerShown:false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#00838F'
       }}}
      name="Home" component={HomeScreen} />
      
      <Tab.Screen
      options={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'green'
       }}}
      name="Categoria" component={Categoria} />
      
      <Tab.Screen
      options={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'orange'
       }}}
      name="Carrito" component={Carrito} />
      <Tab.Screen
      options={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#00838F'
       }}}
      name="Usuario" component={Usuario} />
    </Tab.Navigator>
  );
}

export function App_tab() {
  return (
      <MyTabs />
  );
}