import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Bar from "../components/Bar";
import RenderTypes from "../components/RenderTypes";
import fetchData from "../config";
import { operationNameSpecies, querySpecies } from "../queries/species";
import capitalizeFirstLetter from "../utils/capitalize";
import kgToLbs from "../utils/convertKgToLbs";
import formattedNumber from "../utils/formattedNumber";
import formattedSpecies from "../utils/formattedSpecies";
import backgroundColor from "../utils/getBackGroundColor";
import meterToFeetAndInches from "../utils/meterToFeetAndInch";

export default function Detail({ route }) {
  const { id, data, typesPoke, name, stats, abilities, weight, height } =
    route.params;
  const [hp, setHp] = useState(null);
  const [atk, setAtk] = useState(null);
  const [def, setDef] = useState(null);
  const [sp_atk, setSpAtk] = useState(null);
  const [sp_def, setSpDef] = useState(null);
  const [abi, setAbilities] = useState(null);
  const [weightLbs, setWeightLbs] = useState(null);
  const [heightFeet, setHeightFeet] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecies();
    for (const iterator of stats) {
      if (iterator.pokemon_v2_stat.name == "hp") {
        setHp(iterator.base_stat);
      } else if (iterator.pokemon_v2_stat.name == "attack") {
        setAtk(iterator.base_stat);
      } else if (iterator.pokemon_v2_stat.name == "defense") {
        setDef(iterator.base_stat);
      } else if (iterator.pokemon_v2_stat.name == "special-attack") {
        setSpAtk(iterator.base_stat);
      } else {
        setSpDef(iterator.base_stat);
      }
    }
    const mapAbilities = abilities
      .map((el) => {
        return capitalizeFirstLetter(el.pokemon_v2_ability.name);
      })
      .join(", ");
    setAbilities(mapAbilities);
    setWeightLbs(kgToLbs(weight));
    setHeightFeet(meterToFeetAndInches(height));
  }, []);

  const fetchSpecies = async () => {
    fetchData(operationNameSpecies, querySpecies(id))
      .then((data) => {
        setSpecies(
          formattedSpecies(data?.data?.pokemon_v2_pokemonspeciesname[0]?.genus)
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [index, setIndex] = useState(0);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

  const AboutRoute = () => (
    <View style={styles.content}>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Species</Text>
        <Text style={styles.valueAbout}>{species}</Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Height</Text>
        <Text style={styles.valueAbout}>
          {heightFeet} ({height} m)
        </Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Weight</Text>
        <Text style={styles.valueAbout}>
          {weightLbs} lbs ({weight}kg)
        </Text>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleAbout}>Abilities</Text>
        <Text style={styles.valueAbout}>{abi}</Text>
      </View>
    </View>
  );

  const BaseStatsRoute = () => (
    <View style={styles.content}>
      <View style={styles.about}>
        <Text style={styles.titleBase}>HP</Text>
        <Text style={styles.valueBase}>{hp}</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={hp} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Attack</Text>
        <Text style={styles.valueBase}>{atk}</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={atk} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Defense</Text>
        <Text style={styles.valueBase}>{def}</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={def} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Sp. Atk</Text>
        <Text style={styles.valueBase}>{sp_atk}</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={sp_atk} />
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.titleBase}>Sp. Def</Text>
        <Text style={styles.valueBase}>{sp_def}</Text>
        <View style={styles.barBaseContainer}>
          <Bar status={sp_def} />
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

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/pokeball.png")}
        style={{
          backgroundColor: backgroundColor(typesPoke),
          flexDirection: "column",
          flex: 1,
        }}
        imageStyle={{width:225,height:225,tintColor:"white", marginLeft:200, marginTop:150, opacity:0.2 }}
        >
          
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              // backgroundColor: "red",
            }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "white", marginLeft: 5, fontSize: 45 }}>
                {name}
              </Text>
              <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                {RenderTypes(typesPoke, 75, 30)}
              </View>
            </View>
            <View>
              <Text style={{ color: "white", fontSize: 20 }}>
                #{formattedNumber(id)}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{
                uri: data,
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
                style={{
                  backgroundColor: "white",
                  shadowOpacity: 3,
                  width: "auto",
                  paddingTop: 15,
                }}
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    height: 275,
    width: 275,
    zIndex: 1,
    alignSelf: "center",
    marginTop: -50,
    // marginLeft:50
    // backgroundColor: "black",
  },
});
