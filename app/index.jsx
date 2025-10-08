import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import image from "../assets/images/image.png";
import { NEWS_API_KEY } from "@env";
const index = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`
        );
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>Stay Ahead, One Headline at a Time</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#1B1A55",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginVertical: 20,
  },
  navbar: {
    padding: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
