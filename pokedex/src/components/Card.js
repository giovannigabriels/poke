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

export default function Card({ item}) {
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
      id: item.index +1,
    });
  };

  const renderTypes = () => {
    return typesPoke.map((type, index) => (
      <View
        key={index}
        style={styles.typeContainer}>
        <Text style={styles.typeText}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</Text>
      </View>
    ));
  };

  const backgroundColor = () => {
    if (typesPoke.length > 0) {
      const typeName = typesPoke[0].type.name;
      switch (typeName) {
        case "grass":
          return "#48CFB2";
        case "fire":
          return "#FA6C6C";
        case "water":
          return "#6890F0";
        case "bug":
          return "#A8B820";
        case "normal":
          return "#A8A878";
      }
    }
  };

  const styles = StyleSheet.create({
    cardWrapper: {
      margin: 5,
    },
    card: {
      flexDirection:"column",
      height: 120,
      width: 165,
      borderRadius: 15,
      backgroundColor: backgroundColor(),
    },
    image: {
        flex:1,
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
    typeContainer: {
      backgroundColor: backgroundColor(),
      borderRadius: 15,
      margin: 5,
      paddingHorizontal: 8,
      elevation: 5
    },
    typeText: {
      color: "#fff",
      fontSize: 12,
    },
  });

  return (
    <View style={styles.cardWrapper}>
      <TouchableWithoutFeedback onPress={handleCardPress}>
        <View style={styles.card}>
         <View style={{flex:1}}>
          <Text style={styles.name}>
            {item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1)}
          </Text>
          <View style={styles.typesWrapper}>{renderTypes()}</View>
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
