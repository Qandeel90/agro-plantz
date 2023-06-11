import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AuthGlobal from "../Context/store/AuthGlobal";
import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";

import axios from "axios";
import baseURL from "../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const context = useContext(AuthGlobal);
  const finalOrder = props.route.params;

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  const [orderitem, setOrderitems] = useState([]);

  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate();
    };
  }, [props]);

  // Add this
  const getProducts = (x) => {
    const order = x.order;
    var products = [];
    var orderitems = [];
    if (order) {
      order.orderItems.forEach((cart) => {
        axios
          .get(`${baseURL}products/${cart.product.id}`)
          .then((data) => {
            products.push(data.data);

            setProductUpdate(products);

            let oitems = { product: data.data.id, quantity: cart.quantity };
            orderitems.push(oitems);
            setOrderitems(orderitems);
          })
          .catch((e) => {
            console.log(e + "error");
          });
      });
    }
  };

  const confirmOrder = () => {
    /*let orderitem = [
      { quantity: 3, product: "62064ceb49e0df11bcb3321d" },
      { quantity: 3, product: "62064ded49e0df11bcb3321f" },
    ];*/
    const order = {
      user: context.stateUser.user.userId,
      orderItems: orderitem,
      status: "pending",
      shippingAddress1: finalOrder.order.shippingAddress1,
      shippingAddress2: finalOrder.order.shippingAddress2,
      city: finalOrder.order.city,
      state: finalOrder.order.state,
      zip: finalOrder.order.zip,
      country: finalOrder.order.country,
      phone: finalOrder.order.phone,
    };

    console.log("order:" + context.stateUser.user.userId);
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          console.log("Order Placed");
          alert("Order Placed Successfully");
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        alert("Order Placed Unsuccessfully");
        console.log(error.message + "er ");
      });
  };

  return (
    <View Style={styles.container}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        {props.route.params ? (
          <View style={{ backgroundColor: "white", borderRadius: 10 }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ justifyContent: "center" }}>
              <View style={styles.input}>
                <Text style={{ fontWeight: "bold" }}>Address: </Text>
                <Text>{finalOrder.order.shippingAddress1}</Text>
              </View>
              <View style={styles.input}>
                <Text style={{ fontWeight: "bold" }}>Address2: </Text>
                <Text>{finalOrder.order.shippingAddress2}</Text>
              </View>
              <View style={styles.input}>
                <Text style={{ fontWeight: "bold" }}>City: </Text>
                <Text>{finalOrder.order.city}</Text>
              </View>
              <View style={styles.input}>
                <Text style={{ fontWeight: "bold" }}>Zip Code: </Text>
                <Text>{finalOrder.order.zip}</Text>
              </View>
              <View style={styles.input}>
                <Text style={{ fontWeight: "bold" }}>Country: </Text>
                <Text>{finalOrder.order.country}</Text>
              </View>
            </View>
            <Text style={styles.title}>Items:</Text>

            <View style={{ height: 200 }}>
              <FlatList
                data={productUpdate}
                renderItem={({ item }) => (
                  <View
                    style={{
                      alignContent: "center",
                      flex: 1,
                      backgroundColor: "white",
                      flexDirection: "row",
                      marginVertical: 10,
                      paddingHorizontal: 20,
                      borderBottomColor: "#e6e6e6",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <View style={{}}>
                      <Text>{item.name}</Text>
                      <Text>${item.price}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => Math.random().toString()}
              />
            </View>
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 15,
              backgroundColor: "#319f5e",
              margin: 10,
              borderRadius: 40,
              alignItems: "center",
            }}
            onPress={() => confirmOrder()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    padding: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
