import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Icon } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";

const CustomModel = ({ navigation, ...props }) => {
  const { name, price, description, image, setModalVisible, modalVisible } =
    props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 20,
            paddingLeft: 15,
            paddingRight: 25,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
            Product Details
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              backgroundColor: "red",
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderRadius: 30,
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
        {
          //upper part of the modal
        }
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              width: "100%",
              height: 400,
              alignItems: "center",
              justifyContent: "center",
              flex: 3.5,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={{ width: "100%", height: 300 }}
              ></Image>
            </View>
          </View>
          {
            //lower part of the modal
            <View
              style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 2 }}
            >
              <Text style={{ fontSize: 25, fontWeight: "500" }}>{name}</Text>
              <Text
                style={{
                  fontWeight: "200",
                  fontSize: 17,
                  color: "grey",
                  paddingVertical: 8,
                }}
              >
                {description}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>Total Price</Text>
                  <Text style={{ fontSize: 25, fontWeight: "500" }}>
                    ${price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 160,
                    height: 45,
                    backgroundColor: "#319f5e",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    props.addItemToCart({
                      name,
                      image,
                      price,
                      description,
                    }),
                      alert("Added to cart");
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </Modal>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(CustomModel);
