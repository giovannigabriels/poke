import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

export default function Detail({ route }) {
  const { id } = route.params;
  useEffect(() => {
    console.log(id);
  }, []);

  const [index, setIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

  const AboutRoute = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>About</Text>
    </View>
  );

  const BaseStatsRoute = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Base Stats</Text>
    </View>
  );

  const EvolutionRoute = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Evolution</Text>
    </View>
  );

  const MovesRoute = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Moves</Text>
    </View>
  );

  const renderScene = SceneMap({
    about: AboutRoute,
    baseStats: BaseStatsRoute,
    evolution: EvolutionRoute,
    moves: MovesRoute,
  });

  const routes = [
    { key: "about", title: "About" },
    { key: "baseStats", title: "Base Stats" },
    { key: "evolution", title: "Evolution" },
    { key: "moves", title: "Moves" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ backgroundColor: "green", flexDirection: "column", flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "red", marginLeft: 5, fontSize: 30 }}>
                BULBASAUR
              </Text>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <View
                  // key={index}
                  style={styles.typeContainer}>
                  <Text style={styles.typeText}>Grass</Text>
                </View>
                <View
                  // key={index}
                  style={styles.typeContainer}>
                  <Text style={styles.typeText}>Grass</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: "tomato", fontSize: 20 }}>#001</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
              }}
              style={styles.image}
            />
          </View>
        </View>
        <Animatable.View
          style={styles.footer}
          animation="fadeInUpBig">
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, focused }) => (
                  <Text style={{ color: focused ? "black" : "grey" }}>
                    {route.title}
                  </Text>
                )}
                indicatorStyle={{
                  borderBottomColor: "blue",
                  borderBottomWidth: 2,
                }}
                style={{ backgroundColor: "white", shadowOpacity: 3 }}
              />
            )}
          />
        </Animatable.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 40,
    opacity: 0.9,
  },
  customTabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    height: 300,
    width: 300,
    zIndex: 1,
    alignSelf: "center",
    marginTop: -100,
  },
  typeContainer: {
    backgroundColor: "green",
    borderRadius: 15,
    margin: 5,
    paddingHorizontal: 8,
    elevation: 5,
    width: 75,
    height: 30,
    justifyContent: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    alignSelf: "center",
  },
});
