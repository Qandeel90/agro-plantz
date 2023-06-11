import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../Redux/Actions/cartActions";
import HeaderTab from "../components/home/HeaderTab";
import { Icon } from "react-native-elements";
import AuthGlobal from "../Context/store/AuthGlobal";
import Swipeout from "react-native-swipeout";

const Cart = ({ navigation, ...props }) => {
  const context = useContext(AuthGlobal);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    var total = 0;
    var quantity = 0;
    props.cartItems.map((item) => {
      total += item.product.price * item.quantity;
      quantity += item.quantity;
    });
    setTotal(total);
  }, [props.cartItems]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.cartItems.map((item, index) => (
          <View key={index}>
            <CartCard
              name={item.product.name}
              image={item.product.image}
              price={item.product.price}
              quantity={item.quantity}
              description={item.product.description}
              removeCartItem={props.removeFromCart}
              item={item}
              increaseQuantity={props.increaseQuantity}
              decreaseQuantity={props.decreaseQuantity}
            />
          </View>
        ))}
      </ScrollView>
      <CartTotal
        quantity={props.quantity}
        cartItems={props.cartItems}
        total={total}
      ></CartTotal>
      <CheckOutbtn
        total={total}
        clearCart={props.clearCart}
        navigation={navigation}
        context={context}
      ></CheckOutbtn>
    </View>
  );
};

export const CartCard = (props) => {
  var swipeoutBtns = [
    {
      backgroundColor: "#fe535300",
      onPress: () => {
        props.removeCartItem(props.item);
      },
      component: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fe5353",
            borderBottomRightRadius: 20,

            borderTopRightRadius: 20,
            marginVertical: 7,
            marginRight: 10,
          }}
        >
          <Icon
            name="trash"
            type="font-awesome"
            color="white"
            size={35}
            containerStyle={{ marginRight: 10 }}
          />
        </View>
      ),
    },
  ];
  return (
    <Swipeout left={swipeoutBtns} style={{ backgroundColor: "#eee" }}>
      <View
        style={{
          flex: 1,

          paddingVertical: 6,
          paddingHorizontal: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            borderRadius: 25,
            backgroundColor: "#fff",
            width: "100%",
          }}
        >
          <Image
            style={{
              height: 70,
              width: 80,
              resizeMode: "contain",
            }}
            source={{ uri: props.image }}
          ></Image>
          <View style={{ flex: 0.8, paddingRight: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {props.name}
            </Text>
            <Text numberOfLines={2} style={{}}>
              {props.description}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              flex: 0.16,
            }}
          >
            ${props.price}
          </Text>
          <CartCounter
            quantity={props.quantity}
            increaseQuantity={props.increaseQuantity}
            decreaseQuantity={props.decreaseQuantity}
            item={props.item}
          />
        </View>
      </View>
    </Swipeout>
  );
};

const CartCounter = (props) => {
  const [count, setCount] = useState(1);
  return (
    <View>
      <View
        style={{
          width: 30,
          backgroundColor: "#319f5e",
          alignItems: "center",

          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#319f5e",
            width: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 6,
            borderBottomWidth: 1,
            borderBottomColor: "#fff",
          }}
          onPress={() => {
            if (props.quantity > 0) {
              props.increaseQuantity(props.item);

              setCount(count + 1);
            }
          }}
        >
          <Icon name="plus" type="font-awesome" color="white" size={15} />
        </TouchableOpacity>
        <Text style={{ color: "white", paddingVertical: 2 }}>{count}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#319f5e",
            width: "100%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 6,
            borderTopWidth: 1,
            borderTopColor: "#fff",
          }}
          onPress={() => {
            if (props.quantity > 1) {
              props.decreaseQuantity(props.item);
              setCount(count - 1);
            }
          }}
        >
          <Icon name="minus" type="font-awesome" color="white" size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const CartTotal = (props) => {
  const { total } = props;

  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          margin: 20,
          padding: 20,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Subtotal</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>${total}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Delivery</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>$0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Total</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>${total}</Text>
        </View>
      </View>
    </View>
  );
};
const CheckOutbtn = (props) => {
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {props.context.stateUser.isAuthenticated ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#319f5e",
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
            onPress={() => {
              props.navigation.navigate("Checkout");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Checkout
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#319f5e",
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Login
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 50,
            paddingVertical: 9,
            paddingHorizontal: 29,
            borderColor: "black",
            borderWidth: 1,
          }}
          onPress={() => {
            props.clearCart();
            alert("Cart Cleared");
          }}
        >
          <Text style={{ color: "#3d3d3d", fontWeight: "700", fontSize: 18 }}>
            CLEAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    increaseQuantity: (item) => dispatch(actions.increaseQuantity(item)),
    decreaseQuantity: (item) => dispatch(actions.decreaseQuantity(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
