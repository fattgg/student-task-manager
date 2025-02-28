import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Switch,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import { ArrowLeft, Calendar, Clock, Tag as TagIcon, Users, ChevronDown, ChevronRight, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Priority, TaskStatus } from '@/types/task';

export default function EditTaskScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, categories, tags, collaborators } = useTaskContext();
  
  const task = tasks.find(t => t.id === id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);
  const [withReminder, setWithReminder] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setCategoryId(task.categoryId);
      setSelectedTags(task.tags);
      setSelectedCollaborators(task.collaborators);
      setWithReminder(task.reminders.length > 0);
      setProgress(task.progress);
    }
  }, [task]);
  
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
            The task you're trying to edit doesn't exist or has been deleted.
          </Text>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.saveButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const handleSave = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 1);
    
    updateTask(task.id, {
      title,
      description,
      dueDate,
      priority,
      categoryId,
      tags: selectedTags,
      collaborators: selectedCollaborators,
      reminders: withReminder ? [reminderDate] : [],
      progress,
    });
    
    router.back();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getPriorityColor = (p: Priority) => {
    switch (p) {
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
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    selectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectText: {
      fontSize: 16,
      color: colors.text,
    },
    placeholderText: {
      color: colors.gray,
    },
    priorityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    priorityOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    priorityText: {
      fontWeight: '600',
      fontSize: 14,
      color: '#fff',
    },
    reminderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reminderText: {
      fontSize: 16,
      color: colors.text,
    },
    progressContainer: {
      marginBottom: 20,
    },
    progressLabel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    progressValue: {
      fontSize: 14,
      color: colors.gray,
    },
    progressSlider: {
      height: 20,
      backgroundColor: colors.border,
      borderRadius: 10,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 10,
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
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
        <Text style={styles.headerTitle}>Edit Task</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[
              styles.input,
              errors.title ? { borderColor: colors.error } : null,
            ]}
            placeholder="Enter task title"
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) {
                setErrors({ ...errors, title: undefined });
              }
            }}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description ? { borderColor: colors.error } : null,
            ]}
            placeholder="Enter task description"
            placeholderTextColor={colors.gray}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) {
                setErrors({ ...errors, description: undefined });
              }
            }}
            multiline
            numberOfLines={5}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => {
              console.log('Open date picker');
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.selectText}>{formatDate(dueDate)}</Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('low') + (priority === 'low' ? '' : '40') },
              ]}
              onPress={() => setPriority('low')}
            >
              <Text style={styles.priorityText}>Low</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('medium') + (priority === 'medium' ? '' : '40') },
              ]}
              onPress={() => setPriority('medium')}
            >
              <Text style={styles.priorityText}>Medium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('high') + (priority === 'high' ? '' : '40') },
              ]}
              onPress={() => setPriority('high')}
            >
              <Text style={styles.priorityText}>High</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressLabel}>
            <Text style={styles.label}>Progress</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
          </View>
          <View style={styles.progressSlider}>
            <TouchableOpacity
              style={[
                styles.progressFill,
                { 
                  width: `${progress}%`,
                  backgroundColor: progress < 30 
                    ? colors.error 
                    : progress < 70 
                      ? colors.warning 
                      : colors.success
                },
              ]}
              onPress={() => {
                setProgress((progress + 10) % 110);
              }}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => {
              console.log('Open category picker');
            }}
          >
            <Text 
              style={[
                styles.selectText,
                !categoryId ? styles.placeholderText : null,
              ]}
            >
              {categoryId 
                ? categories.find(c => c.id === categoryId)?.name 
                : 'Select a category'}
            </Text>
            <ChevronDown size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tags</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => {
              console.log('Open tag picker');
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TagIcon size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text 
                style={[
                  styles.selectText,
                  selectedTags.length === 0 ? styles.placeholderText : null,
                ]}
              >
                {selectedTags.length > 0 
                  ? `${selectedTags.length} tags selected` 
                  : 'Select tags'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Collaborators</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => {
              console.log('Open collaborator picker');
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Users size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text 
                style={[
                  styles.selectText,
                  selectedCollaborators.length === 0 ? styles.placeholderText : null,
                ]}
              >
                {selectedCollaborators.length > 0 
                  ? `${selectedCollaborators.length} collaborators` 
                  : 'Add collaborators'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.reminderContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock size={20} color={colors.warning} style={{ marginRight: 8 }} />
            <Text style={styles.reminderText}>Set Reminder</Text>
          </View>
          <Switch
            value={withReminder}
            onValueChange={setWithReminder}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#fff'}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}