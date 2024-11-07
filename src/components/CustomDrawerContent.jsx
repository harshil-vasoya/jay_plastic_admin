import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { colors } from '../constants';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>RV GOLD</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate('About')}
      />
      <DrawerItem
        label="Contact"
        onPress={() => props.navigation.navigate('Contact')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.primary,
  },
});

export default CustomDrawerContent;