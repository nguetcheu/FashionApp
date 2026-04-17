import * as SecureStore from "expo-secure-store";
import api from "./api";

export const authService = {
  // Connexion classique
  login: async (email: string, mdp: string) => {
    try {
      // On envoie "password" car c'est ce que ton backend attend (req.body.password)
      const response = await api.post("/auth/login", { email, password: mdp });

      if (response.data.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Erreur de connexion";
    }
  },

  // Inscription
  register: async (username: string, email: string, mdp: string) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password: mdp,
      });
      if (response.data.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Erreur lors de l'inscription";
    }
  },

  // Connexion via Google
  loginWithGoogle: async (idToken: string) => {
    try {
      const response = await api.post("/auth/google", { idToken });
      if (response.data.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Erreur Google Auth";
    }
  },

  // Déconnexion
  logout: async () => {
    await SecureStore.deleteItemAsync("userToken");
  },
};
