import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootIndex() {
  const [isChecking, setIsChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await SecureStore.getItemAsync("userToken");
      setHasToken(!!token);
      setIsChecking(false);
    }
    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8F9FB",
        }}
      >
        <ActivityIndicator size="large" color="#1A2340" />
      </View>
    );
  }

  // Si jeton trouvé -> Météo, sinon -> Connexion
  return hasToken ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
}
