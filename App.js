import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Acesso" }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Cadastro" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Gerador" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Minhas Senhas" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}