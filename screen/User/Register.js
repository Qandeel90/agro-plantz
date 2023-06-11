import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements/dist/icons/Icon";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseUrl}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          ToastAndroid.showWithGravity(
            "Registered Successfully",
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
          setTimeout(() => {
            navigation.navigate("login");
          }, 500);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        ToastAndroid.showWithGravity(
          "Something went wrong",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 120, alignSelf: "center" }}>
          <Image
            style={{
              height: 152,
              width: 99,
            }}
            source={require("../../assets/home/logo.png")}
          ></Image>
        </View>
        <View style={{ marginTop: 70, marginBottom: 30 }}>
          <View style={styles.inputCon}>
            <Icon
              name="person-outline"
              type="ionicons"
              color="#3d3d3d"
              size={20}
            />

            <TextInput
              id="name"
              name="name"
              style={styles.input}
              placeholder="Name "
              onChangeText={(text) => setName(text)}
            ></TextInput>
          </View>
          <View style={styles.inputCon}>
            <Icon
              name="mail-outline"
              type="ionicons"
              color="#3d3d3d"
              size={20}
            />

            <TextInput
              id="email"
              name="email"
              style={styles.input}
              placeholder="E-mail Address"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text.toLowerCase())}
            ></TextInput>
          </View>
          <View style={styles.inputCon}>
            <Icon name="call" type="ionicons" color="#3d3d3d" size={20} />

            <TextInput
              id="phone"
              name="phone"
              style={styles.input}
              placeholder="Phone no"
              keyboardType="number-pad"
              onChangeText={(text) => setPhone(text)}
            ></TextInput>
          </View>
          <View style={styles.inputCon}>
            <Icon
              name="lock-outline"
              type="ionicons"
              color="#3d3d3d"
              size={20}
            />
            <TextInput
              id="password"
              name="password"
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
        </View>
        {error ? <ErrorMsg message={error} /> : null}
        <Regbtn register={register}></Regbtn>

        <TouchableOpacity
          style={{
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("login")}
        >
          <Text
            style={{
              color: "#319f5e",
              fontSize: 13,
            }}
          >
            {" "}
            Have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
  },
  inputCon: {
    width: "90%",
    height: 60,
    backgroundColor: "white",
    margin: 10,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#3d3d3d",
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
const Regbtn = (props) => {
  return (
    <View style={{ paddingBottom: 30, paddingHorizontal: 20 }}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "#319f5e",
          margin: 10,
          justifyContent: "center",
          borderRadius: 20,

          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={() => {
          props.register();
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};
const ErrorMsg = (props) => {
  return (
    <View style={{ alignSelf: "center", paddingTop: 10 }}>
      <Text style={{ color: "red", fontSize: 13 }}>{props.message}</Text>
    </View>
  );
};
