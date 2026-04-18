import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, Fonts } from "../../constants/theme";
import { weatherService } from "../../services/weatherService";

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. GESTION DE LA DATE ACTUELLE
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // 2. RÉCUPÉRATION DE LA MÉTÉO VIA LE SERVICE
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await weatherService.getWeather();
        setWeather(data);
      } catch (error) {
        console.error("Erreur météo Home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* SECTION EN-TÊTE DYNAMIQUE */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Outfits calendar</Text>
          <Text style={styles.dateLabel}>
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </Text>
        </View>

        {/* CARTE MÉTÉO RÉELLE */}
        <View style={styles.weatherCard}>
          {loading ? (
            <ActivityIndicator color={Colors.light.text} />
          ) : weather ? (
            <>
              <View style={styles.weatherLeft}>
                <Text style={styles.weatherLabel}>
                  MÉTÉO • {weather.city?.toUpperCase()}
                </Text>
                <Text style={styles.temperature}>
                  {Math.round(weather.temp)}°C
                </Text>
                <Text style={styles.precipitation}>
                  {weather.description.charAt(0).toUpperCase() +
                    weather.description.slice(1)}
                </Text>
              </View>

              <View style={styles.weatherRight}>
                <View style={styles.placeholderImage}>
                  <Text style={{ fontSize: 40 }}>
                    {weatherService.getWeatherEmoji(weather.condition)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.precipitation}>Météo non disponible</Text>
          )}
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    minHeight: 120,
  },
  weatherLeft: {
    flex: 1,
  },
  weatherLabel: {
    color: Colors.light.icon,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text,
    marginVertical: 4,
  },
  precipitation: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  weatherRight: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.background,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
