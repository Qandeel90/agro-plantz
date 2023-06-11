import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swipeout from "react-native-swipeout";
var { width } = Dimensions.get("window");

const ListItem = (props) => {
  const data = props;
  var swipeoutBtns = [
    {
      backgroundColor: "#fe535300",
      onPress: () => {
        props.delete(props.id);
      },
      component: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fe5353",
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            marginVertical: 7,
            marginRight: 10,
          }}
        >
          <Icon
            name="delete"
            color="white"
            size={35}
            containerStyle={{ marginRight: 10 }}
          />
        </View>
      ),
    },
  ];
  var rightbtn = [
    {
      backgroundColor: "#fe535300",
      onPress: () => {
        props.navigation.navigate("ProductForm", { item: props });
      },
      component: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#319f5e",
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            marginVertical: 7,
            marginRight: 10,
          }}
        >
          <Icon
            name="edit"
            color="white"
            size={35}
            containerStyle={{ marginRight: 10 }}
          />
        </View>
      ),
    },
  ];

  return (
    <Swipeout
      left={swipeoutBtns}
      right={rightbtn}
      style={{ backgroundColor: "#eee" }}
    >
      <View
        elevation={2}
        style={{
          backgroundColor: "white",
          marginHorizontal: 20,
          padding: 20,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 17,
        }}
        key={Math.random()}
      >
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontWeight: "700" }}> {data.name} </Text>
          <Text numberOfLines={2} style={{ color: "#3d3d3d" }}>
            {data.description}
          </Text>
          <Text style={{ fontWeight: "700" }}>$ {data.price}</Text>
        </View>
        <Image
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          style={{ height: 70, width: 80, resizeMode: "contain" }}
        />
      </View>
    </Swipeout>
  );
};

export default ListItem;
