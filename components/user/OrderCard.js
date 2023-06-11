import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Picker, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "3") {
      setStatusText("Pending");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setStatusText("Shipped");
      setCardColor("#F1C40F");
    } else {
      setStatusText("Delivered");
      setCardColor("#2ECC71");
    }

    return () => {
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          console.log("success");
          setTimeout(() => {
            props.navigation.navigate("Product");
          }, 500);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold" }}>Order Number </Text>
        <Text>#{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: cardColor }}>Status: {statusText}</Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>Date Ordered: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        {props.editMode ? (
          <View>
            <Picker
              selectedValue={statusChange}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setStatusChange(itemValue)
              }
            >
              {codes.map((code) => (
                <Picker.Item
                  label={code.name}
                  value={code.code}
                  key={code.code}
                />
              ))}
            </Picker>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginVertical: 10,
                backgroundColor: "#319f5e",
                alignItems: "center",
                borderRadius: 40,
              }}
              onPress={() => updateOrder()}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "black",
    fontWeight: "bold",
  },
});

export default OrderCard;
