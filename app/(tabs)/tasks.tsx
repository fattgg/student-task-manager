import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { Task, TaskStatus } from '@/types/task';
import { router } from 'expo-router';

export default function TasksScreen() {
  const { colors } = useTheme();
  const { tasks, getTasksByStatus } = useTaskContext();
  
  const [activeTab, setActiveTab] = useState<TaskStatus>('pending');
  
  const filteredTasks = getTasksByStatus(activeTab);
  
  const handleTaskPress = (task: Task) => {
    router.push({
      pathname: '/task/[id]',
      params: { id: task.id }
    });
  };
  
  const handleAddPress = () => {
    router.push('/task/new');
  };
  
  const tabs: { key: TaskStatus; label: string }[] = [
    { key: 'pending', label: 'To Do' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginRight: 8,
    },
    tabText: {
      fontWeight: '500',
      fontSize: 14,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.gray,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Tasks" 
        showAdd={true}
        showSearch={true}
        onAddPress={handleAddPress}
      />
      
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              { 
                backgroundColor: activeTab === tab.key 
                  ? colors.primary 
                  : colors.card 
              }
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text 
              style={[
                styles.tabText, 
                { 
                  color: activeTab === tab.key 
                    ? '#fff' 
                    : colors.text 
                }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.content}>
        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard task={item} onPress={handleTaskPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeTab.replace('-', ' ')} tasks found</Text>
          </View>
        )}
      </View>
    </View>
  );
}