import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import baseURL from "../assets/common/baseUrl";
import { logoutUser } from "../Context/actions/Auth.actions";
import axios from "axios";
import AuthGlobal from "../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function DrawerBar({ ...props }) {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [activeTab, setActiveTab] = React.useState("Home");
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      axios
        .get(`${baseURL}users/${context.stateUser.user.userId}`)
        .then((user) => {
          setUserProfile(user.data);
        })
        .catch((error) => console.log(error));
    } else if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      setUserProfile("");
    }
  }, [userProfile, context.stateUser.isAuthenticated]);

  return (
    <DrawerContentScrollView>
      <View style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            marginLeft: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderWidth: 2,
              width: 110,
              height: 110,
              borderColor: "#319f5e",
              borderRadius: 90,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-person" size={70} color="black" style={{}} />
          </View>
          <View>
            <TouchableOpacity onPress={() => console.log()}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
              >
                {context.stateUser.isAuthenticated
                  ? "Hi, " + userProfile.name
                  : "Hi, Guest"}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {context.stateUser.isAuthenticated ? userProfile.email : ""}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <DrawerItem
            style={{
              backgroundColor: activeTab === "Home" ? "#319f5e57" : "#FFF",
            }}
            label="Home"
            labelStyle={{
              color: activeTab === "Home" ? "#319f5e" : "gray",
            }}
            focused={props.state.routes}
            onPress={() => {
              setActiveTab("Home");
              props.navigation.navigate("Home");
            }}
            icon={() => (
              <Ionicons
                name="ios-home"
                size={25}
                color={activeTab === "Home" ? "#319f5e" : "gray"}
              />
            )}
          />
          <DrawerItem
            style={{
              backgroundColor: activeTab === "Product" ? "#319f5e57" : "#FFF",
            }}
            label="Product"
            labelStyle={{ color: activeTab === "Product" ? "#319f5e" : "gray" }}
            onPress={() => {
              setActiveTab("Product");
              props.navigation.navigate("Product");
            }}
            icon={() => (
              <Ionicons
                name="grid"
                size={25}
                color={activeTab === "Product" ? "#319f5e" : "gray"}
              />
            )}
          />
          <DrawerItem
            style={{
              backgroundColor: activeTab === "Cart" ? "#319f5e57" : "#FFF",
            }}
            label="Cart"
            labelStyle={{ color: activeTab === "Cart" ? "#319f5e" : "gray" }}
            onPress={() => {
              setActiveTab("Cart");
              props.navigation.navigate("Cart");
            }}
            icon={() => (
              <Ionicons
                name="ios-cart"
                size={25}
                color={activeTab === "Cart" ? "#319f5e" : "gray"}
              />
            )}
          />
          <DrawerItem
            style={{
              backgroundColor: activeTab === "Profile" ? "#319f5e57" : "#FFF",
            }}
            label="Profile"
            labelStyle={{
              color: activeTab === "Profile" ? "#319f5e" : "gray",
            }}
            onPress={() => {
              setActiveTab("Profile");
              props.navigation.navigate("Profile");
            }}
            icon={() => (
              <Ionicons
                name="ios-person"
                size={25}
                color={activeTab === "Profile" ? "#319f5e" : "gray"}
              />
            )}
          />
          {context.stateUser.user.isAdmin == true ? (
            <DrawerItem
              style={{
                backgroundColor: activeTab === "Admin" ? "#319f5e57" : "#FFF",
              }}
              label="Dashboard"
              labelStyle={{
                color: activeTab === "Admin" ? "#319f5e" : "gray",
              }}
              onPress={() => {
                setActiveTab("Amin");
                props.navigation.navigate("Admin");
              }}
              icon={() => (
                <Ionicons
                  name="stats-chart"
                  size={25}
                  color={activeTab === "Profile" ? "#319f5e" : "gray"}
                />
              )}
            />
          ) : null}
        </View>
      </View>
      {context.stateUser.isAuthenticated === true ? (
        <TouchableOpacity
          style={{ marginHorizontal: 10, marginVertical: 20 }}
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            alert("Sign Out successfully"),
            props.navigation.closeDrawer(),
            logoutUser(context.dispatch),
            context.stateUser.isAuthenticated === false,
          ]}
        >
          <Text
            style={{
              backgroundColor: "#ff3e3e",
              padding: 10,
              color: "white",
              fontWeight: "bold",
              borderRadius: 5,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      ) : null}
    </DrawerContentScrollView>
  );
}
