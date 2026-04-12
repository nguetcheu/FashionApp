import { Grid, Heart, Settings } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fonts } from "../../constants/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Settings color="#1A2340" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.avatarText}>NKD</Text>
        </View>
        <Text style={styles.userName}>Nguetcheu dominique</Text>
        <Text style={styles.userHandle}>@bika_style</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tenues</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabSection}>
        <TouchableOpacity style={styles.tabActive}>
          <Grid color="#1A2340" size={20} />
          <Text style={styles.tabTextActive}>Mes Tenues</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Heart color="#9DA3B0" size={20} />
          <Text style={styles.tabTextInactive}>Favoris</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB", paddingTop: 50 },
  header: { alignItems: "flex-end", paddingHorizontal: 20 },
  profileInfo: { alignItems: "center", marginTop: 20 },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F2EEE9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
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
  userHandle: { color: "#9DA3B0", fontSize: 14 },
  statsRow: {
    flexDirection: "row",
    marginTop: 25,
    width: "60%",
    justifyContent: "space-between",
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  statLabel: { fontSize: 12, color: "#9DA3B0" },
  tabSection: {
    flexDirection: "row",
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#ECEFF1",
  },
  tabActive: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#1A2340",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  tabInactive: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  tabTextActive: { fontWeight: "bold", color: "#1A2340" },
  tabTextInactive: { color: "#9DA3B0" },
});
