import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Alert,
  FlatList,
  Dimensions
} from "react-native";
import { LayoutGrid, Plus, X, Check, Camera as CameraIcon } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Fonts } from "../../constants/theme";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 60) / 2;

// Interface stricte pour TypeScript
interface ClothingItem {
  id: string;
  image: string;
  category: string;
  subcategory: string;
}

// Typage précis des catégories
type MainCategory = "Hauts" | "Bas" | "Extérieur" | "Accessoires";

const CATEGORY_DATA: Record<MainCategory, string[]> = {
  Hauts: ["T-Shirt", "Sweat", "Veste", "Chemise"],
  Bas: ["Pantalon", "Short", "Jupe"],
  Extérieur: ["Manteau", "Coupe-vent"],
  Accessoires: ["Chapeau", "Ceinture", "Montre"],
};

export default function InventoryScreen() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Tout");
  
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  const [selectedParent, setSelectedParent] = useState<MainCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const categories = ["Tout", "Hauts", "Bas", "Extérieur", "Accessoires"];

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Erreur", "L'accès à la caméra est nécessaire.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) setNewItemImage(result.assets[0].uri);
  };

  const handleSave = () => {
    if (!newItemImage || !selectedParent || !selectedSub) {
      Alert.alert("Formulaire incomplet", "Veuillez remplir tous les champs.");
      return;
    }
    const newItem: ClothingItem = {
      id: Date.now().toString(),
      image: newItemImage,
      category: selectedParent,
      subcategory: selectedSub,
    };
    setItems([newItem, ...items]);
    resetForm();
  };

  const resetForm = () => {
    setNewItemImage(null);
    setSelectedParent(null);
    setSelectedSub(null);
    setIsModalVisible(false);
  };

  const filteredItems = activeTab === "Tout" 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma Garde-robe</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Plus color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ height: 55 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesDiv}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveTab(cat)}
              style={[styles.categoryBadge, activeTab === cat && styles.activeBadge]}
            >
              <Text style={[styles.categoryText, activeTab === cat && styles.activeText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContent}>
          <LayoutGrid color="#9DA3B0" size={48} strokeWidth={1} />
          <Text style={styles.emptyText}>Votre inventaire est vide</Text>
          <Text style={styles.subtitle}>{`Ajoutez vos vêtements pour commencer.`}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          renderItem={({ item, index }) => (
            <View style={[styles.itemCard, { marginRight: index % 2 === 0 ? 20 : 0 }]}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemSubText}>{item.subcategory}</Text>
              </View>
            </View>
          )}
        />
      )}

      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={resetForm}><X color="#1A2340" size={24} /></TouchableOpacity>
            <Text style={styles.modalTitle}>Ajouter un article</Text>
            <TouchableOpacity onPress={handleSave}>
              <Check color={newItemImage && selectedSub ? "#2ecc71" : "#9DA3B0"} size={26} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <TouchableOpacity style={styles.imageUploader} onPress={handleTakePhoto}>
              {newItemImage ? (
                <Image source={{ uri: newItemImage }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <CameraIcon color="#9DA3B0" size={32} />
                  <Text style={styles.uploadText}>{`Prendre une photo de l'article`}</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Catégorie principale</Text>
            <View style={styles.selectionGrid}>
              {(Object.keys(CATEGORY_DATA) as MainCategory[]).map((cat) => (
                <TouchableOpacity 
                  key={cat}
                  style={[styles.chip, selectedParent === cat && styles.chipActive]}
                  onPress={() => { setSelectedParent(cat); setSelectedSub(null); }}
                >
                  <Text style={[styles.chipText, selectedParent === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedParent && (
              <>
                <Text style={styles.label}>Sous-catégorie</Text>
                <View style={styles.selectionGrid}>
                  {CATEGORY_DATA[selectedParent].map((sub) => (
                    <TouchableOpacity 
                      key={sub}
                      style={[styles.chip, selectedSub === sub && styles.chipActive]}
                      onPress={() => setSelectedSub(sub)}
                    >
                      <Text style={[styles.chipText, selectedSub === sub && styles.chipTextActive]}>{sub}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// Styles placés explicitement en fin de fichier
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB", paddingTop: 60 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 10 },
  title: { fontSize: 26, fontFamily: Fonts.serif, color: "#1A2340", fontWeight: "bold" },
  addButton: { backgroundColor: "#1A2340", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  categoriesDiv: { marginTop: 10, paddingLeft: 20 },
  categoryBadge: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: "white", marginRight: 10, height: 38, borderWidth: 1, borderColor: "#ECEFF1", justifyContent: "center" },
  activeBadge: { backgroundColor: "#1A2340", borderColor: "#1A2340" },
  categoryText: { color: "#9DA3B0", fontWeight: "600", fontSize: 14 },
  activeText: { color: "white" },
  gridContainer: { padding: 20, paddingBottom: 100 },
  itemCard: { width: COLUMN_WIDTH, backgroundColor: "white", borderRadius: 20, marginBottom: 20, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 },
  itemImage: { width: "100%", height: 180, resizeMode: "cover" },
  itemInfo: { padding: 12, alignItems: 'center' },
  itemSubText: { fontSize: 12, fontWeight: 'bold', color: '#1A2340' },
  emptyContent: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyText: { marginTop: 20, fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  subtitle: { textAlign: "center", color: "#9DA3B0", marginTop: 8, lineHeight: 22 },
  modalContainer: { flex: 1, backgroundColor: "white" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", padding: 20, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1A2340" },
  modalBody: { padding: 20 },
  imageUploader: { width: "100%", height: 220, backgroundColor: "#F8F9FB", borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 25, borderStyle: "dashed", borderWidth: 2, borderColor: "#ECEFF1", overflow: "hidden" },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  uploadPlaceholder: { alignItems: "center" },
  uploadText: { color: "#9DA3B0", marginTop: 10, fontWeight: "500" },
  label: { fontSize: 15, fontWeight: "bold", color: "#1A2340", marginBottom: 12, marginTop: 10 },
  selectionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: "#F8F9FB", borderWidth: 1, borderColor: "#ECEFF1" },
  chipActive: { backgroundColor: "#1A2340", borderColor: "#1A2340" },
  chipText: { color: "#1A2340", fontSize: 14 },
  chipTextActive: { color: "white" },
});