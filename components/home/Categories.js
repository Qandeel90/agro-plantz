import React, { useState, useEffect } from "react";
import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";
import Products from "./Products";

const Categories = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "500",
          paddingLeft: 20,
          paddingBottom: 20,
        }}
      >
        Categories
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <CategoryButton
          text="Leaf Rust"
          btnColor="#319f5e"
          textColor="#fff"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <CategoryButton
          text="Stem Rust"
          btnColor="#fff"
          textColor="#319f5e"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </View>
  );
};
const CategoryButton = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          elevation: 3,
          backgroundColor: props.activeTab === props.text ? "#319f5e" : "#fff",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 25,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={() => props.setActiveTab(props.text)}
      >
        <Text
          style={{
            color: props.activeTab === props.text ? "#fff" : "black",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {props.text}
        </Text>
        <View>
          {props.activeTab === props.text ? (
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/home/a1.png")}
            ></Image>
          ) : (
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/home/a2.png")}
            ></Image>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Categories;
