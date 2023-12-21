import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const Sidebar = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/yellowLine.png")}
          style={{ height: 23, width: 4 }}
        />
        <Text>CRUD OPERATIONS</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#F1F5F9",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.drawerContent}>
        <View>
          <View style={styles.userProfileContainer}>
            <View style={{ position: "relative" }}>
              <Image
                source={require("../../assets/avatar.svg")}
                style={styles.userProfileAvatar}
              />
              <Image
                source={require("../../assets/greenEllipse.svg")}
                style={styles.userOnlineStatus}
              />
            </View>

            <View>
              <Text style={styles.userProfileName}>Ali Veli</Text>
              <Text style={styles.userProfileRole}>Admin</Text>
            </View>
          </View>

          <View style={{ marginTop: 22 }}>
            <DrawerItemList {...props} />
          </View>
        </View>

        <View>
          <DrawerItem
            label="Setting"
            icon={({ color, size }) => (
              <Feather name="settings" size={16} color="#64748B" />
            )}
            onPress={() => {}}
          />
          <DrawerItem
            label="Log Out"
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" size={16} color="#64748B" />
            )}
            onPress={() => {}}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 26,
    flexDirection: "row",
    gap: 10,
  },
  drawerContent: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    flex: 1,
    justifyContent: "space-between",
  },
  userProfileContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
  },
  userProfileAvatar: { height: 30, width: 30 },
  userOnlineStatus: { height: 8, width: 8, position: "absolute", right: 0 },
  userProfileName: {
    fontWeight: "600",
    fontSize: 14,
  },
  userProfileRole: {
    fontWeight: "500",
    fontSize: 12,
    color: "#64748B",
  },
});

export default Sidebar;
