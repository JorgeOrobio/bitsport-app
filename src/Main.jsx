import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler, Alert } from "react-native";
import CustomHeader from "./common/Header";
import LoadingComponent from "./common/Loading";
import Menu from "./menu/Menu";
import axios from "axios";
export const baseUrl= 'https://swapi.dev/api/'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const Main = () => {
  const [header, setHeader] = useState("People");
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getPeople = async () => {
      await axios
        .get(baseUrl + "people")
        .then((response) => {
          setPeople(response.data.results);
        })
        .catch((err) => {
          alert("Failed to load data")
          return "Failed to load data";
        });
    };
    const getPlanet = async () => {
      await axios
        .get(baseUrl + "planets")
        .then((response) => {
          setPlanets(response.data.results);
          setHeader("People from Star wars");
        })
        .catch((err) => {
          alert("Failed to load data")
          return "Failed to load data";
        });
    };
    getPeople();
    getPlanet()
  }, [setPeople, setPlanets]);

  return (
    <View style={styles.container}>
      <CustomHeader props={{ header: header }} />
      {header === "People" ? (
        <LoadingComponent/>
      ) : (
        <Menu props={{ people:people,planets:planets }} />
      )}
    </View>
  );
};

export default Main;
