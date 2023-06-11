import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";
import CustomModel from "./CustomModel";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import baseUrl from "../assets/common/baseUrl";
import { Icon } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
export default function Detection() {
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [predict, setPredict] = useState("Desease");
  const [confidence, setConfidence] = useState("0.0");
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageA, setImageA] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    if (predict === "leaf_rust") {
      axios
        .get(`${baseUrl}products?categories=6206982108c6363ab8c9a031`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => console.log(error));
    } else if (predict === "stem_rust") {
      axios
        .get(`${baseUrl}products?categories=6206984608c6363ab8c9a032`)
        .then((res) => {
          setProducts(res.data);
        });
    } else if (predict === "healthy_wheat") {
      setProducts(null);
    }

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [predict, products]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };
  const cameraImg = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };
  const resizeImg = async () => {
    let resize = await manipulateAsync(
      mainImage || image,
      [{ resize: { width: 256, height: 256 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );
    if (!resize == "") {
      console.log(resize);

      setImage(resize.uri);
    }
  };

  const Detection = () => {
    let formData = new FormData();
    resizeImg();
    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("file", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://137.184.234.221/predict", formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setPredict(res.data.class);
          setConfidence(res.data.confidence);
          console.log(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <ScrollView>
      <View style={{ paddingTop: 30 }}>
        <CustomModel
          image={imageA}
          name={name}
          description={description}
          price={price}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        ></CustomModel>
        <Image
          style={{
            height: 200,
            width: "100%",

            backgroundColor: "white",

            borderWidth: 1,
          }}
          source={{ uri: mainImage }}
        />
        <TouchableOpacity
          style={{
            padding: 30,
            backgroundColor: "transparent",
            borderRadius: 20,
            position: "absolute",
            top: 30,
            height: 200,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="image" type="ionicon" size={33} color="#1212127b"></Icon>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#319f5e",
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 10,
              paddingHorizontal: 20,

              marginHorizontal: 20,
              alignItems: "center",
            }}
            onPress={cameraImg}
          >
            <Icon name="camera" type="ionicon" color="white" size={26}></Icon>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#319f5e",
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 10,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              alignItems: "center",
            }}
            onPress={pickImage}
          >
            <Icon name="images" type="ionicon" color="white" size={26}></Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#319f5e",
            marginTop: 20,
            paddingVertical: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginHorizontal: 20,
            alignItems: "center",
          }}
          onPress={() => {
            image == null ? alert("Please select image first") : Detection(),
              setLoading(true);
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Detect
          </Text>
        </TouchableOpacity>

        <View
          elevation={3}
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="virus"
                type="material-community"
                color="#319f5e"
                size={26}
              ></Icon>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                }}
              >
                {predict}
              </Text>
            </View>

            <ProgressCircle
              percent={parseFloat(confidence) * 100}
              radius={39}
              borderWidth={7}
              color="#319f5e"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Confidence
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {parseFloat(confidence).toFixed(2) * 100}%
              </Text>
            </ProgressCircle>
          </View>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#319f5e" />
          </View>
        ) : predict ? (
          <>
            {predict === "leaf_rust" ? (
              <View
                style={{
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  elevation: 5,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", paddingTop: 10 }}
                >
                  Rust treatment and control
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {
                    "> Remove and destroy all leaves and plant parts affected by rust."
                  }
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {
                    "> You might have to destroy badly infected plants completely to prevent them infecting other plants of the same species."
                  }
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {
                    "> Spray with a suitable rust control product containing fungicide,repeating as recommended."
                  }
                </Text>
              </View>
            ) : predict === "stem_rust" ? (
              <View
                style={{
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  elevation: 5,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", paddingTop: 10 }}
                >
                  Stem rust treatment and control
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {
                    "> Inspect wheat crops every 7 to 10 days from flag leaf emergence to early dough grain development."
                  }
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {
                    "> Carefully inspect different plant parts, especially the lower stems, for symptoms of stem rust. Spend at least 15 minutes walking through each wheat crop."
                  }
                </Text>
                <Text style={{ fontSize: 14, paddingTop: 10 }}>
                  {"> Consider chemical/organic fungicides."}
                </Text>
              </View>
            ) : null}

            {products ? (
              <View
                style={{
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "white",
                  elevation: 5,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    paddingTop: 10,
                  }}
                >
                  Recommended Products
                </Text>
                {products.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true),
                        setImageA(item.image),
                        setName(item.name),
                        setDescription(item.description),
                        setPrice(item.price);
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        elevation: 4,
                        backgroundColor: "white",
                        marginTop: 10,
                        marginVertical: 5,
                        borderRadius: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        marginHorizontal: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {item.name}
                      </Text>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                        }}
                        source={{ uri: item.image }}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
}
