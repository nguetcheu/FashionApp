import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CloudRain, Camera, Coffee, Briefcase, Zap } from 'lucide-react-native';
import { Colors, Fonts } from "../../constants/theme";

export default function RecommendScreen() {
  const [selectedMood, setSelectedMood] = useState('chill');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>IA Style</Text>
        <Text style={styles.date}>Dimanche 12 Avril</Text>
      </View>

      <View style={styles.weatherCard}>
        {/* Ajout du style weatherInfo qui manquait */}
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherLabel}>MÉTÉO</Text>
          <Text style={styles.tempRange}>-3° à +8°</Text>
          <Text style={styles.precipitation}>Précipitations : 90%</Text>
        </View>
        <View style={styles.weatherIconPlaceholder}>
           <CloudRain size={40} color="#2c3e50" strokeWidth={1.5} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Votre humeur du jour</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity 
          style={[styles.moodItem, selectedMood === 'pro' && styles.moodActive]}
          onPress={() => setSelectedMood('pro')}>
          <Briefcase size={22} color={selectedMood === 'pro' ? 'white' : '#2c3e50'} />
          <Text style={[styles.moodText, selectedMood === 'pro' && styles.textActive]}>Pro</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.moodItem, selectedMood === 'chill' && styles.moodActive]}
          onPress={() => setSelectedMood('chill')}>
          <Coffee size={22} color={selectedMood === 'chill' ? 'white' : '#2c3e50'} />
          <Text style={[styles.moodText, selectedMood === 'chill' && styles.textActive]}>Détente</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.moodItem, selectedMood === 'bold' && styles.moodActive]}
          onPress={() => setSelectedMood('bold')}>
          <Zap size={22} color={selectedMood === 'bold' ? 'white' : '#2c3e50'} />
          <Text style={[styles.moodText, selectedMood === 'bold' && styles.textActive]}>Audacieux</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.scanAction}>
        <View style={styles.scanCircle}>
          <Camera size={32} color="white" />
        </View>
        <Text style={styles.scanText}>Scanner une tenue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontFamily: Fonts.serif, color: '#1A2340', fontWeight: 'bold' },
  date: { fontSize: 16, color: '#9DA3B0', marginTop: 4 },
  
  weatherCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  weatherInfo: { flex: 1 }, // Défini ici pour corriger l'erreur
  weatherLabel: { fontSize: 12, color: '#B0BEC5', fontWeight: 'bold', letterSpacing: 1 },
  tempRange: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', marginVertical: 4 },
  precipitation: { fontSize: 14, color: '#78909C' },
  weatherIconPlaceholder: { backgroundColor: '#F5F7F9', padding: 12, borderRadius: 16 },

  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#2c3e50', marginBottom: 16 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  moodItem: { 
    width: '30%', 
    backgroundColor: 'white', 
    padding: 16, 
    borderRadius: 20, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECEFF1'
  },
  moodActive: { backgroundColor: '#2c3e50', borderColor: '#2c3e50' },
  moodText: { marginTop: 8, fontSize: 12, color: '#2c3e50', fontWeight: '500' },
  textActive: { color: 'white' },

  scanAction: { alignItems: 'center', marginTop: 20 },
  scanCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#2c3e50', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 12,
  },
  scanText: { fontSize: 16, fontWeight: '600', color: '#2c3e50' }
});