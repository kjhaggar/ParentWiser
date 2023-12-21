import React, { useRef } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "./Sidebar";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import StudentsScreen from "../screens/Students";

const NativeApp = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  const drawerRef = useRef(null);

  return (
    <Drawer.Navigator
      initialRouteName="Students"
      screenOptions={{
        headerTitle: () => (
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            CRUD OPERATIONS
          </Text>
        ),
        drawerActiveBackgroundColor: "#FFF9ED",
        drawerActiveTintColor: "#FEAF00",
        // headerRight: () => (
        //   <Ionicons
        //     name="ios-menu"
        //     size={30}
        //     color="black"
        //     style={{ marginRight: 15 }}
        //     onPress={() => navigation.openDrawer()} // Open the drawer on press
        //   />
        // ),
        // headerLeft: () => null,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={StudentsScreen}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="appstore1"
              size={16}
              color={focused ? "#FEAF00" : "#64748B"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Course"
        component={StudentsScreen}
        options={{
          drawerLabel: "Course",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="book"
              size={16}
              color={focused ? "#FEAF00" : "#64748B"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Students"
        component={StudentsScreen}
        options={{
          drawerLabel: "Students",
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="user-graduate"
              size={16}
              color={focused ? "#FEAF00" : "#64748B"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Payment"
        component={StudentsScreen}
        options={{
          drawerLabel: "Payment",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="creditcard"
              size={16}
              color={focused ? "#FEAF00" : "#64748B"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Report"
        component={StudentsScreen}
        options={{
          drawerLabel: "Report",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="filetext1"
              size={16}
              color={focused ? "#FEAF00" : "#64748B"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default NativeApp;
