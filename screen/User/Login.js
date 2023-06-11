import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Button,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

export default function Login({ navigation }) {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      ToastAndroid.showWithGravity(
        "Login Sucessfully",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      navigation.navigate("User");
    }
  }, [context.stateUser.isAuthenticated]);
  const handleSubmit = (props) => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 150, alignSelf: "center" }}>
          <Image
            style={{
              height: 152,
              width: 99,
            }}
            source={require("../../assets/home/logo.png")}
          ></Image>
        </View>
        <View style={{ marginTop: 80, marginBottom: 30 }}>
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
          {error ? <ErrorMsg message={error} /> : null}
        </View>
        <Loginbtn handleSubmit={handleSubmit}></Loginbtn>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#3d3d3d", fontSize: 13 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "#319f5e",
                fontSize: 13,
              }}
            >
              {" "}
              Create a new account
            </Text>
          </TouchableOpacity>
        </View>
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
const Loginbtn = (props) => {
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
          props.handleSubmit();
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
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
