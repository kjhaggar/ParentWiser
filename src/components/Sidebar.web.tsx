import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Link } from "@react-navigation/native";
import { SidebarItems } from "../constants/sidebarItems";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#F2EAE1",
    paddingHorizontal: 25,
    paddingVertical: 18,
  },
  sidebarHeader: {
    fontWeight: "700",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },
  sidebarProfile: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },
  sidebarProfileAvatar: {
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  sidebarProfileName: {
    fontWeight: "700",
    fontSize: 17,
  },
  sidebarProfileRole: {
    color: "#FEAF00",
    fontWeight: "500",
    fontSize: 14,
  },
  sidebarItems: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 50,
    padding: 15,
  },
  sidebarItem: {
    gap: 10,
  },
  sidebarItemText: {
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 18,
  },
});

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("Students");

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../assets/yellowLine.png")}
            style={{ height: 23, width: 4 }}
          />
          <Text style={styles.sidebarHeader}>CRUD OPERATIONS</Text>
        </View>
        <View style={styles.sidebarProfile}>
          <Image
            source={require("../../assets/avatar_2.svg")}
            style={styles.sidebarProfileAvatar}
          />
          <Text style={styles.sidebarProfileName}>Ali Veli</Text>
          <Text style={styles.sidebarProfileRole}>Admin</Text>
        </View>
        <View style={styles.sidebarItems}>
          <View style={styles.sidebarItem}>
            {SidebarItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.route}
                onPress={() => setActiveRoute(item.name)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  backgroundColor:
                    activeRoute === item.name ? "#FEAF00" : "transparent",
                  borderRadius: 8,
                }}
              >
                <View style={styles.sidebarItemText}>
                  {item.icon_web}
                  <Text>{item.name}</Text>
                </View>
              </Link>
            ))}
          </View>
          <Pressable style={styles.sidebarItemText}>
            <Text>{"Logout"}</Text>
            <Image
              source={require("../../assets/sign-out_1.svg")}
              style={{ width: 17, height: 17 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Sidebar;
