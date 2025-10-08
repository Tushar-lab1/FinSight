import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import image from "../assets/images/image.png";
import { NEWS_API_KEY } from "@env";
import { FlatList, Modal ,RefreshControl } from "react-native";
const index = () => {
  const [news, setNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const mockSummary = [
    "This article highlights key financial market trends today.",
    "It discusses the impact of recent stock movements and investor sentiment.",
    "Experts predict possible market corrections in the upcoming week.",
  ];

  async function fetchData() {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`
      );
      const data = await res.json();
      setNews(data.articles.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const openModal = (item) => {
    setSelectedNews(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {item.urlToImage ? (
          <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
        ) : (
          <Image source={image} style={styles.newsImage} />
        )}
        <View style={styles.textcard}>
          <Text style={styles.title}>Title : {item.title}</Text>
          <Text style={styles.text}>Source : {item.source.name}</Text>
          <Text style={styles.text}>
            Time : {new Date(item.publishedAt).toLocaleTimeString()}
          </Text>
          <TouchableOpacity
            style={styles.button_}
            onPress={() => openModal(item)}
          >
            <Text style={styles.summary}>AI Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>Stay Ahead, One Headline at a Time</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>AI Summary</Text>
            {mockSummary.map((line, index) => (
              <Text key={index} style={styles.summaryText}>
                {line}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  navbar: {
    padding: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  card: {
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 20,
    padding: 10,
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 30,
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  button_: {
    borderWidth: 2,
    marginVertical: 20,
    padding: 10,
    width: 120,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#caa10dff",
  },
  summary: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#2D2A63",
    borderRadius: 16,
    padding: 20,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },
  summaryText: {
    color: "#ddd",
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
    backgroundColor: "#7F27FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
