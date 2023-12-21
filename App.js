import React, { useEffect } from "react";
import { Platform } from "react-native";
import NativeApp from "./src/components/NativeApp";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/Routes";
// import { useFonts } from "expo-font";
import * as Font from "expo-font";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"), // 400
  //   "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"), // 500
  //   "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"), // 600
  //   "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"), // 700
  // });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"), // 400
        "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"), // 500
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"), // 600
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"), // 700
      });
    }

    loadFonts();
  }, []);

  return (
    <React.Fragment>
      {Platform.OS === "web" ? (
        <NavigationContainer>
          <AppNavigator></AppNavigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <NativeApp></NativeApp>
        </NavigationContainer>
      )}
    </React.Fragment>
  );
}
