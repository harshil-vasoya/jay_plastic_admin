import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Linking,
} from "react-native";
import { colors } from "../../constants";
// import tglogo from "../../../assets/logo/topgrowth-logo.jpeg";
import RvLogo from "../../../assets/logo.jpeg"
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress =async () => {
    console.log("Mobile Number:", mobileNumber);
    console.log("Password:", password);
    if(mobileNumber === '1234567890' && password === '123')
    {
    navigation.replace("tab", { user: 'user' });
        await AsyncStorage.setItem('token', 'user');
    }
  };


  const handlePressWithAlert = (title) => {
    let message='Please Contact To Admin';
    let phoneOptions = [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ];
    phoneOptions.unshift(
        {
          text: "9227868868",
          onPress: () => Linking.openURL("tel:9227868868"),
        },
        {
          text: "9978968868",
          onPress: () => Linking.openURL("tel:9978968868"),
        })
      

    Alert.alert(title, message, phoneOptions);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Image
            source={RvLogo}
            style={styles.logo}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => handlePressWithAlert("Forgot Password")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => handlePressWithAlert("Sign Up")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>{
            navigation.replace("tab", { user: 'user' });
          }}
        >
          <Text style={styles.continueText}>Continue without Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.dark,
  },
  loginContainer: {
    backgroundColor: "#1c1c1e",
    padding: 24,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "#fff",
    color: colors.primary,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  input: {
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#2c2c2c",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: RFValue(14),
    textAlign: "center",
  },
  signUpButton: {
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: RFValue(14),
    textDecorationLine: "underline",
  },
  continueButton: {
    marginVertical: 4,
  },
  continueText: {
    color: colors.primary,
    fontSize: RFValue(14),
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
  },
});
