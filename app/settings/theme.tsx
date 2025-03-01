import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Moon, Sun, Palette, Check } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ThemeSettingsScreen() {
  const { colors, theme, setTheme } = useTheme();
  
  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
  ];
  
  const colorSchemes = [
    { name: 'Blue', primary: '#4361EE', secondary: '#3F37C9' },
    { name: 'Purple', primary: '#7209B7', secondary: '#560BAD' },
    { name: 'Pink', primary: '#F72585', secondary: '#B5179E' },
    { name: 'Green', primary: '#06D6A0', secondary: '#0CB885' },
    { name: 'Orange', primary: '#FB8500', secondary: '#FF6B35' },
  ];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 35,
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      marginTop: 24,
      paddingHorizontal: 4,
    },
    themeOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    themeOption: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 12,
      marginHorizontal: 8,
    },
    themeOptionSelected: {
      borderWidth: 2,
    },
    themeIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    themeLabel: {
      fontSize: 16,
      fontWeight: '600',
    },
    colorSchemeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    colorSchemeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    colorSchemeOption: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    colorSchemeSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    colorSwatch: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 12,
    },
    colorName: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    infoText: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 8,
      marginBottom: 24,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme Settings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.section}>
          <View style={styles.themeOptionsContainer}>
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.key;
              
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.themeOption,
                    isSelected && [
                      styles.themeOptionSelected,
                      { borderColor: colors.primary }
                    ],
                    { backgroundColor: option.key === 'dark' ? '#1E1E1E' : '#F7F7F9' }
                  ]}
                  onPress={() => setTheme(option.key as 'light' | 'dark')}
                >
                  <View 
                    style={[
                      styles.themeIconContainer,
                      { 
                        backgroundColor: option.key === 'dark' ? '#121212' : '#FFFFFF',
                      }
                    ]}
                  >
                    <Icon 
                      size={28} 
                      color={option.key === 'dark' ? '#FFFFFF' : '#1A1A2E'} 
                    />
                  </View>
                  <Text 
                    style={[
                      styles.themeLabel,
                      { color: option.key === 'dark' ? '#FFFFFF' : '#1A1A2E' }
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Color Scheme</Text>
        <View style={styles.section}>
          <Text style={styles.colorSchemeTitle}>Select a color scheme</Text>
          <View style={styles.colorSchemeContainer}>
            {colorSchemes.map((scheme, index) => {
              const isSelected = scheme.primary === colors.primary;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorSchemeOption,
                    isSelected && styles.colorSchemeSelected,
                  ]}
                  onPress={() => {
                    console.log(`Selected ${scheme.name} theme`);
                  }}
                >
                  <View 
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: scheme.primary }
                    ]}
                  />
                  <Text style={styles.colorName}>{scheme.name}</Text>
                  {isSelected && <Check size={20} color={colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <Text style={styles.infoText}>
          Customize the appearance of your app by selecting a theme and color scheme that suits your preference. Changes are applied immediately.
        </Text>
      </ScrollView>
    </View>
  );
}