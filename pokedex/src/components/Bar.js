import React from "react";
import { View, StyleSheet } from "react-native";

const Bar = ({ status }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          {
            width: `${status}%`,
            backgroundColor: status > 50 ? "green" : "red",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
});

export default Bar;
