import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import { StyleSheet, FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import CustomIconButton from "../../components/CustomIconButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp,} 
from "react-native-responsive-screen";

const Order = () => {
  const [isOrderVisible, setIsOrderDetailsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const ordersData = [
    { id: "1", date: "2021-09-01", status: "Completed" },
    { id: "2", date: "2021-09-02", status: "Pending" },
    { id: "3", date: "2021-09-03", status: "Cancelled" },
  ];
  
  const filteredOrdersData = selectedStatus
    ? ordersData.filter((order) => order.status === selectedStatus)
    : ordersData;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }
    , 1000);
  };

  return (
    <View style={styles.container}>
    {filteredOrdersData.length > 0 &&
      <View style={styles.buttonGroup}>
        {["Completed", "Pending", "Cancelled"].map((status, index) => (
          <CustomIconButton
            text={status}
            key={index}
            onPress={() => {
              if (status === selectedStatus) {
                setSelectedStatus(null);
                return;
              }
              setSelectedStatus(status);
            }}
            active={status === selectedStatus}
            orderStatus={true}
          />
        ))}
      </View>
    }

      {/* Orders List */}
      {filteredOrdersData.length > 0 ? (
        <FlatList
          data={filteredOrdersData}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Pressable
              style={styles.productContainer}
              onPress={() => {
                setIsOrderDetailsVisible(true);
              }}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.orderNo}>
                  <Text style={{ padding: 0, color: colors.primary }}>#JP{item.id}</Text>
                  
                </Text>
                <Text style={styles.date}>
                  {new Date(item.date).toDateString()}
                </Text>
              </View>
              <View style={styles.footerContainer}>
                <View style={styles.itemContainer}>
                  <Text style={styles.subHeading}>
                    Number Of Products :{" "}
                    <Text style={styles.productCount}>10</Text>
                  </Text>
                  <Text style={styles.subHeading}>
                    Quantity : <Text style={styles.productCount}>10</Text>
                  </Text>
                  <View
                    style={[
                      styles.statusContainer,
                      item.status === "Completed"
                        ? styles.completedStatusContainer
                        : item.status === "Pending"
                        ? styles.pendingStatusContainer
                        : styles.cancelledStatusContainer,
                      {
                        // borderWidth:1,
                        // borderRadius: 4,
                      }
                    ]
                    }
                  >
                    <AntDesign
                      name={
                        item.status === "Completed"
                          ? "checkcircle"
                          : item.status === "Pending"
                          ? "clockcircle"
                          : "closecircle"
                      }
                      size={10}
                      color={
                        item.status === "Completed"
                          ? styles.completedStatusText.color
                          : item.status === "Pending"
                          ? styles.pendingStatusText.color
                          : styles.cancelledStatusText.color
                      }
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.status,
                        item.status === "Completed"
                          ? styles.completedStatusText
                          : item.status === "Pending"
                          ? styles.pendingStatusText
                          : styles.cancelledStatusText,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.subHeading}>Amount</Text>
                  <Text style={styles.importantNumber}>
                    ₹{item.amount || 100000}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (

        <View style={styles.orderProductListContiainerEmpty}>
          <AntDesign name="inbox" size={100} color={colors.muted} />
          <Text style={styles.secondaryTextSmItalic}>No Order Found</Text>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    height: hp(7.5),
    marginTop: hp(2),
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: colors.white, // default background color
  },
  selectedButton: {
    // backgroundColor: colors.primary, // selected background color
    color: colors.white, // selected text color
  },
  buttonText: {
    color: colors.dark, // default text color black
    fontSize: RFValue(12),
  },
  selectedButtonText: {
    color: colors.white, // selected text color white
  },
  headerContainer: {
    flexDirection: "row",
   
    justifyContent: "space-between", // Align Order and Date on opposite ends
    alignItems: "center",
    paddingVertical: 2,
  },
  orderProductListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productCount: {
    fontWeight: "bold",
    fontSize: RFValue(12),
    color: colors.white,
  },
  date: {
    fontSize: RFValue(10),
    color: colors.white,
  },
  orderNo: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: colors.muted,
  },
  subHeading: {
    fontSize: RFValue(8),
    color: colors.lightGray,
  },
  importantNumber: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: colors.white,
  },
  // statusContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 4,
  //   paddingVertical: 4,
  //   paddingHorizontal: 8,
  //   borderRadius: 4,
  // },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    justifyContent: "flex-start", // Center content within the fixed width
  },
  completedStatusContainer: {
    // backgroundColor: "#def1d7",
    borderColor: "#1f8722",
  },
  pendingStatusContainer: {
    // backgroundColor: "#fef7ec",
    borderColor: "#e59866",
  },
  cancelledStatusContainer: {
    // backgroundColor: "#fae1db",
    // borderColor: "#ec7063",
  },
  completedStatusText: {
    color: "#82e0aa",
    fontSize: RFValue(10),
  },
  pendingStatusText: {
    color: "#f08135",
    fontSize: RFValue(10),

  },
  cancelledStatusText: {
    color: "#ec7063",
    fontSize: RFValue(10),

  },
  productContainer: {
    width: "100%",
    borderRadius: 10,
    borderColor: '#797d7f',
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    backgroundColor: '#1c1c1e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    // borderWidth: 1,
    color: colors.white,
  },
  flatListContainer: {
    padding: 10,
  },
});
