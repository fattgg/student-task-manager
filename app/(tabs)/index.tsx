import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types/task';
import { router } from 'expo-router';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { 
    tasks, 
    getOverdueTasks, 
    getUpcomingTasks, 
    getTasksByStatus,
    getTaskProgress,
    categories
  } = useTaskContext();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const overdueTasks = getOverdueTasks();
  const upcomingTasks = getUpcomingTasks(7);
  const completedTasks = getTasksByStatus('completed');
  const { completed, total } = getTaskProgress();
  
  const filteredTasks = selectedCategory 
    ? tasks.filter(task => task.categoryId === selectedCategory)
    : upcomingTasks;
  
  const handleTaskPress = (task: Task) => {
    router.push({
      pathname: '/task/[id]',
      params: { id: task.id }
    });
  };
  
  const handleAddPress = () => {
    router.push('/task/new');
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
    statsContainer: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 6,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignItems: 'center',
    },
    statIcon: {
      marginBottom: 8,
      padding: 8,
      borderRadius: 20,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.gray,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      marginTop: 24,
    },
    categoriesContainer: {
      marginBottom: 16,
    },
    categoryItem: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
    },
    categoryText: {
      fontWeight: '500',
      fontSize: 14,
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
        title="Student Tasks" 
        showAdd={true}
        showNotification={true}
        onAddPress={handleAddPress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.error + '20' }]}>
              <AlertTriangle size={24} color={colors.error} />
            </View>
            <Text style={styles.statValue}>{overdueTasks.length}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.warning + '20' }]}>
              <Clock size={24} color={colors.warning} />
            </View>
            <Text style={styles.statValue}>{upcomingTasks.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
              <CheckCircle2 size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              { 
                backgroundColor: selectedCategory === null 
                  ? colors.primary 
                  : colors.card 
              }
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text 
              style={[
                styles.categoryText, 
                { 
                  color: selectedCategory === null 
                    ? '#fff' 
                    : colors.text 
                }
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                { 
                  backgroundColor: selectedCategory === category.id 
                    ? category.color 
                    : colors.card 
                }
              ]}
              onPress={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  { 
                    color: selectedCategory === category.id 
                      ? '#fff' 
                      : colors.text 
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>
          {selectedCategory ? 'Category Tasks' : 'Upcoming Tasks'}
        </Text>
        
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onPress={handleTaskPress} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}