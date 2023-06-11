import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const AdminProducts = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ paddingTop: 25, flex: 1 }}>
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: "#319f5e8f",
            borderRadius: 50,
            position: "absolute",
            padding: 20,
            marginLeft: 20,
            bottom: 1,
            top: 3,
            left: -15,
          }}
        ></View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "500",
            paddingLeft: 20,
            paddingBottom: 20,
          }}
        >
          Admin Panal
        </Text>
      </View>

      <View style={{}}>
        <TextInput
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 40,
            paddingVertical: 10,
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 40,
            backgroundColor: "white",
          }}
          placeholder="Serach..."
          onChangeText={(text) => searchProduct(text)}
        ></TextInput>
        <Icon
          name="search"
          size={20}
          color="grey"
          style={{
            position: "absolute",
            left: 30,
            top: 33,
          }}
        ></Icon>
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#319f5e" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: "#319f5e",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={() => props.navigation.navigate("Order")}
        >
          <Text style={{ color: "white" }}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: "#319f5e",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Text style={{ color: "white" }}>Add Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: "#319f5e",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={() => props.navigation.navigate("AdminCategories")}
        >
          <Text style={{ color: "white" }}>Add Categories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminProducts;
