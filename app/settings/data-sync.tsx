import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Cloud, Download, Upload, RefreshCw, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DataSyncScreen() {
  const { colors } = useTheme();
  
  const [autoSync, setAutoSync] = useState(true);
  const [syncOnWifiOnly, setSyncOnWifiOnly] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('Today, 10:30 AM');
  
  const handleSync = () => {
    Alert.alert('Syncing', 'Syncing your data...');
    setTimeout(() => {
      setLastSyncTime('Just now');
      Alert.alert('Success', 'Data synced successfully!');
    }, 1500);
  };
  
  const handleExport = () => {
    Alert.alert(
      'Export Data',
      'This will export all your tasks and settings. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Export',
          onPress: () => Alert.alert('Success', 'Data exported successfully!'),
        },
      ]
    );
  };
  
  const handleImport = () => {
    Alert.alert(
      'Import Data',
      'This will replace your current data with the imported data. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Import',
          onPress: () => Alert.alert('Success', 'Data imported successfully!'),
        },
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your tasks and settings. This action cannot be undone. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All data has been cleared.'),
        },
      ]
    );
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
    syncInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.primary + '10',
      borderRadius: 8,
      marginBottom: 24,
    },
    syncText: {
      fontSize: 14,
      color: colors.text,
    },
    syncTime: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    actionText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
    },
    dangerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.error + '20',
      paddingVertical: 16,
      borderRadius: 12,
      marginTop: 24,
    },
    dangerText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
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
        <Text style={styles.headerTitle}>Data Sync</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.syncInfo}>
          <Text style={styles.syncText}>Last synced:</Text>
          <Text style={styles.syncTime}>{lastSyncTime}</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Sync Settings</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Cloud size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.rowText}>Auto Sync</Text>
                <Text style={styles.rowDescription}>Automatically sync your data</Text>
              </View>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Cloud size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.rowText}>Sync on Wi-Fi Only</Text>
                <Text style={styles.rowDescription}>Only sync when connected to Wi-Fi</Text>
              </View>
            </View>
            <Switch
              value={syncOnWifiOnly}
              onValueChange={setSyncOnWifiOnly}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSync}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <RefreshCw size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Sync Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
            <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
              <Upload size={20} color={colors.success} />
            </View>
            <Text style={styles.actionText}>Export Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.lastRow]} onPress={handleImport}>
            <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
              <Download size={20} color={colors.warning} />
            </View>
            <Text style={styles.actionText}>Import Data</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
          <Trash2 size={20} color={colors.error} />
          <Text style={styles.dangerText}>Clear All Data</Text>
        </TouchableOpacity>
        
        <Text style={styles.infoText}>
          Syncing ensures your data is backed up and available across all your devices. Make sure to sync regularly to prevent data loss.
        </Text>
      </ScrollView>
    </View>
  );
}