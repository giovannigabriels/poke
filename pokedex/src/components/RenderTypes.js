import React from "react";
import { View, StyleSheet, Text } from "react-native";
import backgroundColor from "../utils/getBackGroundColor";

const RenderTypes = (typesPoke, width, height) => {
  return typesPoke?.map((type, index) => (
    <View
      key={index}
      style={[
        styles.typeContainer,
        { backgroundColor: backgroundColor(typesPoke), width, height },
      ]}>
      <Text style={styles.typeText}>
        {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
      </Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  typeContainer: {
    borderRadius: 15,
    margin: 5,
    elevation: 5,
    justifyContent: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    alignSelf: "center",
  },
});

export default RenderTypes;
