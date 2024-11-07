import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, RefreshControl, TextInput, Modal, Button } from 'react-native';
import { colors } from '../../constants';
import { AntDesign } from '@expo/vector-icons';
import Toast from '../../components/Toast'

const initialUsers = [
  { id: 1, name: "John Doe", number: "+1 234 567 890", password: "password123", role: "Admin" },
  { id: 2, name: "Jane Smith", number: "+1 987 654 321", password: "qwerty789", role: "Manager" },
  { id: 3, name: "Michael Lee", number: "+1 555 666 777", password: "secure456", role: "User" },
];

export default function UserInfo() {
  const [users, setUsers] = useState(initialUsers);
  const [showPassword, setShowPassword] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', number: '', password: '', role: '' });
  const toastRef = useRef();

  const togglePasswordVisibility = (userId) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setUsers([...initialUsers]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.number || !newUser.password || !newUser.role) {
      return;
    }
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: Date.now(), ...newUser },
    ]);
    setNewUser({ name: '', number: '', password: '', role: '' });
    setModalVisible(false);
  };

  const handleDeleteUser = (userId) => {
    toastRef.current.show({
        type: "success",
        text: "User deleted successfully",
        duration: 1000,
      });
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

  };

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.row}>
        <Text style={styles.label}>{item.name}</Text>
        <View style={{flexDirection:'row' , justifyContent:'space-around' ,gap:10 , alignItems:'center'}}>
        
        <Text style={styles.role}>{item.role}</Text>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
          {/* <Text style={styles.deleteText}>X</Text>
           */}
           <AntDesign name="delete" size={16} color='#f1948a' />
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.row}>
        <Text style={styles.number}>{item.number}</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.password}>
            {showPassword[item.id] ? item.password : "••••••••"}
          </Text>
          <TouchableOpacity onPress={() => togglePasswordVisibility(item.id)}>
            <Text style={styles.showButton}>{showPassword[item.id] ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <Toast ref={toastRef} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add User</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4A90E2" />
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New User</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={newUser.name}
              onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Number"
              placeholderTextColor="#888"
              value={newUser.number}
              onChangeText={(text) => setNewUser({ ...newUser, number: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={newUser.password}
              onChangeText={(text) => setNewUser({ ...newUser, password: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              placeholderTextColor="#888"
              value={newUser.role}
              onChangeText={(text) => setNewUser({ ...newUser, role: text })}
            />

            <Button title="Add User" onPress={handleAddUser} color="#4A90E2" />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF4A4A" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  contentContainer: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  role: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
  number: {
    fontSize: 16,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  password: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  showButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  addButtonText: {
    color: colors.dark,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '30%',
    marginLeft: 'auto',
    marginEnd: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    // marginLeft: 10,
    // padding: 4,
    // borderRadius: 4,
    // backgroundColor: '#FF4A4A',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
