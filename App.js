import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaScreen from "./screens/ListaScreen";
import DetalleScreen from "./screens/DetalleScreen";
import NuevoScreen from "./screens/NuevoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{ title: "Contactos" }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />
        <Stack.Screen
          name="Nuevo"
          component={NuevoScreen}
          options={{ title: "Nuevo contacto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}