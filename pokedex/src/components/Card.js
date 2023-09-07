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
import backgroundColor from "../utils/getBackGroundColor";
import RenderTypes from "./RenderTypes";

export default function Card({ item }) {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [typesPoke, setTypes] = useState([]);
  const [stats, setStats] = useState([]);

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
        setStats(data.stats);
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
      id: item.index + 1,
      data,
      typesPoke,
      name: item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1),
      stats,
    });
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableWithoutFeedback onPress={handleCardPress}>
        <View
          style={[
            styles.card,
            { backgroundColor: backgroundColor(typesPoke) },
          ]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1)}
            </Text>
            <View style={styles.typesWrapper}>
              {RenderTypes(typesPoke, 70, 20)}
            </View>
          </View>
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
    flexDirection: "column",
    height: 120,
    width: 165,
    borderRadius: 15,
  },
  image: {
    flex: 1,
    position: "absolute",
    right: 2,
    bottom: 5,
    height: 80,
    width: 75,
  },
  name: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
    marginTop: 25,
    marginLeft: 10,
  },
  typesWrapper: {
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "flex-start",
    marginTop: 5,
    marginLeft: 5,
  },
});
