import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Link } from "react-router-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

keyExtractor = (item, index) => index.toString();

renderItem = ({ item }) => (
  <Link push to="/detail" state={item}>
    <View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  </Link>
);

const getPlanet = async (url) => {
  await axios.get(url).then((response) => {
    return response.data.name;
  });
};

const getSubtitle = (planetUrl, props) => {
  let subtitle = "";
  let planets = props.props.planets;
  let planet = "";
  for (const i in planets) {
    if (planets[i].url === planetUrl) {
      planet = planets[i].name;
    }
  }
  if (planet === "") {
    planet = getPlanet(planetUrl);
    console.log(planet);
  }

  console.log("Especie y planeta: ", planet);
  subtitle = "From: ".concat(planet);
  return subtitle;
};

const Menu = (props) => {
  let data = [];
  if (props.props.people.length > 0) {
    data = props.props.people ? props.props.people : [];
    for (const i in data) {
      data[i].subtitle = getSubtitle(data[i].homeworld, props);
    }
  }
  return (
    <FlatList
      scrollEnabled={true}
      keyExtractor={this.keyExtractor}
      data={data}
      renderItem={this.renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Menu;
