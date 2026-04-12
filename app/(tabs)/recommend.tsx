import * as ImagePicker from "expo-image-picker";
import {
  Briefcase,
  Camera,
  CloudRain,
  Coffee,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../../constants/theme";

export default function RecommendScreen() {
  const [selectedMood, setSelectedMood] = useState("chill");
  const [outfitImage, setOutfitImage] = useState<string | null>(null);

  // Fonction pour gérer la capture de la tenue complète
  const takePhoto = async () => {
    // Demande de permission pour la caméra
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission requise",
        "L'accès à la caméra est nécessaire pour que l'IA puisse analyser votre tenue.",
      );
      return;
    }

    // Lancement de l'appareil photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setOutfitImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Text style={styles.title}>IA Style</Text>
        <Text style={styles.date}>Dimanche 12 Avril</Text>
      </View>

      {/* WEATHER CARD */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherLabel}>MÉTÉO</Text>
          <Text style={styles.tempRange}>-3° à +8°</Text>
          <Text style={styles.precipitation}>Précipitations : 90%</Text>
        </View>
        <View style={styles.weatherIconPlaceholder}>
          <CloudRain size={40} color="#1A2340" strokeWidth={1.5} />
        </View>
      </View>

      {/* MOOD SELECTOR */}
      <Text style={styles.sectionTitle}>Votre humeur du jour</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity
          style={[styles.moodItem, selectedMood === "pro" && styles.moodActive]}
          onPress={() => setSelectedMood("pro")}
        >
          <Briefcase
            size={22}
            color={selectedMood === "pro" ? "white" : "#1A2340"}
          />
          <Text
            style={[
              styles.moodText,
              selectedMood === "pro" && styles.textActive,
            ]}
          >
            Pro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.moodItem,
            selectedMood === "chill" && styles.moodActive,
          ]}
          onPress={() => setSelectedMood("chill")}
        >
          <Coffee
            size={22}
            color={selectedMood === "chill" ? "white" : "#1A2340"}
          />
          <Text
            style={[
              styles.moodText,
              selectedMood === "chill" && styles.textActive,
            ]}
          >
            Détente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.moodItem,
            selectedMood === "bold" && styles.moodActive,
          ]}
          onPress={() => setSelectedMood("bold")}
        >
          <Zap
            size={22}
            color={selectedMood === "bold" ? "white" : "#1A2340"}
          />
          <Text
            style={[
              styles.moodText,
              selectedMood === "bold" && styles.textActive,
            ]}
          >
            Audacieux
          </Text>
        </TouchableOpacity>
      </View>

      {/* SCAN AREA : DYNAMIQUE */}
      <View style={styles.actionContainer}>
        {outfitImage ? (
          <View style={styles.previewWrapper}>
            <Image source={{ uri: outfitImage }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setOutfitImage(null)}
            >
              <RotateCcw color="white" size={18} />
              <Text style={styles.retakeText}>Changer de tenue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.scanAction} onPress={takePhoto}>
            <View style={styles.scanCircle}>
              <Camera size={32} color="white" />
            </View>
            <Text style={styles.scanText}>Scanner ma tenue complète</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ANALYZE BUTTON (Visible uniquement si une photo est présente) */}
      {outfitImage && (
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() =>
            Alert.alert(
              "Analyse IA",
              "Comparaison de la tenue avec la météo et l'humeur...",
            )
          }
        >
          <Sparkles color="white" size={22} />
          <Text style={styles.analyzeButtonText}>Lancer lanalyse IA</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.serif,
    color: "#1A2340",
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#9DA3B0",
    marginTop: 4,
  },
  weatherCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  weatherInfo: {
    flex: 1,
  },
  weatherLabel: {
    fontSize: 12,
    color: "#B0BEC5",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  tempRange: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A2340",
    marginVertical: 4,
  },
  precipitation: {
    fontSize: 14,
    color: "#78909C",
  },
  weatherIconPlaceholder: {
    backgroundColor: "#F5F7F9",
    padding: 12,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A2340",
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  moodItem: {
    width: "30%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  moodActive: {
    backgroundColor: "#1A2340",
    borderColor: "#1A2340",
  },
  moodText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1A2340",
    fontWeight: "500",
  },
  textActive: {
    color: "white",
  },
  actionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scanAction: {
    alignItems: "center",
    width: "100%",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 24,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ECEFF1",
  },
  scanCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1A2340",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  scanText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A2340",
  },
  previewWrapper: {
    width: "100%",
    height: 400,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#E0E0E0",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  retakeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(26, 35, 64, 0.9)",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  retakeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  analyzeButton: {
    backgroundColor: "#2ecc71",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 50,
    shadowColor: "#2ecc71",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  analyzeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
