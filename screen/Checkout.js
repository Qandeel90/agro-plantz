import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthGlobal from "../Context/store/AuthGlobal";

import { connect } from "react-redux";

const countries = require("../assets/countries.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      console.log("User not authenticated");
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    console.log("orders", orderItems);
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };

    props.navigation.navigate("Confirm", { order: order });
  };

  return (
    <>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 10,
            }}
          ></View>

          <View style={{ marginHorizontal: 20 }}>
            <TextInput
              placeholder="Phone"
              name="phone"
              value={phone}
              keyboardType={"numeric"}
              onChangeText={(text) => setPhone(text)}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Shipping Address 1"
              name="ShippingAddress1"
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Shipping Address 2"
              name="ShippingAddress2"
              value={address2}
              onChangeText={(text) => setAddress2(text)}
              style={styles.textinput}
            />
            <TextInput
              placeholder="City"
              name="city"
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Zip Code"
              name="zip"
              value={zip}
              keyboardType={"numeric"}
              onChangeText={(text) => setZip(text)}
              style={styles.textinput}
            />
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                alignContent: "center",
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 40,
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginBottom: 10,
                borderWidth: 0.5,
                borderColor: "#d3d3d3",
              }}
            >
              <Text style={{ color: "#a9a9a9" }}>Country</Text>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => setCountry(itemValue)}
                style={{ width: "45%" }}
              >
                {countries.map((country) => (
                  <Picker.Item
                    label={country.name}
                    value={country.name}
                    key={country.code}
                  ></Picker.Item>
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 15,
                backgroundColor: "#319f5e",
                margin: 10,
                borderRadius: 40,
                alignItems: "center",
              }}
              onPress={() => checkOut()}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
