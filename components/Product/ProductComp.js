import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

export default function ProductComp(props) {
  useEffect(() => {}, [props.activeTab]);
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        paddingVertical: 20,
      }}
    >
      <Filterone
        name="All"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        BottomLeftRadius={20}
        BottomRightRadius={0}
        TopLeftRadius={20}
        TopRightRadius={0}
        category={"Leaf Rust"}
      ></Filterone>

      <Filterone
        name="Leaf Rust"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        BottomLeftRadius={0}
        BottomRightRadius={0}
        TopLeftRadius={0}
        TopRightRadius={0}
        category="Leaf Rust"
      ></Filterone>
      <Filterone
        name="Stem Rust"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        BottomLeftRadius={0}
        BottomRightRadius={20}
        TopLeftRadius={0}
        TopRightRadius={20}
        category="Stem Rust"
      ></Filterone>
    </View>
  );
}
const Filterone = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.setActiveTab(props.name)}>
        <View
          style={{
            backgroundColor:
              props.activeTab === props.name ? "#319f5e" : "#fff",
            padding: 10,
            borderBottomLeftRadius: props.BottomLeftRadius,
            borderBottomRightRadius: props.BottomRightRadius,
            borderTopLeftRadius: props.TopLeftRadius,
            borderTopRightRadius: props.TopRightRadius,
          }}
        >
          <Text
            style={{
              color: props.activeTab === props.name ? "#fff" : "black",
            }}
          >
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
