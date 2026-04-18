import * as ImagePicker from "expo-image-picker";
import {
  Briefcase,
  Camera,
  Coffee,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts } from "../../constants/theme";
import { weatherService } from "../../services/weatherService";

export default function RecommendScreen() {
  const [selectedMood, setSelectedMood] = useState("chill");
  const [outfitImage, setOutfitImage] = useState<string | null>(null);

  // États pour la météo réelle
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  // 1. GESTION DE LA DATE DYNAMIQUE
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // 2. APPEL AU SERVICE MÉTEO
  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoadingWeather(true);
        const data = await weatherService.getWeather();
        setWeather(data);
      } catch (error) {
        console.error("Erreur météo Recommend:", error);
      } finally {
        setLoadingWeather(false);
      }
    };

    loadWeather();
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission requise",
        "L'accès à la caméra est nécessaire pour que l'IA puisse analyser votre tenue.",
      );
      return;
    }

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
        <Text style={styles.date}>
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        </Text>
      </View>

      {/* WEATHER CARD RÉELLE */}
      <View style={styles.weatherCard}>
        {loadingWeather ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator color={Colors.light.text} />
          </View>
        ) : weather ? (
          <>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherLabel}>
                MÉTÉO • {weather.city?.toUpperCase()}
              </Text>
              <Text style={styles.tempRange}>{Math.round(weather.temp)}°C</Text>
              <Text style={styles.precipitation}>
                {weather.description?.charAt(0).toUpperCase() +
                  weather.description?.slice(1)}
              </Text>
            </View>
            <View style={styles.weatherIconPlaceholder}>
              <Text style={{ fontSize: 40 }}>
                {weatherService.getWeatherEmoji(weather.condition)}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.precipitation}>Météo non disponible</Text>
        )}
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
            color={selectedMood === "pro" ? "white" : Colors.light.text}
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
            color={selectedMood === "chill" ? "white" : Colors.light.text}
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
            color={selectedMood === "bold" ? "white" : Colors.light.text}
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

      {/* SCAN AREA */}
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

      {/* ANALYZE BUTTON */}
      {outfitImage && (
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() =>
            Alert.alert("Analyse IA", "Comparaison de la tenue en cours...")
          }
        >
          <Sparkles color="white" size={22} />
          <Text style={styles.analyzeButtonText}>{`Lancer l'analyse IA`}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 30 },
  title: {
    fontSize: 28,
    fontFamily: Fonts.serif,
    color: Colors.light.text,
    fontWeight: "bold",
  },
  date: { fontSize: 16, color: Colors.light.icon, marginTop: 4 },
  weatherCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    elevation: 2,
    minHeight: 120,
  },
  centerLoader: { flex: 1, justifyContent: "center", alignItems: "center" },
  weatherInfo: { flex: 1 },
  weatherLabel: {
    fontSize: 12,
    color: Colors.light.icon,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  tempRange: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    marginVertical: 4,
  },
  precipitation: { fontSize: 14, color: Colors.light.text, opacity: 0.7 },
  weatherIconPlaceholder: {
    backgroundColor: Colors.light.background,
    padding: 12,
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  moodItem: {
    width: "30%",
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  moodActive: {
    backgroundColor: Colors.light.text,
    borderColor: Colors.light.text,
  },
  moodText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: "500",
  },
  textActive: { color: "white" },
  actionContainer: { alignItems: "center", marginBottom: 20 },
  scanAction: {
    alignItems: "center",
    width: "100%",
    padding: 40,
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ECEFF1",
  },
  scanCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.text,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  scanText: { fontSize: 16, fontWeight: "600", color: Colors.light.text },
  previewWrapper: {
    width: "100%",
    height: 400,
    borderRadius: 24,
    overflow: "hidden",
  },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
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
  },
  retakeText: { color: "white", fontSize: 13, fontWeight: "bold" },
  analyzeButton: {
    backgroundColor: "#2ecc71",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 50,
  },
  analyzeButtonText: { color: "white", fontWeight: "bold", fontSize: 18 },
});
