import { LayoutGrid, Plus } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../../constants/theme";

export default function InventoryScreen() {
  // Liste des catégories selon ton document
  const categories = ["All", "T-Shirts", "Sweaters", "Pants", "Shoes"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma Garde-robe</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesDiv}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryBadge, index === 0 && styles.activeBadge]}
          >
            <Text
              style={[styles.categoryText, index === 0 && styles.activeText]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        <LayoutGrid color="#9DA3B0" size={48} strokeWidth={1} />
        <Text style={styles.emptyText}>Votre inventaire est vide</Text>
        <Text style={styles.subtitle}>
          Ajoutez vos premiers vêtements pour commencer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB", paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.serif,
    color: "#1A2340",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#1A2340",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesDiv: { maxHeight: 50, marginTop: 20, paddingLeft: 20 },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 10,
    height: 35,
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  activeBadge: { backgroundColor: "#1A2340", borderColor: "#1A2340" },
  categoryText: { color: "#9DA3B0", fontWeight: "600", fontSize: 14 },
  activeText: { color: "white" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A2340",
  },
  subtitle: { textAlign: "center", color: "#9DA3B0", marginTop: 8 },
});
