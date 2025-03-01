import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Camera, Mail, User, Save } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { colors } = useTheme();
  
  const [name, setName] = useState('Fatlind Osmani');
  const [email, setEmail] = useState('osmanifatlind78@gmail.com');
  const [bio, setBio] = useState('Computer Science student passionate about mobile app development and AI.');
  
  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    router.back();
  };
  
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
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 12,
    },
    changePhotoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary + '20',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    changePhotoText: {
      color: colors.primary,
      marginLeft: 8,
      fontWeight: '500',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80' }} 
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Camera size={16} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
            <User size={20} color={colors.gray} style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, color: colors.text }}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.gray}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
            <Mail size={20} color={colors.gray} style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, color: colors.text }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.gray}
              keyboardType="email-address"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor={colors.gray}
            multiline
            numberOfLines={5}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Save size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}