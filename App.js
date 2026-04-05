import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [logado, setLogado] = useState(null);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setLogado(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (logado === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {!logado ? (
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignInScreen {...props} onLogin={checkToken} />}
            </Stack.Screen>

            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} onLogout={checkToken} />}
            </Stack.Screen>

            <Stack.Screen name="History" component={HistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}