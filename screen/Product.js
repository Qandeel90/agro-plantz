import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";

import Products from "../components/home/Products";
import ProductComp from "../components/Product/ProductComp";
import axios from "axios";
import baseUrl from "../assets/common/baseUrl";
import HeaderTab from "../components/home/HeaderTab";
export default function Product({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
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
    <View style={{ flex: 1 }}>
      <ProductComp activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Products
            navigation={navigation}
            filterProduct={filterProduct}
            ProductItems={products}
            route={route}
          ></Products>
        </View>
      </ScrollView>
    </View>
  );
}
