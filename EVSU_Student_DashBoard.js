import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";

const EVSU_Student_DashBoard = () => {
  const [showItems, setShowItems] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vendors");
        setStores(response.data.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleSearchIconClick = () => {
    setShowItems(true);
    setShowStores(false);
  };

  const handleStoreIconClick = () => {
    setShowItems(false);
    setShowStores(true);
  };

  const handleHomeIconClick = () => {
    setShowItems(false);
    setShowStores(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.username}>Username</Text>
          <TouchableOpacity style={styles.cartIcon}>
            <Image
              source={require("./assets/bag_icon.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>
      <View style={styles.fixedLogoSection}>
        <Image
          source={require("./assets/EvsuLOGO.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {showItems ? (
          <View style={styles.itemList}>
            <ImageBackground
              source={require("./assets/placeholder.png")}
              style={styles.itemBackground}
            >
              <Image
                source={require("./assets/placeholder.png")}
                style={styles.itemImage}
                resizeMode="contain"
              />
              <Text style={styles.itemName}>Ampalaya</Text>
              <Text style={styles.itemPrice}>₱20</Text>
              <View style={styles.itemIcons}>
                <TouchableOpacity>
                  <Image
                    source={require("./assets/heart_iconsmall.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("./assets/basket_icon.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ) : showStores ? (
          <View style={styles.storeList}>
            {stores.map((store, index) => (
              <View key={index} style={styles.storeItem}>
                <View style={styles.storeImageWrapper}>
                  <Image
                    source={require("./assets/placeholder.png")}
                    style={styles.storeImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeOwner}>{store.owner}</Text>
                <Text style={styles.storeRating}>{store.rating} ★★★★☆</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.scrollableContent}>
            <Image
              source={require("./assets/placeholder.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Image
              source={require("./assets/placeholder.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Image
              source={require("./assets/placeholder.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Image
              source={require("./assets/placeholder.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Image
              source={require("./assets/placeholder.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={handleHomeIconClick}
        >
          <Image
            source={require("./assets/home_icon.png")}
            style={styles.houseIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={handleStoreIconClick}
        >
          <Image
            source={require("./assets/store_icon.png")}
            style={styles.footerIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={handleSearchIconClick}
        >
          <Image
            source={require("./assets/search_iconbig.png")}
            style={styles.footerIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Image
            source={require("./assets/user_icon.png")}
            style={styles.footerIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  header: {
    paddingTop: 38,
    padding: 10,
    backgroundColor: "#800000",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    flex: 1,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  cartIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  fixedLogoSection: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#800000",
    position: "absolute",
    top: 138,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: -40,
  },
  content: {
    paddingTop: 180,
  },
  scrollableContent: {
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    padding: 10,
    paddingTop: 25,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  itemList: {
    padding: 10,
    paddingTop: 25,
    borderRadius: 10,
  },
  itemBackground: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#800000",
    justifyContent: "center",
  },
  itemImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
  },
  itemIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  storeList: {
    padding: 10,
    paddingTop: 25,
    borderRadius: 10,
  },
  storeItem: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#800000",
  },
  storeImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    marginBottom: 10,
  },
  storeImage: {
    width: "100%",
    height: "100%",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  storeOwner: {
    fontSize: 14,
    color: "#555",
  },
  storeRating: {
    fontSize: 14,
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 11,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerIcon: {
    padding: 10,
  },
  houseIcon: {
    width: 26,
    height: 26,
  },
  footerIconImage: {
    width: 26,
    height: 26,
  },
});

export default EVSU_Student_DashBoard;
