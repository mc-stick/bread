import React from "react";
import { Text, View  } from "react-native";
import { Contador } from "./src/screen/Contador";
import { HolaMundo } from "./src/screen/HolaMundo";
import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/Nav/NavScreen";

export const App = () =>{

   return(
    //<HolaMundo/>
    <NavigationContainer>
      
    <Navigation/>

    </NavigationContainer>
    //<Contador/>
   )


}