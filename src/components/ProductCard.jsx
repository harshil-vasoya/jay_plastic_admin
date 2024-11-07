import { StyleSheet, Text, TouchableOpacity, View, Image ,Dimensions } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../constants";
import { RFValue } from "react-native-responsive-fontsize";

const ProductCard = ({
  name,
  price,
  image,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
  
}) => {
 
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
      <Image source={{uri:image}} style={styles.productImage} />

      </View>
      
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm} numberOfLines={1}>{name}</Text>
          <Text style={styles.categoryText} numberOfLines={1}>sub categoryub category</Text>

        </View>
        <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:"center" , width:'100%'}}>
          <Text style={styles.primaryTextSm}>₹ {price}</Text>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <AntDesign name="delete" size={20} color='#f1948a' />
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dark,
    // backgroundColor: '#1c1c1e',
        width:170,
        display: "flex",
        padding:3,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        elevation: 5,
        borderColor:colors.primary
  },

  categoryText:{
    fontSize: RFValue(10),
    fontWeight: "bold",
    marginBottom:4,
    color: colors.muted,
  },
  imageContainer: {
      width: "100%",
  },
  productImage: {
      height: 170,
      width: "100%",
      borderRadius: 15,
    //   borderTopLeftRadius: 10,
    //   borderTopRightRadius: 10,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    color: colors.white,
    padding:5,
  },
  secondaryTextSm: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: colors.white,
    paddingVertical:5,
  },
  primaryTextSm: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: colors.primary,
  },
  iconContainer: {
    // backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerDisable: {
    backgroundColor: colors.muted,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
