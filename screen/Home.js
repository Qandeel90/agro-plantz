import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, Button } from "react-native";

import Categories from "../components/home/Categories";
import HeaderTab from "../components/home/HeaderTab";
import Products from "../components/home/Products";
import baseUrl from "../assets/common/baseUrl";
import SearchPro from "./SearchPro";
import axios from "axios";

export default function Home({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Leaf Rust");
  const [activeTabIcon, setActiveTabIcon] = React.useState("Home");
  useEffect(() => {
    if (activeTab === "Leaf Rust") {
      axios
        .get(`${baseUrl}products?categories=6206982108c6363ab8c9a031`)
        .then((res) => {
          setProducts(res.data);
        });
    } else if (activeTab === "Stem Rust") {
      axios
        .get(`${baseUrl}products?categories=6206984608c6363ab8c9a032`)
        .then((res) => {
          setProducts(res.data);
        });
    } else
      axios.get(`${baseUrl}products`).then((res) => {
        setProducts(res.data);
      });
  }, [setProducts, activeTab]);

  const filterProduct = products;

  return (
    <>
      {<HeaderTab navigation={navigation} route={route}></HeaderTab>}
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,

          backgroundColor: "white",
        }}
      >
        <SearchPro navigation={navigation}></SearchPro>
      </View>
      <Categories
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      ></Categories>

      <Text
        style={{
          fontSize: 30,
          fontWeight: "500",
          paddingLeft: 20,
          paddingVertical: 20,
          backgroundColor: "white",
        }}
      >
        Products
      </Text>

      <ScrollView
        style={{ backgroundColor: "white", paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Products
          navigation={navigation}
          filterProduct={filterProduct}
          ProductItems={products}
          route={route}
        ></Products>
      </ScrollView>
    </>
  );
}
