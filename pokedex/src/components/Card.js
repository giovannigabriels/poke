//
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import capitalizeFirstLetter from "../utils/capitalize";
import backgroundColor from "../utils/getBackGroundColor";
import RenderTypes from "./RenderTypes";

export default function Card({ item }) {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [typesPoke, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setTypes(item.item.pokemon_v2_pokemontypes);
    setStats(item.item.pokemon_v2_pokemonstats);
    setAbilities(item.item.pokemon_v2_pokemonabilities);
    setHeight(item.item.height / 10);
    setWeight(item.item.weight / 10);
    setData(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/" +
        JSON.parse(item?.item?.pokemon_v2_pokemonsprites[0]?.sprites)
          .other?.home?.front_default?.split("/")
          .slice(2)
          .join("/")
    );
  }, []);

  const handleCardPress = () => {
    navigation.navigate("Detail", {
      id: item.index + 1,
      data,
      typesPoke,
      name: capitalizeFirstLetter(item.item.name),
      stats,
      abilities,
      weight,
      height,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleCardPress}>
      <View style={styles.cardWrapper}>
        <ImageBackground
          style={[styles.card, { backgroundColor: backgroundColor(typesPoke) }]}
          source={require("../../assets/pokeball.png")}
          imageStyle={{
            width: 100,
            height: 100,
            marginLeft: 100,
            marginTop: 40,
            opacity: 0.2,
            tintColor: "white",
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>
              {capitalizeFirstLetter(item.item.name)}
            </Text>
            <View style={styles.typesWrapper}>
              {RenderTypes(typesPoke, 70, 20)}
            </View>
            <Image
              source={{ uri: data }}
              style={styles.image}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    margin: 6,
  },
  card: {
    height: 120,
    width: 170,
    borderRadius: 15,
  },
  image: {
    flex: 1,
    position: "absolute",
    right: 8,
    bottom: 5,
    height: 80,
    width: 70,
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
