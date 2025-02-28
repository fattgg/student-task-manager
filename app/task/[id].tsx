import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import { ArrowLeft, Calendar, Clock, Tag, Paperclip, Users, CreditCard as Edit, Trash2, CircleCheck as CheckCircle, Circle, CircleAlert as AlertCircle } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

export default function TaskDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    tasks, 
    updateTask, 
    deleteTask, 
    getCategoryById, 
    getTagById, 
    getCollaboratorById 
  } = useTaskContext();
  
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Task Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>
            The task you're looking for doesn't exist or has been deleted.
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const category = getCategoryById(task.categoryId);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleStatusChange = (status: 'pending' | 'in-progress' | 'completed') => {
    updateTask(task.id, { 
      status,
      progress: status === 'completed' ? 100 : task.progress
    });
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
    router.back();
  };
  
  const handleEdit = () => {
    router.push({
      pathname: '/task/edit/[id]',
      params: { id: task.id }
    });
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
    titleContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    categoryBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    categoryText: {
      color: '#fff',
      fontWeight: '600',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    metaIcon: {
      marginRight: 12,
      padding: 8,
      borderRadius: 8,
    },
    metaText: {
      fontSize: 16,
      color: colors.text,
    },
    progressContainer: {
      marginTop: 8,
    },
    progressText: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 4,
      textAlign: 'right',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.card,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      color: colors.text,
    },
    collaboratorsContainer: {
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
    statusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    statusOption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '500',
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 8,
      marginHorizontal: 8,
    },
    actionButtonText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '600',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 16,
      marginBottom: 24,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
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
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{task.title}</Text>
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.statusContainer}>
          <TouchableOpacity 
            style={styles.statusOption}
            onPress={() => handleStatusChange('pending')}
          >
            <Circle 
              size={24} 
              color={task.status === 'pending' ? colors.primary : colors.gray} 
              fill={task.status === 'pending' ? colors.primary + '20' : 'transparent'}
            />
            <Text 
              style={[
                styles.statusText, 
                { color: task.status === 'pending' ? colors.primary : colors.gray }
              ]}
            >
              To Do
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statusOption}
            onPress={() => handleStatusChange('in-progress')}
          >
            <Clock 
              size={24} 
              color={task.status === 'in-progress' ? colors.warning : colors.gray} 
            />
            <Text 
              style={[
                styles.statusText, 
                { color: task.status === 'in-progress' ? colors.warning : colors.gray }
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statusOption}
            onPress={() => handleStatusChange('completed')}
          >
            <CheckCircle 
              size={24} 
              color={task.status === 'completed' ? colors.success : colors.gray} 
            />
            <Text 
              style={[
                styles.statusText, 
                { color: task.status === 'completed' ? colors.success : colors.gray }
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.metaItem}>
            <View style={[styles.metaIcon, { backgroundColor: colors.primary + '20' }]}>
              <Calendar size={20} color={colors.primary} />
            </View>
            <Text style={styles.metaText}>Due {formatDate(task.dueDate)}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <View style={[styles.metaIcon, { backgroundColor: colors.warning + '20' }]}>
              <Clock size={20} color={colors.warning} />
            </View>
            <Text style={styles.metaText}>Due at {formatTime(task.dueDate)}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <ProgressBar progress={task.progress} height={8} showPercentage={true} />
          </View>
        </View>
        
        {task.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {task.tags.map((tagId) => {
                const tag = getTagById(tagId);
                return tag ? (
                  <View key={tag.id} style={styles.tagBadge}>
                    <Text style={styles.tagText}>{tag.name}</Text>
                  </View>
                ) : null;
              })}
            </View>
          </View>
        )}
        
        {task.collaborators.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Collaborators</Text>
            <View style={styles.collaboratorsContainer}>
              {task.collaborators.map((collaboratorId) => {
                const collaborator = getCollaboratorById(collaboratorId);
                return collaborator ? (
                  <View key={collaborator.id} style={styles.collaboratorItem}>
                    <Image 
                      source={{ uri: collaborator.avatar || 'https://via.placeholder.com/50' }} 
                      style={styles.avatar}
                    />
                    <Text style={styles.collaboratorName} numberOfLines={1}>
                      {collaborator.name}
                    </Text>
                  </View>
                ) : null;
              })}
            </View>
          </View>
        )}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}
            onPress={handleEdit}
          >
            <Edit size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.error + '20' }]}
            onPress={handleDelete}
          >
            <Trash2 size={20} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}