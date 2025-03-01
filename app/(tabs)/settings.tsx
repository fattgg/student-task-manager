import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { Moon, Bell, User, CircleHelp as HelpCircle, LogOut, ChevronRight, Palette, Lock, FileText, Share2 } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  
  const navigateToScreen = (screen: string) => {
    router.push(`/settings/${screen}`);
  };
  
  const handleLogout = () => {
    console.log('Logout pressed');
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
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
    versionText: {
      textAlign: 'center',
      color: colors.gray,
      fontSize: 14,
      marginTop: 24,
      marginBottom: 40,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.error + '20',
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 24,
    },
    logoutText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Moon size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowText}>Dark Mode</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]}
            onPress={() => navigateToScreen('theme')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Palette size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowText}>Theme Colors</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]}
            onPress={() => navigateToScreen('notifications')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <Bell size={20} color={colors.warning} />
              </View>
              <Text style={styles.rowText}>Notification Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.row}
            onPress={() => navigateToScreen('profile')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <User size={20} color={colors.secondary} />
              </View>
              <Text style={styles.rowText}>Profile</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.row]}
            onPress={() => navigateToScreen('privacy')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.error + '20' }]}>
                <Lock size={20} color={colors.error} />
              </View>
              <Text style={styles.rowText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]}
            onPress={() => navigateToScreen('data-sync')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                <Share2 size={20} color={colors.success} />
              </View>
              <Text style={styles.rowText}>Data Sync</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.row}
            onPress={() => navigateToScreen('help')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <HelpCircle size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]}
            onPress={() => console.log('Terms & Privacy Policy')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <FileText size={20} color={colors.primary} />
              </View>
              <Text style={styles.rowText}>Terms & Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Student Task Manager v1.0.0</Text>
      </ScrollView>
    </View>
  );
}