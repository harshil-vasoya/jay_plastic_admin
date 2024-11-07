import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import { colors } from "../constants";
  import { RFValue } from "react-native-responsive-fontsize";
  
  const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
    disabled,
  }) => {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.buttonContainer,
          isLoading && styles.loading,
          containerStyles, // Accept additional custom styles
        ]}
        disabled={isLoading || disabled}
      >
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
  
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            style={styles.loadingIndicator}
          />
        )}
      </TouchableOpacity>
    );
  };
  
  export default CustomButton;
  
  // Define styles using StyleSheet
  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: colors.secondary, // Replace with your "bg-secondary" color
      borderRadius: 16,
      minHeight: 62,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    loading: {
      opacity: 0.5,
    },
    buttonText: {
      color: "#fff", // Replace with your "text-primary" color
      // fontFamily: "semiBold", // Make sure you have this font loaded
      fontSize: RFValue(18),
      marginTop:1
    },
    loadingIndicator: {
      marginLeft: 8,
    },
  });
  