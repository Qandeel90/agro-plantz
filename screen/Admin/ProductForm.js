import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Icon from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState("");
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(JSON.stringify(props.route.params.item.price));
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(JSON.stringify(props.route.params.item.countInStock));
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addProduct = () => {
    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            console.log(res.data);
            setTimeout(() => {
              props.navigation.navigate("Product");
            }, 500);
          }
        })
        .catch((error) => {
          console.log("mess", error);
        });
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            console.log(res.data);
            alert("Product uploded successfully");
            setTimeout(() => {
              props.navigation.navigate("Product");
            }, 500);
          }
        })
        .catch((error) => {
          alert("Product uploded unsuccessfully");
          console.log(error.message);
        });
    }
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon style={{ color: "white" }} name="camera" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Brand"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Price"
          name="price"
          id="price"
          value={price}
          keyboardType={"numeric"}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Stock"
          name="stock"
          id="stock"
          value={countInStock}
          keyboardType={"numeric"}
          onChangeText={(text) => setCountInStock(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          name="description"
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
        <View
          style={{
            justifyContent: "space-between",

            alignContent: "center",
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 40,
            paddingHorizontal: 30,
            paddingVertical: 5,
            marginBottom: 10,
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#a9a9a9" }}>Category</Text>
          <Picker
            style={{ width: "55%" }}
            selectedValue={pickerValue}
            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          >
            {categories.map((c) => {
              return <Picker.Item key={c.id} label={c.name} value={c.id} />;
            })}
          </Picker>
        </View>

        {err ? <Error message={err} /> : null}

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            backgroundColor: "#319f5e",
            marginVertical: 10,
            borderRadius: 40,
            alignItems: "center",
          }}
          onPress={() => addProduct()}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const Error = (props) => {
  return (
    <View>
      <Text>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    backgroundColor: "white",
    justifyContent: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#319f5e",
    padding: 8,
    borderRadius: 100,
  },
});

export default ProductForm;
