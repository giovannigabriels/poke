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
    fetchData();
  }, []);

  const fetchData = async () => {
    const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
    const headers = {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    };
    const graphqlQuery = {
      operationName: "samplePokeAPIquery",
      query: `query samplePokeAPIquery {
        pokemon_v2_pokemon(limit: 20) {
          name
          id
          pokemon_v2_pokemontypes(limit: 20) {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          height
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
            }
          }
          weight
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
      
      `,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    await fetch(endpoint, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        setDatas(data?.data?.pokemon_v2_pokemon);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
