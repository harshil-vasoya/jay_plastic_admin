import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { COLORS } from '../constants';
import { RFValue } from 'react-native-responsive-fontsize';

const colors = {
  primary: "#FB6831",
  primary_light: "#FFC8B2",
  primary_shadow: "#FB6A04",
  secondary: "#31C4FB",
  tertiary: "#AEE8FD",
  success: "#90ee90",
  danger: "#FF4848",
  shadow: "#E7E8EA",
  warning: "#FBD431",
  info: "#F8F9FA",
  light: "#F5F5F5",
  dark: "#343A3F",
  muted: "#707981",
  white: "#FFFFFF",
};

const CategorySlider = ({ categories, selectedCategory, setSelectedCategory }) => {

  if(categories.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item?.id && styles.selectedCategoryItem,
            ]}
            onPress={() => {
              if (selectedCategory === item?.id) {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(`${item?.id}`);
              }
            }}
          >
            <Text style={[styles.categoryText, selectedCategory === item?.id && { color: 'white' }]}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default CategorySlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 100,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedCategoryItem: {
    backgroundColor: colors.white,
  },
  categoryText: {
    // fontWeight: 'semibold',
    fontSize: RFValue(12),
    marginTop: 5,
  }
});
