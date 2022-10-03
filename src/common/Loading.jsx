import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
  },
});

const LoadingComponent = () => {
  return (
    <View style={styles}>
      <Button title="Loading button" type="clear" loading />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingComponent;
