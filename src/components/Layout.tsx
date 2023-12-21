import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import StudentsScreen from "../screens/Students.web";
import { createStackNavigator } from "@react-navigation/stack";
import Sidebar from "./Sidebar";

const Stack = createStackNavigator();

function Layout() {
  const Todo = () => {
    return <Text>Todo! 🎉</Text>;
  };
  return (
    <View style={styles.container}>
      <Sidebar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="students" component={StudentsScreen} />
        <Stack.Screen name="home" component={Todo} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  flexContainer: {},
});

export default Layout;
