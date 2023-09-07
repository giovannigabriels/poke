import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [datas, setDatas] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch data
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.results);
        setDatas(data.results);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.title}>Pokedex</Text>
        <FlatList
          data={datas}
          renderItem={(ite) => <Card item={ite} />}
          style={styles.container}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
