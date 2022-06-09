import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
require("intl");
require("intl/locale-data/jsonp/id-ID");

const baseUrl = "https://f4c6-140-0-149-140.ap.ngrok.io";

export default function ProductCard({
  product,
  addTotal,
  subtractTotal,
  addPrice,
  subtractPrice,
  fetchProducts,
}) {
  const [amount, setAmount] = useState(0);

  function buttonDelete(id) {
    axios
      .delete(`${baseUrl}/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function subtractHandle() {
    if (amount > 0) {
      setAmount(amount - 1);
      subtractTotal();
      subtractPrice(product.price);
    }
  }

  function addHandle() {
    if (amount < product.stock) {
      setAmount(amount + 1);
      addTotal();
      addPrice(product.price);
    }
  }

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/carts`)
  //     .then((res) => {
  //       const carts = res.data;
  //       carts.map((cart) => {
  //         if (cart.productId === product.id) {
  //           setAmount(cart.total);
  //           let totalPrice = 0;
  //           for (let i = 1; i <= cart.total; i++) {
  //             totalPrice += product.price;
  //             console.log(product.price);
  //           }
  //           totalInCart(totalPrice, cart.total);
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 10 }}>
            <Image
              style={{ height: 70, width: 70 }}
              source={{
                uri: product.image,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              paddingVertical: 5,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {product.title}
            </Text>
            <View style={styles.price}>
              <Text style={{ fontSize: 12, color: "#ffffff" }}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              flexDirection: "row-reverse",
            }}
          >
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: "#f44236" }]}
              onPress={() => buttonDelete(product.id)}
            >
              <Ionicons name="md-trash" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountButton,
                { backgroundColor: "#4fc2f8", marginEnd: 3 },
              ]}
              onPress={addHandle}
            >
              <Text style={styles.submitText}>+</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.submitText,
                {
                  marginVertical: 10,
                  marginHorizontal: 10,
                  color: "black",
                  fontSize: 12,
                },
              ]}
            >
              {amount}
            </Text>
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: "#f44236" }]}
              onPress={subtractHandle}
            >
              <Text style={styles.submitText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    height: 100,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    width: "100%",
    padding: 2,
    borderRadius: 3,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    backgroundColor: "#4cb050",
  },
  submitText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  amountButton: {
    width: 30,
    padding: 4,
    borderRadius: 6,
    justifyContent: "center",
  },
});
