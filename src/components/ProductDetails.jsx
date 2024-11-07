import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ReactNativeModal from "react-native-modal";
import { colors } from "../constants";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "./Toast";

const screenWidth = Dimensions.get("window").width;

const DynamicTable = ({ data }) => {
  if (!data || typeof data !== "object") return null;

  const tableKeys = Object.keys(data); // The keys will be the rows
  const tableValues = Object.values(data); // The values will be the data in a single column

  const tableData = tableKeys.map((key, index) => [
    key,
    ":",
    tableValues[index],
  ]);
  return (
    <View style={stylesTable.table}>
      {tableData.map((rowData, index) => (
        <View key={index} style={stylesTable.row}>
          <Text style={stylesTable.key} numberOfLines={1}>
            {rowData[0]}
          </Text>
          <Text style={stylesTable.separator}>{rowData[1]}</Text>
          <Text style={stylesTable.value}>{rowData[2]}</Text>
        </View>
      ))}
    </View>
  );
};

const stylesTable = StyleSheet.create({
  table: {
    marginTop: 10,
    width: "100%", // Adjust as needed
    backgroundColor: colors.dark,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  key: {
    minWidth: 70,
    paddingVertical: 1,
    color: colors.lightGray,
    paddingRight: 8,
    fontWeight: "bold",
    fontSize: RFValue(10),
    textAlign: "left",
    // borderEndWidth: 1,
  },
  value: {
    width: 125, // Fixed width for value column
    color: colors.lightGray,
    paddingHorizontal: 10,
    fontSize: RFValue(10),
    textAlign: "left",
    textAlignVertical: "center",
  },
  separator: {
    justifyContent: "center",
    width: 10,
    textAlign: "center",
    alignItems: "center",
    color: colors.lightGray,
    fontWeight: "bold",
    fontSize: RFValue(10),
    textAlignVertical: "center",
  },
});

const ProductDetailsModel = ({
  updateQuantity,
  isProductDetailsVisible,
  setIsProductDetailsVisible,
  onAddCartButtonPress,
  productDetails,
  navigation,
  setProductDetails
}) => {
  const toastRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalAmount , setTotalAmount] = useState(productDetails?.individualItem*productDetails?.individualPrice + productDetails?.masterItem*productDetails?.masterPrice + productDetails?.innerItem*productDetails?.innerPrice);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    checkLogin();
  }, []);
  useEffect(() => {
    setTotalAmount(productDetails?.individualItem*productDetails?.individualPrice + productDetails?.masterItem*productDetails?.masterPrice + productDetails?.innerItem*productDetails?.innerPrice);
  }, [productDetails]);
  function handleAddToCart() {
    
    if (isLoggedIn) {
      
      onAddCartButtonPress();
      return;
    } else {
      Alert.alert("Login Required", "Please log in to access this feature.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.replace("login") },
      ]);
      return;
    }
    if(productDetails?.individualItem === 0 && productDetails?.masterItem === 0 && productDetails?.innerItem === 0){
      toastRef.current.show({
        type: "error",
        text: "Please select quantity",
        duration: 1000,
      });
      return;
    }
  }
  const [bigImageUrl, setBigImageUrl] = useState(productDetails?.images[0]);

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setBigImageUrl(productDetails?.images[0]);
    }
  }, [productDetails]);

  return (
    <ReactNativeModal
      isVisible={isProductDetailsVisible}
      onBackdropPress={() => setIsProductDetailsVisible(false)}
      onBackButtonPress={() => setIsProductDetailsVisible(false)}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
    <Toast ref={toastRef} />
      <View
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: colors.dark,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          <View
            style={{ flexDirection: "column", width: "90%", marginBottom: 8 }}
          >
            <Text style={styles.productName} numberOfLines={1}>
              {productDetails?.name}
            </Text>
            <Text style={styles.subCategory}>#sub category</Text>
          </View>
          <TouchableOpacity onPress={() => setIsProductDetailsVisible(false)}>
            <AntDesign
              name="closesquare"
              size={RFValue(24)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imagesContainer}>
            <Image source={{ uri: bigImageUrl }} style={styles.mainImage} />
            <View style={styles.imageList}>
              {productDetails?.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setBigImageUrl(image)}
                >
                  <Image
                    source={{ uri: image }}
                    style={[
                      styles.sideImages,
                      bigImageUrl === image && {
                        borderWidth: 3,
                        borderColor: colors.primary,
                        borderRadius: 5,
                      },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, alignItems: "center" }}>
            {productDetails?.code && (
              <Text style={styles.productCode}>
                Product Code: {productDetails?.code}
              </Text>
            )}

            <View style={{ width: screenWidth - 40 }}>
              <DynamicTable data={productDetails?.meta} />
            </View>
          </View>
         
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default ProductDetailsModel;
const { width } = Dimensions.get("window");
const circleSize = width * 0.1;
const styles = StyleSheet.create({
  productName: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "90%",
    color: colors.white,
  },
  subCategory: {
    fontSize: RFValue(11),
    color: colors.muted,
    opacity: 0.8,
  },
  imagesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  mainImage: {
    aspectRatio: 1,
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 15,
    mixBlendMode: "multiply",
  },
  imageList: {
    flexDirection: "column",
    gap: 10,
    marginLeft: 2,
  },
  sideImages: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 5,
  },
  productCode: {
    fontSize: RFValue(14),
    marginTop: 8,
    color: colors.primary,
  },
  productPrice: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: colors.white,
  },
  innerBox: {
    backgroundColor: colors.dark,
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  innerBoxTitle: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "90%",
    color: colors.lightGray,
    paddingVertical: 4,
  },
  productAndMultiplicationIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice: {
    paddingHorizontal: 16,
    fontSize: RFValue(16),
    color: colors.primary,
  },
  allBoxes: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  totalAmount: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: colors.primary,
    paddingVertical: 8,
    marginRight: 16,
    alignItems: "center",
    alignSelf: "center",
  },
  addToCart: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    margin: 16,
    alignItems: "center",
  },
  addToCartText: {
    color: colors.dark,
    fontSize: 16,
  },
});
