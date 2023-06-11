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
import * as actions from "../../Redux/Actions/cartActions";

const Products = ({ navigation, ...props }) => {
  useEffect(() => {}, [checked]);
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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
      {props.filterProduct.map((item, index) => (
        <View
          style={{
            elevation: 5,
            marginTop: 5,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            borderRadius: 30,
            marginBottom: 20,
          }}
          key={index}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true),
                setImage(item.image),
                setName(item.name),
                setDescription(item.description),
                setPrice(item.price);
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ProductText
                name={item.name}
                description={item.description}
                price={item.price}
              ></ProductText>
              <ProductImage image={item.image}></ProductImage>
            </View>
          </TouchableOpacity>

          <ProductBtn addToCart={props.addItemToCart} item={item}></ProductBtn>
        </View>
      ))}
    </View>
  );
};
const ProductText = (props) => {
  return (
    <View style={{ width: "55%" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{props.name}</Text>
      <Text numberOfLines={3} style={{ color: "grey" }}>
        {props.description}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.price}</Text>
    </View>
  );
};
const ProductImage = (props) => {
  return (
    <View>
      <Image
        style={{ height: 100, width: 95, resizeMode: "contain" }}
        source={{ uri: props.image }}
      ></Image>
    </View>
  );
};
const ProductBtn = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#319f5e",
        height: "100%",
        width: "15%",
        position: "absolute",
        right: 0,
        flexDirection: "row",
        justifyContent: "center",

        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,

        alignItems: "center",
      }}
      onPress={() => (props.addToCart(props.item), alert("Added to cart"))}
    >
      <Icon
        size={28}
        type="material"
        color={"white"}
        name="add-shopping-cart"
      ></Icon>
    </TouchableOpacity>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(Products);
