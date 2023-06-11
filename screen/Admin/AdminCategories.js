import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheetContext } from "styled-components";

var { width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.delete(props.item._id)}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const AdminCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.log(error + categories));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => {
        setCategories([...categories, res.data]);
        alert("Category add successfully");
      })
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
        alert("Delete Successfully");
      })
      .catch((error) => alert("Error to load categories"));
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} delete={deleteCategory} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            placeholder="Category Name"
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => addCategory()}>
            <Text
              style={{
                backgroundColor: "#319f5e",
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 20,
                color: "white",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    paddingLeft: 10,
    width: 200,
    paddingVertical: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  item: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 17,
  },
  button: {
    color: "white",

    backgroundColor: "#E74C3C",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default AdminCategories;
