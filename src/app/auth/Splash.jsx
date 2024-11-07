import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text, View } from "react-native";

function Splash({navigation}) {
    useEffect(() => {
        const checkToken = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
              navigation.replace("tab", { user: 'user' });
            } else {
              navigation.replace("login");
            }
          } catch (error) {
            console.error("Error retrieving token:", error);
          }
        };
    
        checkToken();
      }, [navigation]);
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Splash Screen</Text> */}
        </View>
    );
}

// styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    text: {
        fontSize: 30,
        color: '#000',
    },
};

export default Splash;