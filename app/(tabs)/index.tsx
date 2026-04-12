import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* SECTION EN-TÊTE */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Outfits calendar</Text>
          <Text style={styles.dateLabel}>Dimanche 12 Avril</Text>
        </View>

        {/* CARTE MÉTÉO */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherLeft}>
            <Text style={styles.weatherLabel}>MÉTÉO</Text>
            <Text style={styles.temperature}>-3° à +8°</Text>
            <Text style={styles.precipitation}>Précipitations : 90%</Text>
          </View>

          <View style={styles.weatherRight}>
            {/* Collage de vêtements à venir */}
            <View style={styles.placeholderImage} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.serif,
    color: Colors.light.text,
    fontWeight: "700",
  },
  dateLabel: {
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 4,
    opacity: 0.8,
  },
  weatherCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  weatherLeft: {
    flex: 1,
  },
  weatherLabel: {
    color: Colors.light.icon,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginVertical: 4,
  },
  precipitation: {
    fontSize: 12,
    color: Colors.light.text,
  },
  weatherRight: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
  },
});
