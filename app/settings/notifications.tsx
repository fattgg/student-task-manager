import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Bell, Clock, Calendar, Users, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function NotificationSettingsScreen() {
  const { colors } = useTheme();
  
  const [taskReminders, setTaskReminders] = useState(true);
  const [dueDateAlerts, setDueDateAlerts] = useState(true);
  const [overdueAlerts, setOverdueAlerts] = useState(true);
  const [collaborationUpdates, setCollaborationUpdates] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  
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
      marginRight: 12
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
    }
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
        <Text style={styles.headerTitle}>Notification Settings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Task Notifications</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Bell size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.rowText}>Task Reminders</Text>
                <Text style={styles.rowDescription}>Receive reminders for upcoming tasks</Text>
              </View>
            </View>
            <Switch
              value={taskReminders}
              onValueChange={setTaskReminders}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <Clock size={20} color={colors.warning} />
              </View>
              <View>
                <Text style={styles.rowText}>Due Date Alerts</Text>
                <Text style={styles.rowDescription}>Get notified when tasks are due soon</Text>
              </View>
            </View>
            <Switch
              value={dueDateAlerts}
              onValueChange={setDueDateAlerts}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.error + '20' }]}>
                <AlertTriangle size={20} color={colors.error} />
              </View>
              <View>
                <Text style={styles.rowText}>Overdue Alerts</Text>
                <Text style={styles.rowDescription}>Get notified about overdue tasks</Text>
              </View>
            </View>
            <Switch
              value={overdueAlerts}
              onValueChange={setOverdueAlerts}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Other Notifications</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Users size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.rowText}>Collaboration Updates</Text>
                <Text style={styles.rowDescription}>Get notified when collaborators make changes</Text>
              </View>
            </View>
            <Switch
              value={collaborationUpdates}
              onValueChange={setCollaborationUpdates}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                <Calendar size={20} color={colors.success} />
              </View>
              <View>
                <Text style={styles.rowText}>Daily Summary</Text>
                <Text style={styles.rowDescription}>Receive a daily summary of your tasks</Text>
              </View>
            </View>
            <Switch
              value={dailySummary}
              onValueChange={setDailySummary}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        
        <Text style={styles.infoText}>
          Notifications help you stay on top of your tasks and deadlines. You can customize which notifications you receive to avoid being overwhelmed.
        </Text>
      </ScrollView>
    </View>
  );
}