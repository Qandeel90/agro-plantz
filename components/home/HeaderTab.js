import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function HeaderTab({ navigation, route }) {
  return (
    <>
      <View
        style={{
          elevation: 5,
          backgroundColor: "white",
          paddingTop: "10%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 18,
          paddingBottom: 15,

          alignItems: "center",
        }}
      >
        {/*<TouchableOpacity>
          <Image
            style={{ width: 40, height: 35, resizeMode: "contain" }}
            source={require("../../assets/applogo.png")}
          ></Image>
          <View style={{ position: "absolute", left: 40, width: 200 }}>
            <Text style={{ fontWeight: "bold" }}>Agro</Text>
            <Text style={{ fontWeight: "bold" }}>Plantz</Text>
          </View>
      </TouchableOpacity>*/}
        {route.name === "Home " ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={30}></Ionicons>
          </TouchableOpacity>
        ) : route.name === "ProductDetail" ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30}></Ionicons>
          </TouchableOpacity>
        ) : null}
        {route.name === "Home " ? (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-circle" size={35}></Ionicons>
          </TouchableOpacity>
        ) : route.name === "ProductDetail" ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 190,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              {route.name}
            </Text>
          </View>
        ) : route.name === "Product" ? (
          <View>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              {route.name}
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
}
