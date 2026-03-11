import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator,View } from "react-native";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import HomeScreen from "../screen/HomeScreen";

export type RootStackParamList ={
    Login:undefined
    Signup : undefined
    Home :undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ()=>{
    const {user,loading}= useAuth();
    if(loading){
        return (<View style={{flex : 1, justifyContent : 'center',alignItems:'center'}}>
            <ActivityIndicator size={"large"}/>
        </View>)
    }
    
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleAlign :'center'}}>
               {user ? (<Stack.Screen component={HomeScreen} name = "Home"/>):(
                <>
                <Stack.Screen component={LoginScreen} name="Login"/>
                <Stack.Screen component={SignupScreen} name="Signup"/>
                </>
               )}

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;
