import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types/task';
import { router } from 'expo-router';
import { Users, UserPlus } from 'lucide-react-native';

export default function CollaborateScreen() {
  const { colors } = useTheme();
  const { tasks, collaborators } = useTaskContext();
  
  const sharedTasks = tasks.filter(task => task.collaborators.length > 0);
  
  const handleTaskPress = (task: Task) => {
    router.push({
      pathname: '/task/[id]',
      params: { id: task.id }
    });
  };
  
  const handleAddCollaboratorPress = () => {
    console.log('Add collaborator');
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      marginTop: 24,
    },
    collaboratorsContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    collaboratorsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    collaboratorsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButtonText: {
      color: colors.primary,
      marginLeft: 4,
      fontWeight: '500',
    },
    collaboratorsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    collaboratorItem: {
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 8,
      width: 60,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 4,
    },
    collaboratorName: {
      fontSize: 12,
      color: colors.text,
      textAlign: 'center',
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
        title="Collaborate" 
        showSearch={true}
      />
      
      <View style={styles.content}>
        <View style={styles.collaboratorsContainer}>
          <View style={styles.collaboratorsHeader}>
            <Text style={styles.collaboratorsTitle}>Collaborators</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddCollaboratorPress}
            >
              <UserPlus size={16} color={colors.primary} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.collaboratorsList}>
            {collaborators.map((collaborator) => (
              <View key={collaborator.id} style={styles.collaboratorItem}>
                <Image 
                  source={{ uri: collaborator.avatar || 'https://via.placeholder.com/50' }} 
                  style={styles.avatar}
                />
                <Text style={styles.collaboratorName} numberOfLines={1}>
                  {collaborator.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Shared Tasks</Text>
        
        {sharedTasks.length > 0 ? (
          <FlatList
            data={sharedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard task={item} onPress={handleTaskPress} />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Users size={40} color={colors.gray} />
            <Text style={styles.emptyText}>No shared tasks yet</Text>
            <TouchableOpacity onPress={() => router.push('/task/new')}>
              <Text style={{ color: colors.primary, marginTop: 8 }}>
                Create a shared task
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}