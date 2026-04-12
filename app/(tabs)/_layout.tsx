import React from 'react';
import { Tabs } from 'expo-router';
import { Shirt, Sparkles, LayoutGrid, User } from 'lucide-react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tabBar, // Ton beige #F2EEE9
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'sans-serif', // On affinera avec tes polices plus tard
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Garde-robe',
          tabBarIcon: ({ color }) => <Shirt color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="recommend"
        options={{
          title: 'IA Style',
          tabBarIcon: ({ color }) => <Sparkles color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Gestion',
          tabBarIcon: ({ color }) => <LayoutGrid color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}