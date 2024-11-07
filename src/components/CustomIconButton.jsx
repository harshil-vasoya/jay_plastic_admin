import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../constants";
import { RFValue } from "react-native-responsive-fontsize";

const CustomIconButton = ({ text, onPress, active , orderStatus}) => {

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: orderStatus? null:8,
    paddingHorizontal: orderStatus ?null:10,
    height: orderStatus ? 40:null,
    width: orderStatus ? 100:null,
    elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize:orderStatus? RFValue(12) :RFValue(8),
    color: colors.muted,
    fontWeight: "bold",
  },
  buttonIcon: {
    height: orderStatus ? 20:null,
    width: orderStatus ? 35:null,
    resizeMode: "contain",
  },
});
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.primary : colors.white },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: active ? colors.dark : colors.muted },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

