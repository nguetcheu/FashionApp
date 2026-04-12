import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion 📋</Text>
      <Text style={styles.subtitle}>Organisez vos ensembles ici.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EEE9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
