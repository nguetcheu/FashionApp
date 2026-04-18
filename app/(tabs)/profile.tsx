import { useRouter } from "expo-router";
import { Edit3, Grid, LogOut, Settings } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts } from "../../constants/theme";
import { authService } from "../../services/authService";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = width / 3;

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // On ne montre le loader global que si on n'a pas encore de données
      if (!profile) setLoading(true);
      const data = await authService.getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error("Erreur profil:", error);
      Alert.alert("Erreur", "Impossible de charger votre profil.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        onPress: async () => {
          await authService.logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={handleLogout}>
          <LogOut color="#1A2340" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
          <Settings color="#1A2340" size={20} />
        </TouchableOpacity>
      </View>

      {/* Infos Profil */}
      <View style={styles.profileInfo}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            {/* Si ça charge et qu'on n'a pas de profil, on met un petit spinner dans le cercle */}
            {loading && !profile ? (
              <ActivityIndicator size="small" color="#1A2340" />
            ) : (
              <Text style={styles.avatarText}>
                {profile?.user?.username?.charAt(0).toUpperCase() || "U"}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Edit3 color="white" size={14} />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>
          {profile?.user?.username ||
            (loading ? "Chargement..." : "Utilisateur")}
        </Text>
        <Text style={styles.userHandle}>{profile?.user?.email || " "}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profile?.stats?.itemsCount ?? 0}
            </Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profile?.stats?.outfitsCount ?? 0}
            </Text>
            <Text style={styles.statLabel}>Tenues</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Grid color="#1A2340" size={20} />
        <Text style={styles.sectionTitle}>Mes Tenues</Text>
      </View>

      <FlatList
        data={profile?.outfits || []}
        numColumns={3}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem}>
            <Image
              source={{
                uri: item.imageUrl || "https://via.placeholder.com/150",
              }}
              style={styles.gridImage}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator color="#1A2340" />
            ) : (
              <Text style={styles.emptyText}>
                {`Vous n'avez pas encore créé de tenues.`}
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 50,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  profileInfo: { alignItems: "center", marginTop: 10 },
  imageContainer: { position: "relative" },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.background,
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
    width: "70%",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
  },
  statBox: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  statLabel: { fontSize: 12, color: "#9DA3B0" },
  divider: { width: 1, height: "100%", backgroundColor: "#ECEFF1" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  gridContent: { paddingBottom: 20 },
  gridItem: { width: COLUMN_WIDTH, height: COLUMN_WIDTH, padding: 1 },
  gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
  emptyContainer: { padding: 40, alignItems: "center" },
  emptyText: { color: "#9DA3B0", textAlign: "center" },
});
