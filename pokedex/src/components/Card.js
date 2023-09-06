//
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export default function Card({ item }) {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [typesPoke, setTypes] = useState([]);

  useEffect(() => {
    //fetch data
    fetch(item.item.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.sprites.other.home.front_default);
        setTypes(data.types);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  const handleCardPress = () => {
    navigation.navigate("Detail", {
      itemId: item.item.id,
    });
  };

  const renderTypes = () => {
    // Ambil maksimal 2 tipe

    return typesPoke.map((type, index) => (
      <View
        key={index}
        style={styles.typeContainer}>
        <Text style={styles.typeText}>{type.type.name}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableWithoutFeedback onPress={handleCardPress}>
        <View style={styles.card}>
          <Text style={styles.name}>{item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1)}</Text>
          <View style={styles.typesWrapper}>{renderTypes()}</View>
          <Image
            source={{ uri: data }}
            style={styles.image}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 5,
  },
  card: {
    flex: 1,
    height: 150,
    width: 175,
    borderRadius: 15,
    padding: 8,
    backgroundColor: "green",
  },
  image: {
    position: "absolute",
    right: 2,
    bottom: 5,
    height: 110,
    width: 110,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 12,
    marginTop: 25,
  },
  typesWrapper: {
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "flex-start",
    marginTop: 5
  },
  typeContainer: {
    backgroundColor: "red",
    borderRadius: 15,
    margin: 5,
    paddingHorizontal: 8,
  },
  typeText: {
    color: "#fff",
  },
});
