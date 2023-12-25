import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Cloud,
  Fog,
  Night,
  Normal,
  Rain,
  Snow,
} from "../assets/bgImages/index";
import SearchBar from "./SearchBar";

const Weather = ({ weatherData, fetchWeatherData }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const {
    weather,
    name,
    main: { temp },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(main));
  }, [weatherData]);

  // Function to get the appropriate background image based on the weather condition
  function getBackgroundImage(weather) {
    if (weather === "Clear") return Normal;
    if (weather === "Night") return Night;
    if (weather === "Rain") return Rain;
    if (weather === "Snow") return Snow;
    if (weather === "Fog") return Fog;
    if (weather === "Clouds") return Cloud;

    return Normal;
  }

  let textColor = backgroundImage === Snow ? "black" : "white";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 34,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            {main}
          </Text>
          <Text style={{ ...styles.headerText, color: textColor }}>
            {temp} °C
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImage: { flex: 1, width: Dimensions.get("screen").width },
  headerText: {
    fontSize: 28,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});
