import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "./components/ProductCard";
import { Ionicons } from "@expo/vector-icons";

require("intl");
require("intl/locale-data/jsonp/id-ID");

const baseUrl = "https://f4c6-140-0-149-140.ap.ngrok.io";

export default function App() {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("0");
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState("https://picsum.photos/200/200");

  function addTotal() {
    setTotalAmount(totalAmount + 1);
  }

  function subtractTotal() {
    setTotalAmount(totalAmount - 1);
  }

  function addPrice(price) {
    setTotalPrice(totalPrice + price);
  }

  function subtractPrice(price) {
    setTotalPrice(totalPrice - price);
  }

  function addProduct() {
    axios
      .post(`${baseUrl}/products`, {
        title,
        description,
        stock: Number(stock),
        price: Number(price),
        image,
      })
      .then((res) => {
        fetchProducts();
        setShowModal(false);

        setTitle("");
        setDescription("");
        setStock("");
        setPrice("");
        setImage("https://picsum.photos/200/200");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchProducts() {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        // return axios.get(`${baseUrl}/carts`);
      })
      // .then((res) => {
      //   console.log(res.data, "<<");
      //   const data = res.data;
      //   let totPrice = 0;
      //   let totAmount = 0;
      //   for (let i = 0; i < data.length; i++) {
      //     for (let j = 0; j < products.length; j++) {
      //       if (data[i].productId === products[j].id) {
      //         totAmount += data[i].total;
      //         totPrice = totPrice + data[i].total * products[j].price;
      //         break;
      //       }
      //     }
      //   }
      //   setTotalAmount(totAmount);
      //   setTotalPrice(totPrice);
      // })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [products]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Shopping Cart
            </Text>
          </View>
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <View style={{ height: 500 }}>
              <FlatList
                data={products}
                renderItem={({ item }) => (
                  <ProductCard
                    product={item}
                    addTotal={addTotal}
                    subtractTotal={subtractTotal}
                    addPrice={addPrice}
                    subtractPrice={subtractPrice}
                    fetchProducts={fetchProducts}
                  />
                )}
              />
            </View>
            <View
              style={{
                paddingBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text>Dummy Product</Text>
              <View>
                <Modal visible={showModal}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#4cb050",
                      width: 100,
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 3,
                      margin: 20,
                    }}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={{ color: "#ffffff" }}>← Back</Text>
                  </TouchableOpacity>
                  <View style={{ marginHorizontal: 30 }}>
                    <Text>Title</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => {
                        setTitle(value);
                      }}
                      value={title}
                    />
                    <Text>Description</Text>
                    <TextInput
                      style={[styles.input, { height: 100 }]}
                      onChangeText={(value) => {
                        setDescription(value);
                      }}
                      value={description}
                    />
                    <Text>Stock</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => {
                        setStock(value);
                      }}
                      value={stock}
                    />
                    <Text>Price</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => {
                        setPrice(value);
                      }}
                      value={price}
                    />
                    <Text>Image Url</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => {
                        setImage(value);
                      }}
                      value={image}
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#4fc2f8",
                        width: "100%",
                        height: 40,
                        marginTop: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                      }}
                      onPress={() => addProduct()}
                    >
                      <Text style={{ color: "#ffffff" }}>Add Product</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#4cb050",
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                }}
                onPress={() => setShowModal(true)}
              >
                <Text style={{ color: "#ffffff" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 70,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="md-cart" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                {totalAmount}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Total - </Text>
              <Text style={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPrice)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
              width: "100%",
              paddingHorizontal: 70,
            }}
          >
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: "#f44236" }]}
            >
              <Text style={{ color: "#ffffff" }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: "#4fc2f8" }]}
            >
              <Text style={{ color: "#ffffff" }}>Go to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>

      <StatusBar backgroundColor="#ffffff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcfcf",
  },
  header: {
    justifyContent: "center",
    paddingLeft: 20,
    height: 40,
    backgroundColor: "#ffffff",
    borderTopColor: "#7d7a7a",
    borderTopWidth: 1.5,
  },
  footer: {
    backgroundColor: "#ffffff",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flex: 1 / 6,
  },
  amountButton: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 2,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
