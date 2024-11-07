import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  Linking
} from "react-native";
import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../app/Screens/Home";
import Order from "../../app/Screens/Order";
import {colors} from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from 'react-native-vector-icons';
import rvLogo from "../../../assets/logo.jpeg";
import Toast from "../../components/Toast";
import UserInfo from "../../app/Screens/Users";

const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('window');

const tabBarHeight = () => {
  if (width < 400) {
    return 70;
  } else if (height > 800 || width > 600) {
    return 90;
  }
  return 80;
};
const phoneNumber = "+919978968868";
const handleWhatsAppClick = () => {
  // WhatsApp URL format: https://wa.me/<phone_number>
  Linking.openURL(`https://wa.me/${phoneNumber}`).catch((err) =>
  {
    toastRef.current.show({
      type: "error",
      text: "something went wrong",
      duration: 1000,
    });
  });
};

const FixedHeader = () => (
  <SafeAreaView style={styles.headerContainer}>
    <Image source={rvLogo} style={{ width: 40, height: 40 }} />
    <Text style={styles.headerText}>RV GOLD</Text>
    
  </SafeAreaView>
);

const Tabs = () => {
  const toastRef = useRef();
  return (
    <>
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <Toast ref={toastRef} />
      <FixedHeader />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconSource;
              switch (route.name) {
                case "Home":
                  iconSource = (
                    <View style={styles.iconContainer}>
                      <AntDesign
                        name="home"
                        size={RFValue(20)}
                        color={focused ? colors.primary : colors.white}
                      />
                      <Text style={{ color: focused ? colors.primary : colors.white }}>Home</Text>
                    </View>
                  );
                  break;
                  // add more icon for user
                case "User":
                  iconSource = (
                    <View style={styles.iconContainer}>
                      <AntDesign
                        name="user"
                        size={RFValue(20)}
                        color={focused ? colors.primary : colors.white}
                      />
                      <Text style={{ color: focused ? colors.primary : colors.white }}>User</Text>
                    </View>
                  );
                  break;
                case "Order":
                  iconSource = (
                    <View style={styles.iconContainer}>
                      <AntDesign
                        name="profile"
                        size={RFValue(20)}
                        color={focused ? colors.primary : colors.white}
                      />
                      <Text style={{ color: focused ? colors.primary : colors.white }}>Order</Text>
                    </View>
                  );
                  break;
                default:
                  iconSource = null;
              }
              return iconSource;
          },
          tabBarStyle: {
            backgroundColor: colors.dark,
            height: tabBarHeight(),
            paddingBottom: Platform.OS === 'ios' ? 25 : 0,
            borderTopWidth: 0,
            paddingTop:Platform.OS === 'ios' ? 25 : 0 // Adjust padding on iOS
            },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen name="User" component={UserInfo} />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: colors.dark,
  },
  headerText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, 
    color: colors.primary,
  },
  circleIcon: {
    width: RFValue(30),            
    height: RFValue(30),
    borderRadius: RFValue(15),   
    backgroundColor:colors.primary,
    alignItems: 'center',         
    justifyContent: 'center', 
    alignSelf: 'center', 
  },
  tabIconStyle: {
    backgroundColor: colors.dark,
    width: 24,
    height: 24,
  },
  iconContainer: {
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center", 
  },
});
