import { FontAwesome } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../constants/theme";
import { authService } from "../services/authService";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "137722823916-v1om2s2dvkl12vd570mtspmsrgu6n2nh.apps.googleusercontent.com",
    androidClientId:
      "137722823916-ua815hqkjos9c6dh2abostn7m661s2h4.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleAuth(id_token);
    }
  }, [response]);

  const handleGoogleAuth = async (idToken: string) => {
    setLoading(true);
    try {
      await authService.loginWithGoogle(idToken);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Erreur Google", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !username)) return;
    setLoading(true);
    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(username, email, password);
      }
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Erreur", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>fashionApp</Text>
          <Text style={styles.subtitle}>
            {isLogin ? "Connexion" : "Inscription"}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputWrapper}>
              <User color="#9DA3B0" size={20} />
              <TextInput
                placeholder="Nom complet"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Mail color="#9DA3B0" size={20} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock color="#9DA3B0" size={20} />
            <TextInput
              placeholder="Mot de passe"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? "Valider" : "Créer le compte"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.divText}>OU</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
            disabled={!request || loading}
          >
            <FontAwesome name="google" size={18} color="#1A2340" />
            <Text style={styles.googleText}>Continuer avec Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footer}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.footerText}>
              {isLogin ? "Besoin d'un compte ? " : "Déjà membre ? "}
              <Text style={styles.link}>
                {isLogin ? "S'inscrire" : "Se connecter"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FB",
    padding: 25,
    justifyContent: "center",
  },
  header: { alignItems: "center", marginBottom: 40 },
  appName: {
    fontSize: 36,
    fontFamily: Fonts.serif,
    color: "#1A2340",
    fontWeight: "bold",
  },
  subtitle: { color: "#9DA3B0", fontSize: 16, marginTop: 5 },
  form: { width: "100%" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  input: { flex: 1, marginLeft: 10, color: "#1A2340" },
  mainButton: {
    backgroundColor: "#1A2340",
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: "#ECEFF1" },
  divText: {
    marginHorizontal: 10,
    color: "#9DA3B0",
    fontSize: 12,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },
  googleText: { marginLeft: 10, fontWeight: "600", color: "#1A2340" },
  footer: { marginTop: 30, alignItems: "center" },
  footerText: { color: "#9DA3B0" },
  link: { color: "#1A2340", fontWeight: "bold" },
});
