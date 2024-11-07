import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../app/auth/Splash";
import SingUp from "../app/auth/SingUp";
import Login from "../app/auth/Login";
const Stack = createNativeStackNavigator();
import Tabs from "./Tabs/Tabs";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Routes = () => {
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName="../app/auth/Splash"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SingUp" component={SingUp} />
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="tab" component={Tabs} />
    </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
);
};

export default Routes;
