// Routes.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentsScreen from "../screens/Students.web";
import { Text } from "react-native";
import Layout from "../components/Layout";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="layout" component={Layout} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
