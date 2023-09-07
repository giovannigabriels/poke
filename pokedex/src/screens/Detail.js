import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Bar from "../components/Bar";

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
    <View style={styles.content}>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Species</Text>
        <Text style={styles.valueAbout}>Seed</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Height</Text>
        <Text style={styles.valueAbout}>2 3.6 (0.70cm)</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Weight</Text>
        <Text style={styles.valueAbout}>15.2 lbs (6.9 kg)</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Abilities</Text>
        <Text style={styles.valueAbout}>Overgrow, Chlorophyl</Text>
      </View>
    </View>
  );

  const BaseStatsRoute = () => (
    <View style={styles.content}>
      <View style={styles.about}>
        <Text style={styles.titleBase}>HP</Text>
        <Text style={styles.valueBase}>45</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={45} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Attack</Text>
        <Text style={styles.valueBase}>60</Text>
        <View style={styles.barBaseContainer}>
        <Bar status={60} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Defense</Text>
        <Text style={styles.valueBase}>48</Text>
        <View style={styles.barBaseContainer}>
        <Bar status={48} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Sp. Atk</Text>
        <Text style={styles.valueBase}>65</Text>
        <View style={styles.barBaseContainer}>
        <Bar status={65} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Sp. Def</Text>
        <Text style={styles.valueBase}>65</Text>
        <View style={styles.barBaseContainer}>
        <Bar status={65} />
        </View>
      </View>
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
  about: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleAbout: {
    flex: 1,
    color: "grey",
  },
  valueAbout: {
    flex: 2,
  },
  titleBase: {
    flex: 2,
    color: "grey",
  },
  valueBase: {
    flex: 1,
  },
  barBaseContainer: {
    flex: 4,
    width: "100%",
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  barBase: {
    height: "100%",
    backgroundColor: "green",
    width: "65%",
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 30,
  },
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
