import { Edit3, Grid, Heart, Settings } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../../constants/theme";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = width / 3; // Grille de 3 colonnes pour le profil (style Instagram)

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("tenues");

  // Données de test (Mocks) pour simuler le rendu visuel
  const dummyOutfits = [
    {
      id: "1",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
    },
    {
      id: "2",
      img: "https://images.unsplash.com/photo-1539109132314-d4a8c6138d83?w=500",
    },
    {
      id: "3",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header avec icônes d'action */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle}>
          <Settings color="#1A2340" size={20} />
        </TouchableOpacity>
      </View>

      {/* Infos Profil */}
      <View style={styles.profileInfo}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.avatarText}>NKD</Text>
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Edit3 color="white" size={14} />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>Nguetcheu Dominique</Text>
        <Text style={styles.userHandle}>@bika_style</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tenues</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>102</Text>
            <Text style={styles.statLabel}>Abonnés</Text>
          </View>
        </View>
      </View>

      {/* Navigation Interne (Tabs) */}
      <View style={styles.tabSection}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "tenues" && styles.tabActive]}
          onPress={() => setActiveTab("tenues")}
        >
          <Grid
            color={activeTab === "tenues" ? "#1A2340" : "#9DA3B0"}
            size={20}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "tenues" && styles.tabTextActive,
            ]}
          >
            Mes Tenues
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "favoris" && styles.tabActive]}
          onPress={() => setActiveTab("favoris")}
        >
          <Heart
            color={activeTab === "favoris" ? "#1A2340" : "#9DA3B0"}
            size={20}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "favoris" && styles.tabTextActive,
            ]}
          >
            Favoris
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grille de contenu */}
      <FlatList
        data={activeTab === "tenues" ? dummyOutfits : []}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem}>
            <Image source={{ uri: item.img }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun contenu à afficher</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  profileInfo: { alignItems: "center", marginTop: 10 },
  imageContainer: { position: "relative" },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F2EEE9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1A2340",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#1A2340" },
  userName: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    fontWeight: "bold",
    color: "#1A2340",
    marginTop: 15,
  },
  userHandle: { color: "#9DA3B0", fontSize: 14, marginBottom: 20 },

  statsRow: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  statLabel: { fontSize: 12, color: "#9DA3B0" },
  divider: { width: 1, height: "100%", backgroundColor: "#ECEFF1" },

  tabSection: {
    flexDirection: "row",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF1",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#1A2340" },
  tabText: { color: "#9DA3B0", fontWeight: "600" },
  tabTextActive: { color: "#1A2340", fontWeight: "bold" },

  gridContent: { paddingBottom: 20 },
  gridItem: { width: COLUMN_WIDTH, height: COLUMN_WIDTH, padding: 1 },
  gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
  emptyContainer: { padding: 40, alignItems: "center" },
  emptyText: { color: "#9DA3B0" },
});
