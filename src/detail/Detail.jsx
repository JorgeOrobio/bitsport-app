import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import { useLocation, Link } from "react-router-native";
import CustomHeader from "../common/Header";
import StyledText from "../common/StyledText";
import axios from "axios";
import { Card } from "react-native-elements";

const convertedPersonalInfo = {
  eye_color: "Eye Color: ",
  hair_color: "Hair Color: ",
  skin_color: "Skin Color: ",
  birth_year: "Birth Year: ",
};

const SectionInformation = (information) => {
  let render = [];
  for (const i in information) {
    render.push(
      <View
        key={"sectionInformation" + i}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StyledText
          key={convertedPersonalInfo[i]}
          style={{
            display: "flex",
            fontSize: 20,
            color: "#B4B4B4",
            alignSelf: "flex-start",
            margin: 25,
          }}
        >
          {convertedPersonalInfo[i]}
        </StyledText>
        <StyledText
          key={information[i]}
          style={{
            display: "flex",
            fontSize: 20,
            alignSelf: "flex-end",
            margin: 25,
          }}
          fontWeight={"bold"}
        >
          {information[i]}
        </StyledText>
      </View>
    );
  }
  return <View style={{ margin: 5 }}>{render}</View>;
};

const VehiclesList = (vehicles) => {
  let render = [];
  for (const i in vehicles) {
    render.push(
      <StyledText
        key={vehicles[i]}
        style={{ display: "flex", fontSize:15,  alignSelf: "flex-start", margin: 20 }}
      >
        {vehicles[i]}
      </StyledText>
    );
  }
  return <View style={{ marginTop: 30 }}>{render}</View>;
};

const Detail = () => {
  let { state } = useLocation();
  const [vehicles, setVehicles] = useState([]);
  let headerText = state.name ? state.name : "Not Found";
  let personalInfo = {
    eye_color: state.eye_color,
    hair_color: state.hair_color,
    skin_color: state.skin_color,
    birth_year: state.birth_year,
  };
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
    const getVehicles = async (vehicles) => {
      let names = [];
      if (vehicles.length > 0) {
        for (const i in vehicles) {
          const response = await axios.get(vehicles[i]);
          names.push(response.data.name);
        }
      }
      setVehicles(names);
    };

    getVehicles(state.vehicles);
  }, []);
  console.log(state);

  return (
    <ScrollView>
      <CustomHeader props={{ header: headerText }} />
      <View style={styles.container}>
        <StyledText fontWeight={"bold"} style={{ margin: 20 }}>
          {" "}
          General Information{" "}
        </StyledText>
      </View>
      <Card style={{ flex: 1 }}>{SectionInformation(personalInfo)}</Card>
      <StyledText fontWeight={"bold"} style={{ margin: 20 }}>
        {" "}
        Vehicles{" "}
      </StyledText>
      <Card style={{ flex: 1 }}>{VehiclesList(vehicles)}</Card>
      <Link to="/">
        <Text style={{ color: "#f00", margin: 15 }}> Volver </Text>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
});

export default Detail;
