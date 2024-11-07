import {
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, {  useRef, useState } from "react";
import CustomIconButton from "../../components/CustomIconButton";
import ProductCard from "../../components/ProductCard";
import { colors } from "../../constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductDetailsModel from "../../components/ProductDetails";
import { useGetAllCartData } from "../../hooks/useGetAllCartData";
import Toast from "../../components/Toast";
const { width, height } = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [isProductDetailsVisible, setIsProductDetailsVisible] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [cartData , setCartData]=useGetAllCartData();
  const toastRef = useRef();


  const [category, setCategory] = useState([
    {
      id: "62fe244f58f7aa8230817f81",
      title: "Garments",
    },
    {
      id: "62fe243858f7aa8230817f82",
      title: "Electronics",
    },
    {
      id: "62fe241958f7aa8230817f83",
      title: "Cosmetics",
    },
    {
      id: "62fe246858f7aa8230817f84",
      title: "Groceries",
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (text) => {
    setSearchText(text);
  };
  const updateCart=(id)=>{
    const cartProductData = cartData.products.filter((product)=>product.id===id);
    const productIndex = products.findIndex((product)=>product.id===id);
    
    if(cartProductData.length!==0){
      let newProductData = products[productIndex];
      newProductData.innerItem += cartProductData[0].innerItem;
      newProductData.masterItem += cartProductData[0].masterItem;
      newProductData.individualItem += cartProductData[0].individualItem;
      setCartData((prev)=>{
        return {...prev,products:[ {...newProductData} ,...prev.products.filter((product)=>product.id!==id)]}
      }
      )
    }
    else
    {
      setCartData((prev)=>{
        return {...prev,products:[ {...products[productIndex]} ,...prev.products]}
      }
      )
    }
    setProducts((prev)=>{
      return prev.map((product)=>{
        if(product.id===id){
          return {...product,innerItem:0,masterItem:0,individualItem:0}
        }
        return product;
      })
      
  })
  toastRef.current.show({
    type: "success",
    text: "Successfully added to cart",
    duration: 1000,
  });
  setIsProductDetailsVisible(false);
  
}
  const handleScanPress = () => {
    console.log('Scan button pressed');
  };
  const [products, setProducts] = useState(
    [
  {
    id: "62fe244f58f7aa8230817f81",
    name: "Product 1 ajfdhlj asdflhjl afjlj lkjaf lkjaflkjaflkjaf",
    price: "100",
    quantity: 1,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/PE/TE/AD/2221278/ptmt-prime-crystal-short-body-bib-cock-500x500.jpg"
    ],
    innerPrice:20,
    masterPrice:200,
    individualPrice:2,
    innerItem:0,
    masterItem:0,
    individualItem:0,
  },
  {
    id: "62fe243858f7aa8230817f82",
    name: "Product 2",
    price: "200",
    quantity: 1,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/PE/TE/AD/2221278/ptmt-prime-crystal-short-body-bib-cock-500x500.jpg"
    ],
    meta:{
      "Valve Size":"3/4 Inch",
      "Usage":"Hot & Cold Water",
      "Material":"PVC",
      "Series":"EDGE",
      "Color":"White",
      "Finish":"Polished",
      "Usage":"RO"
    },
    innerPrice:20,
    masterPrice:200,
    individualPrice:2,
    innerItem:0,
    masterItem:0,
    individualItem:0,
  },
  {
    id: "62fe241958f7aa8230817f83",
    name: "Product 3",
    price: "300",
    quantity: 1,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/PE/TE/AD/2221278/ptmt-prime-crystal-short-body-bib-cock-500x500.jpg"
    ],
    meta:{
      "Usage":"Hot & Cold Water",
      "Material":"PVC",
      "Series":"EDGE",
      "Color":"White",
      "Finish":"Polished",
      "Usage":"RO"
    },
    innerPrice:20,
    masterPrice:200,
    individualPrice:2,
    innerItem:0,
    masterItem:0,
    individualItem:0,
  },
  {
    id: "62fe246858f7aa8230817f84",
    name: "Product 4",
    price: "400",
    quantity: 1,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/PE/TE/AD/2221278/ptmt-prime-crystal-short-body-bib-cock-500x500.jpg"
    ],
    meta:{
      "Usage":"Hot & Cold Water",
      "Material":"PVC",
      "Series":"EDGE",
      "Color":"White"
    },
    innerPrice:20,
    masterPrice:200,
    individualPrice:2,
    innerItem:0,
    masterItem:0,
    individualItem:0,
  },
  {
    id: "62fe246858f7aa8230817f85",
    name: "Product 5",
    price: "500",
    quantity: 1,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/1/GO/YQ/CK/2221278/water-level-control-valve-500x500.jpg",
    ],
    meta:{
      "Packaging Type":"Box",
      "Material":"PVC",
      "Series":"EDGE",
      "Color":"White"
    },
    innerPrice:20,
    masterPrice:200,
    individualPrice:2,
    innerItem:0,
    masterItem:0,
    individualItem:0,
  }
]

  );
  const [refreshing, setRefreshing] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  function updateQuantity (id, quantity , boxType){
    console.log("Update quantity:", id, quantity , boxType);

    setProducts((prev)=>{
      return prev.map((product)=>{
        if(product.id===id){
          let tempProduct = product;
          if(boxType==="inner"){
          return {...tempProduct,innerItem:quantity}
          }
          if(boxType==="master"){
            return {...tempProduct,masterItem:quantity}
          }
          if(boxType==="individual"){
            return {...tempProduct,individualItem:quantity}
          }
          return tempProduct;
        }
        return product;
      })
    })
  };
  const handleProductPress = (product) => {
    setSingleProduct(product);
    setIsProductDetailsVisible(true);
    console.log("Product pressed:", product);
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderCategoryList = () => (
    <View style={styles.categoryContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <CustomIconButton
              text={item.title}
              onPress={() => {
                setCategory((prev)=>{
                  return prev.map((cat)=>{
                    if(cat.id===item.id){
                      return {...cat,active:!cat.active}
                    }
                    return {...cat,active:false}
                })
                })
              }}
              active={item.active}
            />
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Toast ref={toastRef} />
      <View style={styles.bodyContainer}>
        {renderCategoryList() /* Render the fixed header for categories */}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
          }
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
            
              <ProductCard
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                meta={item.meta}
                image={item.images[0]}
                onPress={() => {handleProductPress(item)}}
                // onPressSecondary={() => handleAddToCart(item)}
              />
            </View>
          )}
        />
      </View>
      <ProductDetailsModel 
      navigation={navigation}
        isProductDetailsVisible={isProductDetailsVisible}
        setIsProductDetailsVisible={setIsProductDetailsVisible}
        updateQuantity={(quantity , boxType) => updateQuantity(singleProduct.id, quantity , boxType)}
        productDetails={singleProduct}
        setProductDetails={setSingleProduct}
        onAddCartButtonPress={() => {
          updateCart(singleProduct.id);
        }}
        />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  bodyContainer: {
    width: "100%",
    flex: 1,
  },
  categoryContainer: {
    width: "100%",
    backgroundColor: colors.dark,
  },
  productList: {
    paddingHorizontal: wp(3), // Responsive padding
    alignItems: "center",
    justifyContent: "flex-start",
  },
  categoryItem: {
    padding:0,
  },
  productItem: {
    margin: hp(1),
    marginTop: 0,
  },
  searchableDropdownContainer: {
    borderRadius: hp(1), // Use height percentage for the border radius
    width: "100%",
    elevation: 5,
    backgroundColor: colors.light,
    position: "absolute",
  },
});
