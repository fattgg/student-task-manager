import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Task } from '@/types/task';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import { Calendar, Clock, Users, Paperclip, Tag } from 'lucide-react-native';
import ProgressBar from './ProgressBar';

type TaskCardProps = {
  task: Task;
  onPress: (task: Task) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  const { colors } = useTheme();
  const { getCategoryById } = useTaskContext();
  
  const category = getCategoryById(task.categoryId);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.gray;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: category?.color || colors.primary,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    priorityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: getPriorityColor(task.priority),
    },
    priorityText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    description: {
      fontSize: 14,
      color: colors.gray,
      marginBottom: 12,
    },
    metaContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 8,
    },
    metaText: {
      fontSize: 12,
      color: colors.gray,
      marginLeft: 4,
    },
    categoryBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: category?.color || colors.primary,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    categoryText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '500',
    },
    progressContainer: {
      marginTop: 8,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(task)}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title}
        </Text>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>
      
      {category && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
      
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>
      
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Calendar size={14} color={colors.gray} />
          <Text style={styles.metaText}>{formatDate(task.dueDate)}</Text>
        </View>
        
        {task.collaborators.length > 0 && (
          <View style={styles.metaItem}>
            <Users size={14} color={colors.gray} />
            <Text style={styles.metaText}>{task.collaborators.length}</Text>
          </View>
        )}
        
        {task.attachments.length > 0 && (
          <View style={styles.metaItem}>
            <Paperclip size={14} color={colors.gray} />
            <Text style={styles.metaText}>{task.attachments.length}</Text>
          </View>
        )}
        
        {task.tags.length > 0 && (
          <View style={styles.metaItem}>
            <Tag size={14} color={colors.gray} />
            <Text style={styles.metaText}>{task.tags.length}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={task.progress} />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;