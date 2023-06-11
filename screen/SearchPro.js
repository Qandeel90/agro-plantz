import React, { useState, useEffect } from "react";
import baseUrl from "../assets/common/baseUrl";
import axios from "axios";
import CustomModel from "./CustomModel";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { borderRightColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
export default SearchPro = ({ navigation, ...props }) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    axios.get(`${baseUrl}products`).then((res) => {
      setFilteredDataSource(res.data);
      setMasterDataSource(res.data);
    });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true),
            setImage(item.image),
            setName(item.name),
            setDescription(item.description),
            setPrice(item.price);
        }}
      >
        <Text style={styles.itemStyle}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <CustomModel
        image={image}
        name={name}
        description={description}
        price={price}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></CustomModel>
      <View>
        <View
          style={{
            elevation: 5,
            borderRadius: 17,
            backgroundColor: "white",
          }}
        >
          <SearchBar
            round
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              padding: 0,
            }}
            inputContainerStyle={{
              backgroundColor: "trasnparent",
            }}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder="Search..."
            value={search}
          />
        </View>

        {search.length > 0 ? (
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
  },
});
