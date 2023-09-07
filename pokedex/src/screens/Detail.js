import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
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
    <ImageBackground
      style={{ backgroundColor: "green", flexDirection: "column", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "red" }}>BULBASAUR</Text>
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
        />
      </Animatable.View>
    </ImageBackground>
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
});
