import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../components/user/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Icon from "react-native-vector-icons/Ionicons";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: {
                Authorization: `Bearer ${res}`,
              },
            })
            .then((user) => {
              setUserProfile(user.data);
              console.log("Find", user);
            });
        })
        .catch((error) => console.log("hello" + error.message));

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          //filter orders by userId
          const data = x.data;
          const userOrders = data.filter(
            (order) => order.user.id === context.stateUser.user.userId
          );
          setOrders(userOrders);
        })

        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 70,
          marginHorizontal: 20,
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 20,
          borderRadius: 30,
        }}
      >
        <Icon name="person" size={50}></Icon>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>
            {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ fontSize: 18 }}>
            {userProfile ? userProfile.phone : ""}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#ff5a5f",
              paddingHorizontal: 30,
              paddingVertical: 10,
              borderRadius: 40,
              marginTop: 30,
            }}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              alert("Sign Out successfully"),
              logoutUser(context.dispatch),
            ]}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Orders</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        {orders ? (
          orders.map((x) => {
            return <OrderCard key={x.id} {...x} />;
          })
        ) : (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text>You have no orders</Text>
          </View>
        )}
      </View>

      <View style={{ marginTop: 80 }}></View>
    </ScrollView>
  );
};

export default UserProfile;
