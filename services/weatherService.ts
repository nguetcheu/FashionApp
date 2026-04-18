import * as Location from "expo-location";
import api from "./api";

export const weatherService = {
  async getWeather() {
    try {
      // 1. Demander la permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      let city = "Paris"; // Ville par défaut

      if (status === "granted") {
        // 2. Obtenir les coordonnées
        const location = await Location.getCurrentPositionAsync({});

        // 3. Traduire les coordonnées en nom de ville
        const reverseGeocode = await Location.reverseGeocodeAsync(
          location.coords,
        );
        if (reverseGeocode[0]?.city) {
          city = reverseGeocode[0].city;
        }
      }

      // 4. Appel à ton backend
      const response = await api.get(`/recommend/weather?city=${city}`);
      return response.data;
    } catch (error) {
      console.error("Erreur dans weatherService:", error);
      throw error;
    }
  },

  getWeatherEmoji(condition: string) {
    const c = condition?.toLowerCase();
    if (c?.includes("cloud")) return "☁️";
    if (c?.includes("rain")) return "🌧️";
    if (c?.includes("clear")) return "☀️";
    if (c?.includes("snow")) return "❄️";
    return "⛅";
  },
};
