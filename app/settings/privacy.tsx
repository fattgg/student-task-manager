import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Lock, Eye, Shield, FileText, ExternalLink, Users } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PrivacySecurityScreen() {
  const { colors } = useTheme();
  
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
  const [privateCollaboration, setPrivateCollaboration] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  
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
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      marginTop: 24,
      paddingHorizontal: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    rowText: {
      fontSize: 16,
      color: colors.text,
    },
    rowDescription: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 4,
    },
    infoText: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 8,
      marginBottom: 24,
      lineHeight: 20,
    },
    linkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    linkText: {
      fontSize: 16,
      color: colors.text,
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Lock size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.rowText}>Biometric Login</Text>
                <Text style={styles.rowDescription}>Use fingerprint or face ID to login</Text>
              </View>
            </View>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <TouchableOpacity style={styles.linkButton}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.error + '20' }]}>
                <Shield size={20} color={colors.error} />
              </View>
              <Text style={styles.linkText}>Change Password</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Eye size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.rowText}>Hide Completed Tasks</Text>
                <Text style={styles.rowDescription}>Hide completed tasks from collaborators</Text>
              </View>
            </View>
            <Switch
              value={hideCompletedTasks}
              onValueChange={setHideCompletedTasks}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={[styles.row]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <Users size={20} color={colors.warning} />
              </View>
              <View>
                <Text style={styles.rowText}>Private Collaboration</Text>
                <Text style={styles.rowDescription}>Only share task details with collaborators</Text>
              </View>
            </View>
            <Switch
              value={privateCollaboration}
              onValueChange={setPrivateCollaboration}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                <FileText size={20} color={colors.success} />
              </View>
              <View>
                <Text style={styles.rowText}>Data Collection</Text>
                <Text style={styles.rowDescription}>Allow anonymous usage data collection</Text>
              </View>
            </View>
            <Switch
              value={dataCollection}
              onValueChange={setDataCollection}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.linkButton}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <FileText size={20} color={colors.primary} />
              </View>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.linkButton, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <FileText size={20} color={colors.primary} />
              </View>
              <Text style={styles.linkText}>Terms of Service</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.infoText}>
          Your privacy and security
        </Text>
      </ScrollView>
    </View>
  );
}
